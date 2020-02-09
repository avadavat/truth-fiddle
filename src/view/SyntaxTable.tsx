import React from 'react';

export const SyntaxTable = React.memo(function SyntaxTable() {
  return (
    <div className="Syntax-Table">
      <table>
        <tbody>
          <tr>
            <th>Operation</th>
            <th>Syntax</th>
          </tr>
          <tr>
            <td>
              <a href="https://en.wikipedia.org/wiki/Negation">Negation</a>
            </td>
            <td>!</td>
          </tr>
          <tr>
            <td>
              <a href="https://en.wikipedia.org/wiki/Logical_conjunction">
                Conjuction
              </a>
            </td>
            <td>&amp;&amp;</td>
          </tr>
          <tr>
            <td>
              <a href="https://en.wikipedia.org/wiki/Logical_disjunction">
                Inclusive Disjunction
              </a>
            </td>
            <td>||</td>
          </tr>
          <tr>
            <td>
              <a href="https://en.wikipedia.org/wiki/Exclusive_or">
                Exclusive Disjunction
              </a>
            </td>
            <td>^</td>
          </tr>
          <tr>
            <td>
              <a href="https://en.wikipedia.org/wiki/Material_conditional">
                Implication
              </a>
            </td>
            <td>-&gt;</td>
          </tr>
          <tr>
            <td>
              <a href="https://en.wikipedia.org/wiki/Converse_implication">
                Converse Implication
              </a>
            </td>
            <td>&lt;-</td>
          </tr>
          <tr>
            <td>
              <a href="https://en.wikipedia.org/wiki/If_and_only_if">
                Biconditional
              </a>
            </td>
            <td>&lt;-&gt;</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
});
