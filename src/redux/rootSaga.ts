import { all, type AllEffect, fork, type ForkEffect } from 'redux-saga/effects';

import questionnaireSagas from './questionnaire/saga';

export default function* rootSaga(): Generator<AllEffect<ForkEffect<void>>, void, unknown> {
  yield all([fork(questionnaireSagas)]);
}
