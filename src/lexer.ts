import moo from "moo";

export default moo.compile({
  // --- Whitespace & Comments ---
  ws: /[ \t]+/,
  comment: /\/\/.*?$|\/\*[\s\S]*?\*\//,
  // --- Literals ---
  num: /0|[1-9][0-9]*/,
  str: {
    match: /(?:"(?:\\.|[^"\\\n])*"|'(?:\\.|[^'\\\n])*')/, // Do both "" and ''
    value: (s) => s.slice(1, -1),
  },

  bool: ["true", "True", "false", "False"],

  // --- Directives ---
  directive: {
    match: /#[a-zA-Z]+/,
    value: (s) => s.toLowerCase().slice(1),
  },
  // --- Command arguments ---
  argument: {
    match: /--[a-zA-Z]+/,
    value: (s) => s.toLowerCase().slice(1),
  },

  //--- Entity ref ---
  ent_ref: ["@p", "@s", "@r", "@n", "@e"],

  //--- Identity & Keywords ---
  iden: {
    match: /[a-zA-Z_][a-zA-Z_0-9]*/,
    type: moo.keywords({
      kw_loop: ["while", "for", "break", "do"],
      kw_cond: ["if", "else", "switch", "case"],
      kw_func: ["func", "function"],
    }),
  },
  //--- Brackets ---
  lparam: "(",
  rparam: ")",
  lcurl: "{",
  rcurl: "}",
  lsq: "[",
  rsq: "]",

  //--- Operators ---
  exp_op: "^",
  mult_op: ["*", "/"],
  sum_op: ["-", "+"],
  compare_op: ["==", "!=", "<=", ">="],
  bool_op: ["&&", "||"],
  assign: "=",
  bitmask: [">>", "<<", "|", "&"],

  //--- Other Symbols ---
  lambda: "=>",
  marco: "$",
  comma: ",",
  dot: ".",
  colon: ":",

  nl: { match: /\r?\n|\r/, lineBreaks: true },
  lex_missing: moo.error,
});
