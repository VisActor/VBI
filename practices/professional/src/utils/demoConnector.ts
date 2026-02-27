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
        console.log('[demoConnector] Received queryDSL:', JSON.stringify(queryDSL, null, 2));
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
          // BigInt replacer for JSON.stringify
          const bigIntReplacer = (_key: string, value: unknown) => {
            if (typeof value === 'bigint') {
              return value.toString();
            }
            return value;
          };
          console.log('[demoConnector] Query result (raw):', JSON.stringify(queryResult, bigIntReplacer, 2));

          // Measure-aware type conversion: convert measure results from string to number
          let normalizedDataset = queryResult.dataset;
          if (queryDSL.select && Array.isArray(queryDSL.select)) {
            // Identify measure columns (those with func property)
            const measureAliases: string[] = [];
            for (const item of queryDSL.select) {
              if (typeof item === 'object' && item !== null && 'func' in item && (item as any).func) {
                const alias = (item as any).alias || (item as any).field;
                if (alias) {
                  measureAliases.push(alias);
                }
              }
            }
            console.log('[demoConnector] Identified measure aliases:', measureAliases);

            if (measureAliases.length > 0) {
              // CRITICAL: Must reassign the result
              normalizedDataset = queryResult.dataset.map((row) => {
                const next = { ...row };
                console.log('[demoConnector] Processing row:', JSON.stringify(row, bigIntReplacer));

                for (const alias of measureAliases) {
                  const raw = next[alias];
                  console.log(`[demoConnector] Before: ${alias} = ${raw} (type: ${typeof raw})`);

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

                    // Only assign if valid
                    if (!Number.isNaN(num)) {
                      next[alias] = num;
                    }
                  }

                  console.log(`[demoConnector] After: ${alias} = ${next[alias]} (type: ${typeof next[alias]}, isFinite: ${Number.isFinite(next[alias])})`);
                }

                return next;
              });

              // CRITICAL SELF-CHECK
              if (normalizedDataset.length > 0) {
                const firstRow = normalizedDataset[0];
                for (const alias of measureAliases) {
                  console.log(`[demoConnector] FINAL CHECK - ${alias}: value=${firstRow[alias]}, type=${typeof firstRow[alias]}, isFinite=${Number.isFinite(firstRow[alias])}`);
                }
              }

              console.log('[demoConnector] Normalized dataset:', JSON.stringify(normalizedDataset, bigIntReplacer, 2));
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
