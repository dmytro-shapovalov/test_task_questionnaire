import {
  isInterpolationGroups,
  isInterpolationWithMatchGroups,
  onlyInterpolation,
  onlyInterpolationWithMatch,
} from '../../components/Questionnaire/types';
import { assertExhausted } from '../../lib/typeHelpers';

function interpolate(str: string, map: Record<string, string>) {
  return str
    .replaceAll(onlyInterpolationWithMatch, (match, ...args) => {
      const groups: unknown = args.at(-1);

      if (!isInterpolationWithMatchGroups(groups)) {
        throw new Error('Got unexpected matches.');
      }

      const { field, operation, match_value, return_value } = groups;

      console.log(match);

      switch (operation) {
        case '=': {
          const value = map[field];

          if (!value) {
            throw new Error(`No value found for interpolation ${match}.`);
          }

          return value === match_value ? return_value : '';
        }
        case '<': {
          throw new Error('Operator < is not supported yet.');
        }
        case '>': {
          throw new Error('Operator > is not supported yet.');
        }
        default:
          assertExhausted(operation);
      }
      return '';
    })
    .replaceAll(onlyInterpolation, (match, ...args) => {
      const groups: unknown = args.at(-1);

      if (!isInterpolationGroups(groups)) {
        throw new Error('Got unexpected matches.');
      }

      const replacement = map[groups.field];

      if (!replacement) {
        throw new Error(`No value found for interpolation ${match}.`);
      }

      return replacement;
    });
}

export { interpolate };
