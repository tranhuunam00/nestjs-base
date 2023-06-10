// Enum to be able to check type at run time
export enum FlatOperatorEnum {
  textSearch = 'textSearch',
  regexSearch = 'regexSearch',
  wordSearch = 'wordSearch',
  equals = 'equals',
  eq = 'eq',
  ne = 'ne',
  gte = 'gte',
  lte = 'lte',
  gt = 'gt',
  lt = 'lt',
  in = 'in',
  nin = 'nin',
  contains = 'contains',
  exists = 'exists',
}

export type FlatOperator = keyof typeof FlatOperatorEnum

export type FlatCondition = {
  operator: FlatOperator
  field: string
  value: unknown
}
export type ExtCondition = FlatCondition
