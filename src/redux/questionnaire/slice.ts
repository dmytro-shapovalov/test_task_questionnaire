import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

import { QuestionnaireConfig } from '../../components/Questionnaire/types';

export interface QuestionnaireSlice {
  screensConfig: QuestionnaireConfig;
  historyStack: string[];
  answers: Map<string, string>;
}

const initialState: QuestionnaireSlice | null = null;

export const questionnaireSlice = createSlice({
  name: 'questionnaire',
  initialState,
  selectors: {
    currentScreen: (state, args) => {},
  },
  reducers: {
    setScreensConfig: (state, action: PayloadAction<QuestionnaireConfig>) => {},
    nextScreen: (state, action: PayloadAction<string>) => {},
    previousScreen: (state) => {},
  },
});

export const {
  actions: questionnaireActions,
  reducer: questionnaireReducer,
  selectors,
} = questionnaireSlice;
