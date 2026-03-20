import { useEffect, useMemo, useState } from 'react';
import type { VBIBuilder } from '@visactor/vbi';

export type SchemaFieldRole = 'dimension' | 'measure';

export interface VBISchemaField {
  name: string;
  type: string;
  role: SchemaFieldRole;
}

const EMPTY_SCHEMA: VBISchemaField[] = [];

export const useVBISchemaFields = (
  builder: VBIBuilder | undefined,
  refreshKey = 0,
) => {
  const [schemaFields, setSchemaFields] = useState<VBISchemaField[]>(EMPTY_SCHEMA);

  useEffect(() => {
    let destroyed = false;

    const run = async () => {
      if (!builder) {
        setSchemaFields(EMPTY_SCHEMA);
        return;
      }

      const schema = await builder.getSchema();
      if (destroyed) {
        return;
      }

      setSchemaFields(
        schema.map((item) => ({
          name: item.name,
          type: item.type,
          role: item.type === 'number' ? 'measure' : 'dimension',
        })),
      );
    };

    void run();
    return () => {
      destroyed = true;
    };
  }, [builder, refreshKey]);

  const fieldRoleMap = useMemo(() => {
    return Object.fromEntries(
      schemaFields.map((item) => [item.name, item.role]),
    ) as Record<string, SchemaFieldRole>;
  }, [schemaFields]);

  const fieldTypeMap = useMemo(() => {
    return Object.fromEntries(
      schemaFields.map((item) => [item.name, item.type]),
    ) as Record<string, string>;
  }, [schemaFields]);

  return {
    schemaFields,
    fieldRoleMap,
    fieldTypeMap,
  };
};
