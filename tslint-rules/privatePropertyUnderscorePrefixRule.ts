import * as ts from "typescript";
import * as Lint from "tslint/lib/lint";

import { ExtendedMetadata } from './extendedMetadata';
import { Ng2Walker } from './ng2Walker';

const failureUnderscoreMissing = 'Underscore is missing in private property: ';

export class Rule extends Lint.Rules.AbstractRule {

    public static metadata: ExtendedMetadata = {
        ruleName: 'private-property-underscore-prefix',
        type: 'maintainability',
        description: 'prefix of "_" is mandatory for private properties',
        options: null,
        issueClass: 'Non-SDL',
        issueType: 'Error',
        severity: 'Important',
        level: 'Mandatory',
        group: 'Correctness',
        commonWeaknessEnumeration: '1',
    };

    public apply(sourceFile: ts.SourceFile): Lint.RuleFailure[] {
        return this.applyWithWalker(new UnderscorePrivateWalker(sourceFile, this.getOptions()));
    }
}

// The walker takes care of all the work.
class UnderscorePrivateWalker extends Ng2Walker {
    protected visitPropertyDeclaration(node: ts.PropertyDeclaration) {
        if (node.getFirstToken().kind === ts.SyntaxKind.PrivateKeyword) {
            if (node.name.getText()[0] !== '_') {
                this.addFailure(this.createFailure(node.getStart(), node.getWidth(), failureUnderscoreMissing + node.getText()));
            }
        }
        super.visitPropertyDeclaration(node);
    }
    protected visitNg2Input(node: ts.PropertyDeclaration, input: ts.Decorator, args) {
        let hasPrivate = node.getChildren().some(child => child.kind === ts.SyntaxKind.SyntaxList && child.getText() === 'private');
        if (hasPrivate &&
            node.name.getText()[0] !== '_') {
            this.addFailure(this.createFailure(node.getStart(), node.getWidth(), failureUnderscoreMissing + node.getText()));
        }
        super.visitNg2Input(node, input, args);
    }

    protected visitNg2Output(node: ts.PropertyDeclaration, input: ts.Decorator, args) {
        let hasPrivate = node.getChildren().some(child => child.kind === ts.SyntaxKind.SyntaxList && child.getText() === 'private');
        if (hasPrivate &&
            node.name.getText()[0] !== '_') {
            this.addFailure(this.createFailure(node.getStart(), node.getWidth(), failureUnderscoreMissing + node.getText()));
        }
        super.visitNg2Output(node, input, args);
    }

    protected visitNg2HostBinding(node: ts.PropertyDeclaration, input: ts.Decorator, args) {
        if (node.name.getText()[0] !== '_') {
            this.addFailure(this.createFailure(node.getStart(), node.getWidth(), failureUnderscoreMissing + node.getText()));
        }
        super.visitNg2HostBinding(node, input, args);
    }
}