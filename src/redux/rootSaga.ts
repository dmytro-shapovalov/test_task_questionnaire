import { all, type AllEffect, type ForkEffect } from 'redux-saga/effects';

export default function* rootSaga(): Generator<AllEffect<ForkEffect<void>>, void, unknown> {
  yield all([]);
}
