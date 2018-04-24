import * as ts from 'typescript';
import * as Lint from 'tslint';

const RULE_NAME = 'io-export-style';
interface RuleOptions {
  single: boolean;
  allowDefault: boolean;
}
const MSG = {
  noDefault: 'Use of default exports is forbidden.',
  single: 'Only one export per file is allowed.',
  multi: 'Use an export next to each object being exported.',
  missing: 'Missing named exports declaration.',
};

class Rule extends Lint.Rules.AbstractRule {
  public static metadata: Lint.IRuleMetadata = {
    ruleName: RULE_NAME,
    description: "Enforces an export style",
    rationale: Lint.Utils.dedent`
      Having a consistent export style allows us to easily identify the objects we are exporting.
      `,
    optionsDescription: Lint.Utils.dedent`
      This rule takes in an options object with two properties: \`mode\` and \`allowDefault\`.
      
      - \`"single"\`: When using \`true\` the rule will check that there is only one \`export\`
                      keyword in the file.
      - \`"allowDefault"\`: boolean stating if we allow default exports. \`false\` by default.
      `,
    options: {
      type: 'object',
      properties: {
        single: {
          type: 'boolean',
        },
        allowDefault: {
          type: 'boolean',
        },
      },
      additionalProperties: false
    },
    optionExamples: [
      Lint.Utils.dedent`
        "${RULE_NAME}": [true]
        `,
      Lint.Utils.dedent`
        "${RULE_NAME}": [true, {
          "single": false,
          "allowDefault": true
        }]
        `,
      Lint.Utils.dedent`
        "${RULE_NAME}": [true, {
          "single": true,
          "allowDefault": false
        }]
        `,
    ],
    type: "maintainability",
    typescriptOnly: false,
  };

  public apply(sourceFile: ts.SourceFile): Lint.RuleFailure[] {
    const obj = this.getOptions().ruleArguments[0] || {};
    const options: RuleOptions = {
      single: typeof obj.single !== 'undefined' ? !!obj.single : true,
      allowDefault: obj.allowDefault !== false,
    }
    return this.applyWithWalker(new RuleWalker(sourceFile, RULE_NAME, options));
  }
}

class RuleWalker extends Lint.AbstractWalker<RuleOptions> {
  declarations: ts.ExportDeclaration[] = [];
  toExport: [ts.Node, string][] = [];
  defaultExport: ts.Node[] | undefined = undefined;

  public walk(sourceFile: ts.SourceFile): void {
    const cb = (node: ts.Node): void => {
      if (node.kind === ts.SyntaxKind.ExportDeclaration) {
        this.declarations.push(node as ts.ExportDeclaration);
      } else if (node.kind === ts.SyntaxKind.ExportKeyword && node.parent) {
        this.handleExportedObject(node);
      } else if (node.kind === ts.SyntaxKind.ExportAssignment) {
        // const exportMember = node.getChildAt(1);
        // if (exportMember && exportMember.kind === ts.SyntaxKind.DefaultKeyword) {
        //   // this.addFailureAtNode(exportMember, MSG.noDefault);
        // }
      } else {
        return ts.forEachChild(node, cb);
      }
    };
    ts.forEachChild(sourceFile, cb);
    return this.validate();
  }

  private validate(): void {
    if (this.toExport.length > 0) {
      const names = this.toExport.map(([node, name]) => {
        const fix = this.createFix(
          Lint.Replacement.deleteText(node.getStart(this.sourceFile), 7)
        );
        this.addFailureAtNode(node, MSG.single, fix);
        return name;
      });

      if (this.declarations.length === 0) {
        const end = this.sourceFile.end;
        const nList = names.join(',\n  ');
        const fix = this.createFix(Lint.Replacement.appendText(end, `export {\n  ${nList}\n};\n`));
        this.addFailureAt(end, 1, MSG.missing, fix);
      } else {
        this.declarations.forEach((declaraction) => {
          if (declaraction.exportClause) {
            names.push(...declaraction.exportClause.elements.map(x => x.name.text));
          }
        });
        console.log('here:', names);
      }

    }
  }

  private handleExportedObject(exportToken: ts.Node): void {
    const parent = exportToken.parent as ts.DeclarationStatement;
    const nodes = parent.modifiers;
    const defaultNode: ts.Node | undefined = (
      nodes &&
      nodes.length === 2 &&
      nodes[0].kind === ts.SyntaxKind.ExportKeyword &&
      nodes[1].kind === ts.SyntaxKind.DefaultKeyword
    ) ? nodes[1] : undefined;

    if (!defaultNode && this.options.single && parent.name) {
      this.toExport.push([exportToken, parent.name.text]);
    } else if (defaultNode && !this.options.allowDefault) {
      this.addFailureAtNode(defaultNode, MSG.noDefault);
    }
  }


}

export {
  Rule,
}
