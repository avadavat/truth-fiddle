export const grammarRules = `
Truth {
  Exp
    = NotExp
    | OrExp
    | AndExp
    | XorExp
    | ParenExp
    | ident
       
  NotExp
    = "not" Exp
    | "NOT" Exp
  
  OrExp
    = Exp "or" Exp
    | Exp "OR" Exp
  
  AndExp
    = Exp "and" Exp
    | Exp "AND" Exp
  
  XorExp
    = Exp "xor" Exp
    | Exp "XOR" Exp
  
  ParenExp
    = "(" Exp ")"
      
  ident  (an identifier)
    = letter alnum*
}
`;
