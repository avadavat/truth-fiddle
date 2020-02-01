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
    = "not " PriExp
    | "NOT " PriExp
  
  OrExp
    = Exp "or " Exp
    | Exp "OR " Exp
  
  AndExp
    = Exp "and " Exp
    | Exp "AND " Exp
  
  XorExp
    = Exp "xor " Exp
    | Exp "XOR " Exp
  
  ParenExp
    = "(" Exp ")"
      
  ident  (an identifier)
    = letter alnum*
}
`;
