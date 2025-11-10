// Generated automatically by nearley, version 2.20.1
// http://github.com/Hardmath123/nearley
// Bypasses TS6133. Allow declared but unused functions.
// @ts-ignore
function id(d: any[]): any { return d[0]; }
declare var compare_op: any;
declare var str: any;
declare var num: any;
declare var iden: any;
declare var bool: any;
declare var ws: any;
declare var nl: any;

import loom_lexer from '../lexer.ts';
import * as post from '../postProcessor.ts' 

interface NearleyToken {
  value: any;
  [key: string]: any;
};

interface NearleyLexer {
  reset: (chunk: string, info: any) => void;
  next: () => NearleyToken | undefined;
  save: () => any;
  formatError: (token: never) => string;
  has: (tokenType: string) => boolean;
};

interface NearleyRule {
  name: string;
  symbols: NearleySymbol[];
  postprocess?: (d: any[], loc?: number, reject?: {}) => any;
};

type NearleySymbol = string | { literal: any } | { test: (token: any) => boolean };

interface Grammar {
  Lexer: NearleyLexer | undefined;
  ParserRules: NearleyRule[];
  ParserStart: string;
};

const grammar: Grammar = {
  Lexer: loom_lexer,
  ParserRules: [
    {"name": "bin_expr$subexpression$1", "symbols": [{"literal":"+"}]},
    {"name": "bin_expr$subexpression$1", "symbols": [{"literal":"-"}]},
    {"name": "bin_expr", "symbols": ["bin_expr", "_", "bin_expr$subexpression$1", "_", "mult_expr"], "postprocess": data => post.binExpr("bin_sum",data)},
    {"name": "bin_expr", "symbols": ["mult_expr"], "postprocess": id},
    {"name": "mult_expr$subexpression$1", "symbols": [{"literal":"*"}]},
    {"name": "mult_expr$subexpression$1", "symbols": [{"literal":"/"}]},
    {"name": "mult_expr", "symbols": ["mult_expr", "_", "mult_expr$subexpression$1", "_", "pow_expr"], "postprocess": data => post.binExpr("bin_mult",data)},
    {"name": "mult_expr", "symbols": ["pow_expr"], "postprocess": id},
    {"name": "pow_expr", "symbols": ["compare_expr", "_", {"literal":"^"}, "_", "pow_expr"], "postprocess": data => post.binExpr("bin_pow",data)},
    {"name": "pow_expr", "symbols": ["compare_expr"], "postprocess": id},
    {"name": "compare_expr", "symbols": ["compare_expr", "_", (loom_lexer.has("compare_op") ? {type: "compare_op"} : compare_op), "_", "bool_expr"], "postprocess": data => post.binExpr("bin_comp",data)},
    {"name": "compare_expr", "symbols": ["bool_expr"], "postprocess": id},
    {"name": "bool_expr$subexpression$1", "symbols": [{"literal":"||"}]},
    {"name": "bool_expr$subexpression$1", "symbols": [{"literal":"&&"}]},
    {"name": "bool_expr", "symbols": ["bool_expr", "_", "bool_expr$subexpression$1", "_", "expr"], "postprocess": data => post.binExpr("bin_bool",data)},
    {"name": "bool_expr", "symbols": ["expr"], "postprocess": id},
    {"name": "expr", "symbols": [(loom_lexer.has("str") ? {type: "str"} : str)], "postprocess": id},
    {"name": "expr", "symbols": [(loom_lexer.has("num") ? {type: "num"} : num)], "postprocess": id},
    {"name": "expr", "symbols": [(loom_lexer.has("iden") ? {type: "iden"} : iden)], "postprocess": id},
    {"name": "expr", "symbols": [(loom_lexer.has("bool") ? {type: "bool"} : bool)], "postprocess": id},
    {"name": "expr", "symbols": [{"literal":"("}, "_", "bin_expr", "_", {"literal":")"}], "postprocess": data => data[2]},
    {"name": "prog_statements", "symbols": ["_ws", "prog_statement"], "postprocess": data => [data[1]]},
    {"name": "prog_statements", "symbols": ["prog_statements", "__nl", "prog_statement"], "postprocess": data => [...data[0],data[2]]},
    {"name": "prog_statement", "symbols": ["directives"], "postprocess": id},
    {"name": "prog_statement", "symbols": ["func_def"], "postprocess": id},
    {"name": "sub_statements", "symbols": ["_ws", "sub_statement"], "postprocess": data => [data[1]]},
    {"name": "sub_statements", "symbols": ["sub_statements", "__nl", "sub_statement"], "postprocess": data => [...data[0],data[2]]},
    {"name": "sub_statement", "symbols": ["var_assign"], "postprocess": id},
    {"name": "var_assign", "symbols": [(loom_lexer.has("iden") ? {type: "iden"} : iden), "_", {"literal":"="}, "_", "bin_expr"], "postprocess": post.varAssign},
    {"name": "_$ebnf$1", "symbols": []},
    {"name": "_$ebnf$1$subexpression$1", "symbols": [(loom_lexer.has("ws") ? {type: "ws"} : ws)]},
    {"name": "_$ebnf$1$subexpression$1", "symbols": [(loom_lexer.has("nl") ? {type: "nl"} : nl)]},
    {"name": "_$ebnf$1", "symbols": ["_$ebnf$1", "_$ebnf$1$subexpression$1"], "postprocess": (d) => d[0].concat([d[1]])},
    {"name": "_", "symbols": ["_$ebnf$1"], "postprocess": () => null},
    {"name": "__$ebnf$1$subexpression$1", "symbols": [(loom_lexer.has("ws") ? {type: "ws"} : ws)]},
    {"name": "__$ebnf$1$subexpression$1", "symbols": [(loom_lexer.has("nl") ? {type: "nl"} : nl)]},
    {"name": "__$ebnf$1", "symbols": ["__$ebnf$1$subexpression$1"]},
    {"name": "__$ebnf$1$subexpression$2", "symbols": [(loom_lexer.has("ws") ? {type: "ws"} : ws)]},
    {"name": "__$ebnf$1$subexpression$2", "symbols": [(loom_lexer.has("nl") ? {type: "nl"} : nl)]},
    {"name": "__$ebnf$1", "symbols": ["__$ebnf$1", "__$ebnf$1$subexpression$2"], "postprocess": (d) => d[0].concat([d[1]])},
    {"name": "__", "symbols": ["__$ebnf$1"], "postprocess": () => null},
    {"name": "_nl$ebnf$1", "symbols": []},
    {"name": "_nl$ebnf$1", "symbols": ["_nl$ebnf$1", (loom_lexer.has("nl") ? {type: "nl"} : nl)], "postprocess": (d) => d[0].concat([d[1]])},
    {"name": "_nl", "symbols": ["_nl$ebnf$1"], "postprocess": () => null},
    {"name": "__nl$ebnf$1", "symbols": [(loom_lexer.has("nl") ? {type: "nl"} : nl)]},
    {"name": "__nl$ebnf$1", "symbols": ["__nl$ebnf$1", (loom_lexer.has("nl") ? {type: "nl"} : nl)], "postprocess": (d) => d[0].concat([d[1]])},
    {"name": "__nl", "symbols": ["__nl$ebnf$1"], "postprocess": () => null},
    {"name": "_ws$ebnf$1", "symbols": []},
    {"name": "_ws$ebnf$1", "symbols": ["_ws$ebnf$1", (loom_lexer.has("ws") ? {type: "ws"} : ws)], "postprocess": (d) => d[0].concat([d[1]])},
    {"name": "_ws", "symbols": ["_ws$ebnf$1"], "postprocess": () => null},
    {"name": "__ws$ebnf$1", "symbols": [(loom_lexer.has("ws") ? {type: "ws"} : ws)]},
    {"name": "__ws$ebnf$1", "symbols": ["__ws$ebnf$1", (loom_lexer.has("ws") ? {type: "ws"} : ws)], "postprocess": (d) => d[0].concat([d[1]])},
    {"name": "__ws", "symbols": ["__ws$ebnf$1"], "postprocess": () => null}
  ],
  ParserStart: "prog_statements",
};

export default grammar;
