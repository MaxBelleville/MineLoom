@preprocessor typescript
@{%
import { lexer } from '../lexer.ts'
%}
@lexer lexer

statement
    -> var_assign 

var_assign
    -> %iden _ "=" _ expr

expr
    -> %str
    | %num
    | %bool

_ -> %ws:*