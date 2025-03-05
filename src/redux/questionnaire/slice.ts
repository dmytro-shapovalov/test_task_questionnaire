import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

import { QuestionnaireConfig, ScreenConfig } from '../../components/Questionnaire/types';
import { assertNotNull } from '../../lib/typeHelpers';

import { interpolate } from './helpers';

export interface QuestionnaireSlice {
  screens: QuestionnaireConfig;
  history: string[];
  answers: Record<string, string>;
}

const initialState: QuestionnaireSlice = {
  screens: [],
  history: [],
  answers: {},
};

const selectors = {
  current: (state: QuestionnaireSlice) => {
    const currentScreenId = state.history[state.history.length - 1];
    const currentScreen = state.screens.find((x) => x.id === currentScreenId);

    if (currentScreen) {
      const { title, instruction } = currentScreen;
      return {
        ...currentScreen,
        title: interpolate(title, state.answers),
        instruction: instruction && interpolate(instruction, state.answers),
      } satisfies ScreenConfig;
    }
  },
};

export const questionnaireSlice = createSlice({
  name: 'questionnaire',
  initialState,
  selectors,
  reducers: {
    setScreensConfig: (state, action: PayloadAction<QuestionnaireConfig>) => {
      const newScreensConfig = action.payload;

      state.screens = newScreensConfig;
      state.history = [newScreensConfig[0].id];
    },
    nextScreen: (state, action: PayloadAction<string>) => {
      const current = selectors.current(state);

      assertNotNull(current);

      const { id, nextStepId } = current;

      if (action.payload) {
        // You can send empty payload to go to next screen but not to save the answer.
        state.answers = { ...state.answers, [id]: action.payload };
      }
      state.history = [...state.history, interpolate(nextStepId, state.answers)];
    },
    previousScreen: (state) => {},
  },
});

export const {
  actions: questionnaireActions,
  reducer: questionnaireReducer,
  selectors: questionnaireSelectors,
} = questionnaireSlice;
