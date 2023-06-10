import { isEmpty, merge, reduce } from 'lodash'
import { getSearchString } from '../string/get_search_string'
import {
  ExtCondition,
  FlatCondition,
} from 'src/interfaces/repositories/ext_conditions'
import { isFlatCondition } from '../repositories/ext_get_condition_type'

const extBuildFlatDBFilter = (
  conditionInput: FlatCondition
): Record<string, unknown> => {
  const condition = {
    ...conditionInput,
    field: conditionInput.field === 'id' ? '_id' : conditionInput.field,
  }
  switch (condition.operator) {
    case 'textSearch':
      return isEmpty(condition.value)
        ? {}
        : {
            $text: {
              $search: `"${condition.value}"`,
            },
          }
    case 'regexSearch':
      return {
        [condition.field]: {
          $regex: `^${(condition.value as string).replace(
            /[.*+?^${}()|[\]\\]/g,
            '\\$&'
          )}$`,
          $options: 'i',
        },
      }
    case 'wordSearch':
      return {
        [condition.field]: {
          $regex: `${getSearchString(condition.value as string)}`,
          $options: 'i',
        },
      }
    case 'equals':
      return {
        [condition.field]: {
          $eq: condition.value,
        },
      }
    case 'contains':
      return {
        [condition.field]: {
          $eq: condition.value,
        },
      }
    default:
      return {
        [condition.field]: {
          [`$${condition.operator}`]: condition.value,
        },
      }
  }
}

export const extBuildSingleMongoDBFilter = (
  condition: ExtCondition
): object => {
  if (isFlatCondition(condition)) {
    return extBuildFlatDBFilter(condition)
  }

  throw new Error('Unsupported condition type')
}
export const extBuildQueryFilter = (conditions: ExtCondition[]): object => {
  return reduce(
    conditions,
    (prevDbQuery, value) => {
      return merge(prevDbQuery, extBuildSingleMongoDBFilter(value))
    },
    {} as object
  )
}
