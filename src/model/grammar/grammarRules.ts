export const grammarRules = `
Truth {
  Exp
    = IfExp

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
    | ident
  
  ParenExp
    = "(" Exp ")"
       
  NotExp
    = caseInsensitive<"not "> PriExp
    | "!" PriExp
    | "~" PriExp
      
  ident  (an identifier)
    = ~keyword letter alnum*

  keyword
    = (
      caseInsensitive<"not">
      | caseInsensitive<"and">
      | caseInsensitive<"or">
      | caseInsensitive<"xor">
    ) ~(alnum+)
}
`;
