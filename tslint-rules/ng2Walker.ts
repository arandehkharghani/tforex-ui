import * as ts from "typescript";
import * as Lint from "tslint/lib/lint";

export class Ng2Walker extends Lint.RuleWalker {
    protected visitPropertyDeclaration(node: ts.PropertyDeclaration) {
        (node.decorators || []).forEach(x => this.visitPropertyDecorator(x));
        super.walkChildren(node);
    }

    protected visitNg2Input(node: ts.PropertyDeclaration, input: ts.Decorator, args) {
        return null;
    }
    protected visitNg2Output(node: ts.PropertyDeclaration, input: ts.Decorator, args) {
        return null;
    }
    protected visitNg2HostBinding(node: ts.PropertyDeclaration, input: ts.Decorator, args) {
        return null;
    }

    private visitPropertyDecorator(decorator) {
        let name = this.getDecoratorName(decorator);
        switch (name) {
            case 'Input':
                this.visitNg2Input(decorator.parent, decorator, this.getDecoratorStringArgs(decorator));
                break;
            case 'Output':
                this.visitNg2Output(decorator.parent, decorator, this.getDecoratorStringArgs(decorator));
                break;
            case 'HostBinding':
                this.visitNg2HostBinding(decorator.parent, decorator, this.getDecoratorStringArgs(decorator));
                break;
        }
    }
    private getDecoratorStringArgs(decorator) {
        let baseExpr = decorator.expression || {};
        let expr = baseExpr.expression || {};
        let args = baseExpr.arguments || [];
        return args.map(function (a) { return (a.kind === ts.SyntaxKind.StringLiteral) ? a.text : null; });
    }
    private getDecoratorName(decorator) {
        let baseExpr = decorator.expression || {};
        let expr = baseExpr.expression || {};
        return expr.text;
    }
}