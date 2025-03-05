function assertNotNull<T>(val: T | null | undefined): asserts val is T {
  if (val === null || val === undefined) {
    throw new TypeError(
      `Expected a value, but got ${val === null ? 'null' : 'undefined'} instead.`,
    );
  }
}

function assertExhausted(val: never) {
  throw new Error(`Got unexpected value: ${String(val)}.`);
}

export { assertExhausted, assertNotNull };
