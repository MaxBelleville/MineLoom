@lexer loom_lexer

bin_expr 
    -> bin_expr _ ("+"|"-") _ mult_expr {% data => post.binExpr("bin_sum",data) %}
    | mult_expr {% id %}

mult_expr 
    -> mult_expr _ ("*"|"/") _ pow_expr {% data => post.binExpr("bin_mult",data) %}
    | pow_expr {% id %}

pow_expr 
    -> compare_expr _ "^" _ pow_expr  {% data => post.binExpr("bin_pow",data) %}
    | compare_expr {% id %}

compare_expr 
    -> compare_expr _ %compare_op _ bool_expr  {% data => post.binExpr("bin_comp",data) %}
    | bool_expr {% id %}

bool_expr 
    -> bool_expr _ ("||"|"&&") _ expr  {% data => post.binExpr("bin_bool",data) %}
    | expr {% id %}

expr
    -> %str {% id %}
    | %num {% id %}
    | %iden {% id %}
    | %bool {% id %}
    | "(" _ bin_expr _ ")" {% data => data[2] %}