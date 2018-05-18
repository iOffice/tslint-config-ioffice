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
  missing: 'Missing named exports declaration.',
  all: 'All exports should be declared in the last export declaration.',
};

class Rule extends Lint.Rules.AbstractRule {
  public static metadata: Lint.IRuleMetadata = {
    ruleName: RULE_NAME,
    description: "Enforces an export style",
    rationale: Lint.Utils.dedent`
      Having a consistent export style allows us to easily identify the objects we are exporting.
      `,
    optionsDescription: Lint.Utils.dedent`
      This rule takes takes no options
      `,
    options: {
      type: 'object',
      additionalProperties: false,
    },
    optionExamples: [
      Lint.Utils.dedent`
        "${RULE_NAME}": [true]
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
    };
    return this.applyWithWalker(new RuleWalker(sourceFile, RULE_NAME, options));
  }
}

class RuleWalker extends Lint.AbstractWalker<RuleOptions> {
  declarations: ts.ExportDeclaration[] = [];
  toExport: [ts.Node, string][] = [];
  defaultExport: ts.Node | undefined = undefined;

  public walk(sourceFile: ts.SourceFile): void {
    const cb = (node: ts.Node): void => {
      if (node.kind === ts.SyntaxKind.ExportDeclaration) {
        this.declarations.push(node as ts.ExportDeclaration);
      } else if (node.kind === ts.SyntaxKind.ExportKeyword && node.parent) {
        this.handleExportedObject(node);
      } else if (node.kind === ts.SyntaxKind.ExportAssignment) {
        this.defaultExport = node;
        const exportMember = node.getChildAt(1);
        if (exportMember && exportMember.kind === ts.SyntaxKind.DefaultKeyword) {
          // No fix for default export since we may not be exporting a variable. We'll leave as
          // is and allow the developer to remove it manually.
          this.addFailureAtNode(exportMember, MSG.noDefault);
        }
      } else if (node.kind === ts.SyntaxKind.ModuleDeclaration) {
        // Not messing with namespaces and module declarations, we only care about exports in
        // the top level file
        return;
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
        const fix = Lint.Replacement.deleteText(node.getStart(this.sourceFile), 7);
        this.addFailureAtNode(node, MSG.single, fix);
        return name;
      });

      if (this.declarations.length === 0) {
        const end = this.sourceFile.end;
        const nList = names.join(',\n  ');
        const fix = Lint.Replacement.appendText(end,  `export {\n  ${nList},\n};\n`);
        this.addFailureAt(end, 1, MSG.missing, fix);
      } else {
        const lastIndex = this.declarations.length - 1;
        this.declarations.forEach((declaration, index) => {
          if (declaration.exportClause) {
            names.push(...declaration.exportClause.elements.map(x => x.name.text));
            if (index < lastIndex) {
              const fix = Lint.Replacement.deleteText(
                declaration.getStart(this.sourceFile),
                declaration.getText(this.sourceFile).length + 1,
              );
              this.addFailureAtNode(declaration, MSG.single, fix);
            }
          }
        });

        const lastDeclaration = this.declarations[this.declarations.length - 1];
        const nList = names.join(',\n  ');
        const fix = Lint.Replacement.replaceNode(lastDeclaration, `export {\n  ${nList},\n};`, this.sourceFile);
        this.addFailureAtNode(lastDeclaration, MSG.all, fix);
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

    if (defaultNode) {
      this.addFailureAtNode(defaultNode, MSG.noDefault);
    } else if (parent.name) {
      this.toExport.push([exportToken, parent.name.text]);
    } else {
      // Not sure how we are exporting but we detected the export keyword
      this.addFailureAtNode(exportToken, MSG.single);
    }
  }
}

export {
  Rule,
};
