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
              <a href="https://en.wikipedia.org/wiki/Negation" target="_blank">
                Negation
              </a>
            </td>
            <td>!</td>
          </tr>
          <tr>
            <td>
              <a
                href="https://en.wikipedia.org/wiki/Logical_conjunction"
                target="_blank"
              >
                Conjuction
              </a>
            </td>
            <td>&amp;&amp;</td>
          </tr>
          <tr>
            <td>
              <a
                href="https://en.wikipedia.org/wiki/Logical_disjunction"
                target="_blank"
              >
                Inclusive Disjunction
              </a>
            </td>
            <td>||</td>
          </tr>
          <tr>
            <td>
              <a
                href="https://en.wikipedia.org/wiki/Exclusive_or"
                target="_blank"
              >
                Exclusive Disjunction
              </a>
            </td>
            <td>^</td>
          </tr>
          <tr>
            <td>
              <a
                href="https://en.wikipedia.org/wiki/Material_conditional"
                target="_blank"
              >
                Implication
              </a>
            </td>
            <td>-&gt;</td>
          </tr>
          <tr>
            <td>
              <a
                href="https://en.wikipedia.org/wiki/Converse_implication"
                target="_blank"
              >
                Converse Implication
              </a>
            </td>
            <td>&lt;-</td>
          </tr>
          <tr>
            <td>
              <a
                href="https://en.wikipedia.org/wiki/If_and_only_if"
                target="_blank"
              >
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
