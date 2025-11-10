@preprocessor typescript
@{%
import loom_lexer from '../lexer.ts';
import * as post from '../postProcessor.ts' 
%}
@lexer loom_lexer

@include "directives.ne"
@include "func.ne"
@include "expr.ne"


prog_statements
  -> _ws prog_statement {% data => [data[1]] %}
  | prog_statements __nl prog_statement {% data => [...data[0],data[2]] %}

#Statements that are specific to the file level, includes func def, directive handling and more
prog_statement
    -> directives {% id %}
    |  func_def {% id %}
    
#Statements that are specific to the function/conditional level, includes command proccessing variable assignment and more.
sub_statements
  -> _ws sub_statement {% data => [data[1]] %}
  | sub_statements __nl sub_statement {% data => [...data[0],data[2]] %}

sub_statement
    -> var_assign {% id %}

var_assign
    -> %iden _ "=" _ bin_expr {% post.varAssign %}

# Does both doesn't care about spacing at all
_ -> (%ws | %nl):* {% () => null %}
__ -> (%ws | %nl):+ {% () => null %}

# Skip new line
_nl   -> %nl:*  {% () => null  %}
__nl -> %nl:+  {% () => null %}

# Skip only white space
_ws -> %ws:* {% () => null %}
__ws -> %ws:+ {% () => null %}
