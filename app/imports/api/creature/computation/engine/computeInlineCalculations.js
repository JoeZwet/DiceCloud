import evaluateCalculation from '/imports/api/creature/computation/engine/evaluateCalculation.js';
import INLINE_CALCULATION_REGEX from '/imports/constants/INLINE_CALCULTION_REGEX.js';
import ErrorNode from '/imports/parser/parseTree/ErrorNode.js';
import { union } from 'lodash';

export default function computeInlineCalculations(prop, memo){
  if (prop.summary){
    computeInlineCalcsForField(prop, memo, 'summary');
  }
  if (prop.description){
    computeInlineCalcsForField(prop, memo, 'description');
  }
}

function computeInlineCalcsForField(prop, memo, field){
  let string = prop[field];
  let inlineComputations = [];
  let matches = string.matchAll(INLINE_CALCULATION_REGEX);
  for (let match of matches){
    let calculation = match[1];
    let {
      result,
      context,
      dependencies,
    } = evaluateCalculation({string: calculation, prop, memo, fn: 'compile'});
    if (result instanceof ErrorNode){
      result = '`Calculation Error`';
    }
    let computation = {
      calculation,
      result: result && result.toString(),
    };
    if (context.errors.length){
      computation.errors = context.errors;
    }
    inlineComputations.push(computation);
    prop.dependencies = union(prop.dependencies, dependencies);
  }
  prop[`${field}Calculations`] = inlineComputations;
}
