"use strict";

/**
 * CommonJS helper untuk topik 13 — diekspor lewat `module.exports`.
 * Dari ESM: `createRequire(import.meta.url)("./cjs-exports.cjs")`.
 */

const API_VERSION = 1;

/**
 * @param {string} name
 */
function buildGreeting(name) {
  return `Hello, ${String(name)}`;
}

/**
 * @param {number} a
 * @param {number} b
 */
function add(a, b) {
  return a + b;
}

module.exports = {
  API_VERSION,
  buildGreeting,
  add,
  /** @type {'cjs'} */
  kind: "cjs",
  defaultExportSimulation: { runtime: "commonjs" },
};
