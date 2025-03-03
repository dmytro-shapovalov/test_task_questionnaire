function assertNotNull<T>(val: T | null | undefined): asserts val is T {
  if (val === null || val === undefined) {
    throw new TypeError(
      `Expected a value, but got ${val === null ? 'null' : 'undefined'} instead.`,
    );
  }
}

export { assertNotNull };
