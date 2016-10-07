import { Component, Input, Output, OnChanges, EventEmitter, SimpleChange, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';

import * as shared from '../../shared';

@Component({
    moduleId: module.id,
    selector: 'tfrx-tree',
    templateUrl: 'tree.component.html',
    styleUrls: ['tree.component.css'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})

export class TreeComponent implements OnChanges {
    @Input() public treeNodes: shared.TreeNode[];
    @Input() public isTreeHidden: boolean;
    @Input() public dataProvider: shared.TreeDataProvider;

    @Input() public canSearch: boolean;
    @Input() public selectedNodes: shared.TreeNode[];
    @Output() public selectedItemChanged = new EventEmitter();

    private _rootNodes: shared.TreeNode[];
    private _search: FormControl = new FormControl();
    private _isNodeCollapsed: boolean = false;
    private _isHidden: boolean = true;
    private _isSearching: boolean = false;
    private _tempTreeNodes: shared.TreeNode[];

    constructor(private _changeDetectorRef: ChangeDetectorRef) {
        this._search.valueChanges
            .debounceTime(400)
            .distinctUntilChanged()
            .subscribe(term => {
                if (term.trim().length === 0) {
                    // stop searching
                    this.treeNodes = this._tempTreeNodes;
                    this.getRootNodes();
                    this._isSearching = false;
                } else if (this.dataProvider) {
                    this.dataProvider.search(term).subscribe(search => {
                        this.treeNodes = search;
                    });
                } else {
                    this.search(term);
                    this._isSearching = true;
                }
            });
    }
    public ngOnChanges(changes: { [propName: string]: SimpleChange }) {
        if (changes['treeNodes'] && changes['treeNodes'].currentValue.length > 0) {
            this._tempTreeNodes = this.treeNodes;
            this.getRootNodes();
            // console.warn('ROOT NODES ARE BEING BOUND', JSON.stringify(this._rootNodes));
        }
    }

    private getRootNodes() {
        this._rootNodes = this.treeNodes.filter(x => !x.path);
        this._changeDetectorRef.markForCheck();
    }

    private onSelectedItemChanged(nodes: shared.TreeNode[]) {
        this.selectedItemChanged.emit(nodes);
    }

    private search(term: string) {
        if (this._tempTreeNodes) {
            let regex: RegExp = new RegExp(term.toLowerCase());
            let tempCollection = this._tempTreeNodes.filter(x => regex.test(x.text.toLowerCase()));
            this.loadLinks(tempCollection);
            this.treeNodes = tempCollection;
            this.getRootNodes();
        }
    }

    private loadLinks(input: shared.TreeNode[]) {
        for (let item of input) {
            // console.log('looking at ', item._id, ' to load');
            if (!item.path) {
                // console.log(item._id, ' is a root item so no need to provide links');
                continue;
            }

            let paths = item.path.split(',');
            // console.log('--- paths are', JSON.stringify(paths));
            for (let path of paths) {
                if (path.length === 0) {
                    continue;
                }

                if (input.some(x => x.text === path)) {
                    // console.log(path, ' is already in inputs');
                    continue;
                }

                let item = this._tempTreeNodes.find(x => x.text === path);

                // console.log('------- ', item._id, ' is inserted into input list now')
                input.push(item);
            }
        }
        return input;
    }
}

/**
 *         if (this.dataProvider) {
            let regex: RegExp;
            if (node.path == null) {
                regex = new RegExp('^,' + node._id + ',$');
            }
            else {
                regex = new RegExp('^' + node.path + node._id + ',$');
            }
            console.log('loading descendants of ', node._id, ' in tree component');
            this.dataProvider.loadDescendants(node).subscribe(res => {
                node.children = [];
                res.forEach(element => {
                    node.children.push({ _id: element._id, path: element.path, children: [] });
                });
            });
        }

 */