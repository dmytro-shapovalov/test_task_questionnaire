### Install dependencies

```sh
npm install
```

### Run dev server

```sh
npm run dev
```

### Build application

```sh
npm run build
```

### Implementation notes

In general, selected approach is extensible and robust, but still there is plenty of space for improvement.

Interesting things to note:

1. The source config references a generated JSON schema. Try to edit it in VSCode! Notice that each object is discriminated by `screenType` field: `yesNoQuestion` doesn't need `options` and `openQuestion` needs. Also note that you cannot enter invalid pattern for interpolation! 🪄🔮
2. Source config is validated in runtime by the same schema.
3. Application state is minimal and everything else is calculated on-the-fly. This might need optimization in future, but as for initial development - the lesser the state - the quicker the process is.
4. Same pattern is used for determining next step and interpolating strings into the questions.

Next steps would be:

1. Harden runtime validation: check for duplicate ids, check that links aren't broken, check that no infinite loops exist.
2. Split current solution into smaller, clearer components.
