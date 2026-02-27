import { VBI } from '@visactor/vbi';
import {
  VQuery,
  type DatasetColumn,
  type RawDatasetSource,
  type VQueryDSL,
} from '@visactor/vquery';

let localData: unknown[] = [];

export const createLocalConnector = (connectorId: string) => {
  const vquery = new VQuery();
  console.log('Creating local connector:', connectorId);

  VBI.registerConnector(connectorId, async () => {
    console.log('Connector called for:', connectorId);
    return {
      discoverSchema: async () => {
        console.log('discoverSchema called, localData:', localData);
        if (localData.length === 0) {
          console.log('No local data yet');
          return [];
        }

        // 从数据推断字段类型 - 检查多行来更准确地识别数字字段
        const firstRow = localData[0];
        if (typeof firstRow !== 'object' || firstRow === null) {
          return [];
        }

        const fieldNames = Object.keys(firstRow as Record<string, unknown>);
        const schema = fieldNames.map((name) => {
          // 检查该字段在前100行（或全部行）中是否主要是数字
          const sampleSize = Math.min(localData.length, 100);
          let numberCount = 0;

          for (let i = 0; i < sampleSize; i++) {
            const row = localData[i];
            if (typeof row === 'object' && row !== null) {
              const value = (row as Record<string, unknown>)[name];
              // 尝试将值转换为数字
              if (value !== null && value !== undefined && value !== '') {
                const num = Number(value);
                if (!isNaN(num) && isFinite(num)) {
                  numberCount++;
                }
              }
            }
          }

          // 如果超过70%的非空值都是数字，则认为该字段是 number 类型
          const nonEmptyCount = sampleSize;
          const isNumberField = numberCount / nonEmptyCount > 0.7;

          return {
            name,
            type: isNumberField ? 'number' : 'string',
          };
        });

        console.log('Schema discovered:', schema);
        return schema;
      },

      query: async ({ queryDSL, schema }) => {
        console.log('query called with DSL:', queryDSL, 'schema:', schema);
        if (!(await vquery.hasDataset(connectorId))) {
          if (localData.length === 0) {
            console.log('No data for query');
            return { dataset: [] };
          }

          const datasetSource = { type: 'json', rawDataset: localData };
          console.log('Creating dataset...');
          await vquery.createDataset(
            connectorId,
            schema as DatasetColumn[],
            datasetSource as RawDatasetSource,
          );
        }

        const dataset = await vquery.connectDataset(connectorId);
        const queryResult = await dataset.query(
          queryDSL as VQueryDSL<Record<string, string | number>>,
        );
        console.log('Query result:', queryResult);

        // 度量感知的类型转换：将度量结果从字符串转换为数字
        let normalizedDataset = queryResult.dataset;
        if (queryDSL.select && Array.isArray(queryDSL.select)) {
          // 识别度量列（那些有 func 属性的列）
          const measureAliases: string[] = [];
          for (const item of queryDSL.select) {
            if (typeof item === 'object' && item !== null && 'func' in item && item.func) {
              const alias = (item as any).alias || (item as any).field;
              if (alias) {
                measureAliases.push(alias);
              }
            }
          }
          console.log('Identified measure aliases:', measureAliases);

          if (measureAliases.length > 0) {
            // 将度量列的字符串值转换为数字
            normalizedDataset = queryResult.dataset.map((row) => {
              const next = { ...row };
              for (const alias of measureAliases) {
                const raw = next[alias];
                console.log(`Before: ${alias} = ${raw} (type: ${typeof raw})`);

                if (raw != null) {
                  let num: number;
                  if (typeof raw === 'string') {
                    num = Number(raw);
                  } else if (typeof raw === 'bigint') {
                    num = Number(raw);
                  } else if (typeof raw === 'number') {
                    num = raw;
                  } else {
                    num = NaN;
                  }

                  // 仅在有效时赋值
                  if (!Number.isNaN(num)) {
                    next[alias] = num;
                  }
                }

                console.log(`After: ${alias} = ${next[alias]} (type: ${typeof next[alias]})`);
              }
              return next;
            });

            console.log('Normalized dataset:', normalizedDataset);
          }
        }

        return {
          dataset: normalizedDataset,
        };
      },
    };
  });

  return connectorId;
};

export const setLocalData = (data: unknown[]) => {
  localData = data;
};

export const getLocalData = () => localData;
