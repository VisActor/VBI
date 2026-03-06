import { VBI } from '@visactor/vbi';
import {
  VQuery,
  type DatasetColumn,
  type RawDatasetSource,
  type VQueryDSL,
} from '@visactor/vquery';

export const connectorId = 'demo';

export const registerDemoConnector = () => {
  const vquery = new VQuery();
  VBI.registerConnector(connectorId, async () => {
    return {
      discoverSchema: async () => {
        return [
          { name: 'id', type: 'string' },
          { name: 'order_id', type: 'string' },
          { name: 'order_date', type: 'date' },
          { name: 'delivery_date', type: 'date' },
          { name: 'delivery_method', type: 'string' },
          { name: 'customer_id', type: 'string' },
          { name: 'customer_name', type: 'string' },
          { name: 'customer_type', type: 'string' },
          { name: 'city', type: 'string' },
          { name: 'province', type: 'string' },
          { name: 'country_or_region', type: 'string' },
          { name: 'area', type: 'string' },
          { name: 'product_id', type: 'string' },
          { name: 'product_type', type: 'string' },
          { name: 'product_sub_type', type: 'string' },
          { name: 'product_name', type: 'string' },

          { name: 'sales', type: 'number' },
          { name: 'amount', type: 'number' },
          { name: 'discount', type: 'number' },
          { name: 'profit', type: 'number' },
        ];
      },
      query: async ({ queryDSL, schema }) => {
        if (!(await vquery.hasDataset(connectorId))) {
          const url = 'https://visactor.github.io/VBI/dataset/supermarket.csv';
          const datasetSource = { type: 'csv', rawDataset: url };
          await vquery.createDataset(
            connectorId,
            schema as DatasetColumn[],
            datasetSource as RawDatasetSource,
          );
        }
        const dataset = await vquery.connectDataset(connectorId);
        try {
          const queryResult = await dataset.query(
            queryDSL as VQueryDSL<Record<string, string | number>>,
          );

          // Measure-aware type conversion: convert measure results from string to number
          let normalizedDataset = queryResult.dataset;
          if (queryDSL.select && Array.isArray(queryDSL.select)) {
            // Identify measure columns (those with func property) and dimension columns
            // 查询结果列名由 SQL SELECT AS 决定：优先 alias，否则 field
            const measureFields: { field: string; alias: string }[] = [];
            const dimensionFields: { field: string; alias: string }[] = [];

            for (const item of queryDSL.select) {
              if (typeof item === 'string') {
                dimensionFields.push({ field: item, alias: item });
                continue;
              }

              if (typeof item === 'object' && item !== null) {
                const field = (item as any).field as string | undefined;
                const alias = ((item as any).alias ?? field) as string | undefined;

                if (!field || !alias) {
                  continue;
                }

                if ((item as any).aggr?.func) {
                  measureFields.push({ field, alias });
                } else {
                  dimensionFields.push({ field, alias });
                }
              }
            }

            if (measureFields.length > 0 || dimensionFields.length > 0) {
              // CRITICAL: Must reassign the result
              // SQL 列名优先是 alias（如果提供），否则是 field
              normalizedDataset = queryResult.dataset.map((row) => {
                const next: Record<string, any> = {};

                // Process measures: read by SQL output key (alias/field), write back by field key
                for (const { field, alias } of measureFields) {
                  const sourceKey = alias || field;
                  const raw = (row as any)[sourceKey];

                  if (raw != null) {
                    // Handle both string and bigint types from Arrow
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

                    // Only assign if valid，用 field 作为返回列名（与 VSeed id 对齐）
                    if (!Number.isNaN(num)) {
                      next[field] = num;
                    }
                  }
                }

                // Process dimensions: read by SQL output key (alias/field), write back by field key
                for (const { field, alias } of dimensionFields) {
                  const sourceKey = alias || field;
                  const raw = (row as any)[sourceKey];
                  if (raw != null) {
                    next[field] = raw;
                  }
                }

                return next;
              });
            }
          }

          return {
            dataset: normalizedDataset,
          };
        } catch (error) {
          console.error('[demoConnector] Query error:', error);
          throw error;
        }
      },
    };
  });
  return connectorId;
};

registerDemoConnector();
export const defaultBuilder = VBI.from(VBI.generateEmptyDSL(connectorId));
