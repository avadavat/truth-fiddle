export const grammarRules = `
Truth {
  Exp
    = OrExp
    | AndExp
    | XorExp
    | PriExp

  PriExp
    = NotExp
    | ParenExp
    | ident
       
  NotExp
    = caseInsensitive<"not "> PriExp
  
  OrExp
    = Exp caseInsensitive<"or "> Exp
  
  AndExp
    = Exp caseInsensitive<"and "> Exp
  
  XorExp
    = Exp caseInsensitive<"xor "> Exp
  
  ParenExp
    = "(" Exp ")"
      
  ident  (an identifier)
    = letter alnum*
}
`;
