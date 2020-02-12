export const grammarRules = `
Truth {
  Exp
    = BiconditionalExp

  BiconditionalExp
    = BiconditionalExp BiconditionalOp BiconditionalExp  --biconditional
    | ConverseExp

  BiconditionalOp
    = "<->"
    | "=="
    | "="
    | caseInsensitive<"iff ">
    | caseInsensitive<"if and only if">

  ConverseExp
    = ConverseExp ConverseOp ConverseExp  -- arrow
    | IfExp

  ConverseOp
    = "<-"

  IfExp
    = IfExp IfOp IfExp  -- arrow
    | caseInsensitive<"if "> IfExp caseInsensitive<"then "> IfExp  -- ifThen
    | OrExp

  IfOp
    = "->"
  
  OrExp
    = OrExp OrOp XorExp  -- or
    | XorExp

  OrOp
    = caseInsensitive<"or ">
    | "||"
    | "|"
  
  XorExp
    = XorExp XorOp AndExp  -- xor
    | AndExp

  XorOp
    = caseInsensitive<"xor ">
    | "^"
  
  AndExp
    = AndExp AndOp PriExp  -- and
    | PriExp

  AndOp
    = caseInsensitive<"and ">
    | "&&"
    | "&"

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
    ) ~(alnum+)
}
`;
