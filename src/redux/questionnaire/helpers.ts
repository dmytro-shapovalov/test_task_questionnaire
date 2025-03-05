import {
  isInterpolationGroups,
  isInterpolationWithMatchGroups,
  onlyInterpolation,
  onlyInterpolationWithMatch,
  QuestionnaireConfig,
} from '../../components/Questionnaire/types';
import { assertExhausted, assertNotNull } from '../../lib/typeHelpers';

import { QuestionnaireSlice } from './slice';

function findAnswerText(id: string, answerValue: string, screens: QuestionnaireConfig) {
  const screen = screens.find((x) => x.id === id);

  assertNotNull(screen);

  const { screenType } = screen;

  switch (screenType) {
    case 'information':
    case 'birthDate': {
      throw new Error(`Screen type ${screenType} is not supported yet.`);
    }

    case 'yesNoQuestion': {
      return { yes: 'Yes', no: 'No' }[answerValue];
    }

    case 'openQuestion': {
      const option = screen.options.find((x) => x.value === answerValue);
      assertNotNull(option);
      return option.text;
    }

    default:
      assertExhausted(screenType);
  }
}

function interpolate(str: string, state: QuestionnaireSlice) {
  const { answers, screens } = state;

  return str
    .replaceAll(onlyInterpolationWithMatch, (match, ...args) => {
      const groups: unknown = args.at(-1);

      if (!isInterpolationWithMatchGroups(groups)) {
        throw new Error('Got unexpected matches.');
      }

      const { field, operation, match_value, return_value } = groups;

      switch (operation) {
        case '=': {
          const value = answers[field];

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

      const { field } = groups;

      const replacement = findAnswerText(field, answers[field], state.screens);

      if (!replacement) {
        throw new Error(`No value found for interpolation ${match}.`);
      }

      return replacement;
    });
}

export { interpolate };
