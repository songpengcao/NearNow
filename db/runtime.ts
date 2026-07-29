export type RuntimeBindings = {
  DB?: D1Database;
  ADMIN_EMAILS?: string;
};

const runtimeBindingsKey = Symbol.for("nearnow.runtime.bindings");

type RuntimeGlobal = typeof globalThis & {
  [runtimeBindingsKey]?: RuntimeBindings;
};

export function setRuntimeBindings(bindings: RuntimeBindings) {
  (globalThis as RuntimeGlobal)[runtimeBindingsKey] = bindings;
}

export function getRuntimeBindings() {
  return (globalThis as RuntimeGlobal)[runtimeBindingsKey] ?? {};
}
