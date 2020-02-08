export const grammarRules = `
Truth {
  Exp
    = BiconditionalExp

  BiconditionalExp
    = BiconditionalExp "<->" BiconditionalExp  --arrows
    | BiconditionalExp "=" BiconditionalExp  --singleEquals
    | BiconditionalExp "==" BiconditionalExp  --doubleEquals
    | BiconditionalExp caseInsensitive<"iff "> BiconditionalExp --iff
    | BiconditionalExp caseInsensitive<"if and only if"> BiconditionalExp  --ifAndOnlyIf
    | ConverseExp

  ConverseExp
    = ConverseExp "<-" ConverseExp  -- arrow
    | IfExp

  IfExp
    = IfExp "->" IfExp  -- arrow
    | caseInsensitive<"if "> IfExp caseInsensitive<"then "> IfExp  -- ifThen
    | OrExp
  
  OrExp
    = OrExp caseInsensitive<"or "> XorExp  -- or
    | OrExp "||" XorExp  -- doublePipe
    | OrExp "|" XorExp  -- singlePipe
    | XorExp
  
  XorExp
    = XorExp caseInsensitive<"xor "> AndExp  -- xor
    | XorExp "^" AndExp  --caret
    | AndExp
  
  AndExp
    = AndExp caseInsensitive<"and "> PriExp  -- and
    | AndExp "&&" PriExp  -- doubleAmpersand
    | AndExp "&" PriExp  --singleAmpersand
    | PriExp

  PriExp
    = NotExp
    | ParenExp
    | True
    | False
    | ident
  
  ParenExp
    = "(" Exp ")"
       
  NotExp
    = caseInsensitive<"not "> PriExp
    | "!" PriExp
    | "~" PriExp

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
