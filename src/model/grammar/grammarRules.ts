export const grammarRules = `
Truth {
  Exp
    = BiconditionalExp

  BiconditionalExp
    = BiconditionalExp BiconditionalOp BiconditionalExp  --biconditional
    | ConverseNimplyExp

  BiconditionalOp
    = "<-" "-"? ">"  --double_arrow
    | "<=" "="? ">"  --fat_double_arrow
    | "=" "="?  -- single_or_double_equals
    | caseInsensitive<"iff ">
    | caseInsensitive<"if and only if ">
    | caseInsensitive<"equals ">

  ConverseNimplyExp
    = ConverseNimplyExp ConverseNimplyOp ConverseNimplyExp  --converseNimply
    | ConverseExp

  ConverseNimplyOp
    = "<-/-"  --arrow
    | "<=/="  --fat_arrow

  ConverseExp
    = ConverseExp ConverseOp ConverseExp  -- arrow
    | NimplyExp

  ConverseOp
    = "<-" "-"? --arrow
    | "<=" "="? --fat_arrow

  NimplyExp
    = NimplyExp NimplyOp NimplyExp  -- nimply
    | IfExp

  NimplyOp
    = caseInsensitive<"nimply ">  --nimply
    | caseInsensitive<"nimplies ">  --nimplies
    | "-/->"  --arrow
    | "=/=>"  --fat_arrow

  IfExp
    = IfExp IfOp IfExp  -- arrow
    | caseInsensitive<"if "> IfExp caseInsensitive<"then "> IfExp  -- ifThen
    | OrExp

  IfOp
    = "->"  --arrow
    | "-->" --long_arrow
    | "=>"  --fat_arrow
    | "==>" --long_fat_arrow
    | caseInsensitive<"implies ">  --implies
    | caseInsensitive<"imply ">  --imply
  
  OrExp
    = OrExp OrOp XorExp  -- or
    | XorExp

  OrOp
    = caseInsensitive<"or ">
    | "|" "|"?  -- single_or_double_pipe
    | "\\\\/"
  
  XorExp
    = XorExp XorOp AndExp  -- xor
    | AndExp

  XorOp
    = caseInsensitive<"xor ">
    | caseInsensitive<"not equals ">
    | "^"
    | "=/="
    | "!="
    | "~="
  
  AndExp
    = AndExp AndOp PriExp  -- and
    | PriExp

  AndOp
    = caseInsensitive<"and ">
    | "&" "&"?  --single_or_double_ampersand
    | "/\\\\"

  PriExp
    = NotExp
    | ParenExp
    | True
    | False
    | ident
  
  ParenExp
    = OpenParenOp Exp CloseParenOp

  OpenParenOp
    = "("

  CloseParenOp
    = ")"
       
  NotExp
    = NotOp PriExp

  NotOp
    = caseInsensitive<"not ">
    | "!"
    | "~"

  True
    = caseInsensitive<"true">

  False
    = caseInsensitive<"false">
      
  ident  (an identifier)
    = ~keyword letter alnum*

  keyword
    = (
      caseInsensitive<"not">
      | caseInsensitive<"and">
      | caseInsensitive<"or">
      | caseInsensitive<"xor">
      | caseInsensitive<"if">
      | caseInsensitive<"then">
      | caseInsensitive<"only">
      | caseInsensitive<"iff">
      | caseInsensitive<"true">
      | caseInsensitive<"false">
      | caseInsensitive<"equals">
      | caseInsensitive<"imply">
      | caseInsensitive<"implies">
      | caseInsensitive<"nimply">
      | caseInsensitive<"nimplies">
    ) ~(alnum+)
}
`;
