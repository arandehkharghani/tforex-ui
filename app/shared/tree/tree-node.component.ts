import { Component, Input, Output, OnChanges, EventEmitter, SimpleChange, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { TreeNode, TreeDataProvider } from '../../shared';

@Component({
    moduleId: module.id,
    selector: 'tfrx-tree-node',
    templateUrl: 'tree-node.component.html',
    styleUrls: ['tree-node.component.css'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})

export class TreeNodeComponent implements OnChanges {
    @Input() public treeNodes: TreeNode[];
    @Input() public node: TreeNode;

    @Input() public dataProvider: TreeDataProvider;

    @Input() public selectedNodes: TreeNode[];
    @Input() public isVisible: boolean = false;
    @Input() public isSearching: boolean = false;
    @Output() public selectedItemChanged = new EventEmitter();

    private _children: TreeNode[] = [];
    private _isNodeCollapsed: boolean = true;
    private _isSelected: boolean = false;

    constructor(private _changeDetectorRef: ChangeDetectorRef) {

    }

    public ngOnChanges(changes: { [propName: string]: SimpleChange }) {
        if (changes['treeNodes'] && changes['treeNodes'].currentValue.length > 0) {
            this._children = this.getChildren();
            // console.warn('CHILDREN ARE BEING BOUND', JSON.stringify(this._children));
        }
        if (changes['isSearching']) {
            if (this._isSelected !== true) {
                this._isNodeCollapsed =
                    !changes['isSearching'].currentValue;
            }
        }
        if (changes['selectedNodes']) {
            if (this.selectedNodes.some(x => x._id === this.node._id && x.path === this.node.path)) {
                this._isSelected = true;
                this.isVisible = true;
                this._isNodeCollapsed = false;
            } else {
                this._isSelected = false;
            }
        }
    }

    private getChildren(): TreeNode[] {
        let regex: RegExp;

        if (this.node.path == null) {
            regex = new RegExp('^,' + this.node.text + ',$');
        } else {
            regex = new RegExp('^' + this.node.path + this.node.text + ',$');
        }
        return this.treeNodes.filter(x => x.path && regex.test(x.path));
    }

    private onSelectedItemChanged(nodes: TreeNode[]) {
        nodes.unshift(this.node);
        this.selectedItemChanged.emit(nodes);
    }

    private onNodeCollapseExpandClicked() {
        this._isNodeCollapsed = !this._isNodeCollapsed;
    }

    private onNodeSelected() {
        this.selectedItemChanged.emit([this.node]);
    }
}