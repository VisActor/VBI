# VBI.resources

The resource namespace on a VBI instance, used to register shared resources that can be referenced by dashboard.

## Properties

| Property | Type | Description |
| --- | --- | --- |
| **chart** | `VBIChartResourceNamespace` | Chart resource management API. |
| **insight** | `VBIInsightResourceNamespace` | Insight resource management API. |


## Methods

### register

Registers chart and insight resources in bulk.

**Definition**:

```typescript
register(resources: VBIResourceRegisterInput): VBIResourceRegisterResult
```

**Returns**: `VBIResourceRegisterResult`

**Parameters**:

| Parameter | Type | Description |
| --- | --- | --- |
| `resources` | VBIResourceRegisterInput | - |

### clear

Clears all chart and insight resources for the current VBI instance.

**Definition**:

```typescript
clear(): void
```

**Returns**: `void`

### snapshot

Exports a DSL snapshot of the resources referenceable by the current VBI instance.

**Definition**:

```typescript
snapshot(): VBIResourceSnapshot
```

**Returns**: `VBIResourceSnapshot`
