import { Query, QueryOptions } from 'mongoose'
import { ExtRepoFindParams } from 'src/interfaces/repositories/ext_find_params'
import { extBuildQueryFilter } from './ext_build_query_filter'
import { purgeArray } from '../array/purge_array'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const extBuildQuery = <T>(params: ExtRepoFindParams): Query<T, any> => {
  const { conditions = [] } = params
  const filter = extBuildQueryFilter(purgeArray(conditions))

  const mongoDBQuery = new Query<T, any>()
  mongoDBQuery.setQuery(filter)

  return mongoDBQuery
}
