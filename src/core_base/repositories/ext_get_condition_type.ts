import { ExtCondition, FlatCondition, FlatOperator, FlatOperatorEnum } from "src/interfaces/repositories/ext_conditions";

export const isFlatOperator = (opString: string): opString is FlatOperator => {
  return Object.keys(FlatOperatorEnum).includes(opString);
};
export const isFlatCondition = (condition: ExtCondition): condition is FlatCondition => {
  return isFlatOperator(condition.operator);
};

