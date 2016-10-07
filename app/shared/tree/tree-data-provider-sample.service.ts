import { Injectable, Inject, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';
import { Http } from '@angular/http';

import * as shared from '../../shared';
import * as core from '../../core';

@Injectable()
export class TreeDataProviderSampleService implements shared.TreeDataProvider {

    private _dummyData: shared.TreeNode[] = [
        { _id: "Books", text: 'Boks', path: null },
        { _id: "Programming", text: 'Programming', path: ",Books," },
        { _id: "Databases", text: 'Databases', path: ",Books,Programming," },
        { _id: "Languages", text: 'Languages', path: ",Books,Programming," },
        { _id: "MongoDB", text: 'MongoDB', path: ",Books,Programming,Databases," },
        { _id: "dbm", text: 'dbm', path: ",Books,Programming,Databases," },

        { _id: "Classes", text: 'Casses', path: null },
        { _id: "Cooking", text: 'Cooking', path: ",Classes," },
        { _id: "Desert", text: 'Desert', path: ",Classes,Cooking," },
        { _id: "Main", text: 'Main', path: ",Classes,Cooking," },
        { _id: "Seafood", text: 'Seafood', path: ",Classes,Cooking,Main," },
        { _id: "Pizza", text: 'Pizza', path: ",Classes,Cooking,Main," },
    ];


    private _dataStore: shared.TreeNode[];
    private _searchDataStore: shared.TreeNode[];

    private _searchedTerms: string[] = [];

    constructor(private _http: Http, @Inject(core.appSettings) private _appSettings: core.AppSettings) {
        this._dataStore = [];
        this.initialiseDataStore();
    }

    /**
     * node: the node ref which is being cliked on the UI
     */
    public loadDescendants(node: shared.TreeNode): Observable<shared.TreeNode[]> {
        if (!node) {
            return this.loadRoots();
        }

        let tempCollection: shared.TreeNode[] = [];
        return Observable.create(observer => {
            if (!node) {
                return;
            }
            let regex: RegExp;
            if (node.path == null) {
                regex = new RegExp('^,' + node.text + ',$');
            } else {
                regex = new RegExp('^' + node.path + node.text + ',$');
            }
            // check if this is already populated, to save an unnecessary remote api call
            if (!this._dataStore.some((x => regex.test(x.path)))) {
                console.warn('GETTING DATA FROM THE SERVER FOR THE ', node._id);
                tempCollection = this._dummyData.filter(x => regex.test(x.path));  // to be replaced by a remote api call               
                tempCollection.forEach(x => this._dataStore.push(x));
            } else {
                tempCollection = this._dataStore.filter(x => regex.test(x.path));  // to be replaced by a remote api call
            }
            observer.next(tempCollection);
            observer.complete();
        });
    }

    public search(term: string): Observable<shared.TreeNode[]> {
        let tempCollection: shared.TreeNode[] = [];
        let regex: RegExp;
        regex = new RegExp(term.toLowerCase());

        return Observable.create(observer => {
            if (this._searchedTerms.indexOf(term.toLowerCase()) > 0) {
                console.log('this term has been searched before');
                tempCollection = this._searchDataStore.filter(x => regex.test(x._id.toLowerCase()));
            } else {
                tempCollection = this._dummyData.filter(x => regex.test(x._id.toLowerCase()));
                tempCollection.forEach(x => this._searchDataStore.push(x));
                this._searchedTerms.push(term.toLowerCase());
            }

            this.loadLinks(tempCollection).subscribe(links => {
                observer.next(links);
                observer.complete();
            });
        });
    }

    private loadLinks(input: shared.TreeNode[]): Observable<shared.TreeNode[]> {

        return Observable.create(observer => {
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

                    if (input.some(x => x._id === path)) {
                        // console.log(path, ' is already in inputs');
                        continue;
                    }

                    let item = this._searchDataStore.find(x => x._id === path);
                    if (!item) {
                        // console.log('---------------getting ', path, ' from server');

                        item = this._dummyData.find(x => x._id === path);

                        if (item) {
                            // console.log('------------------- inserting ', item._id, '  into the local data store')
                            this._searchDataStore.push(item);
                        }
                    }
                    if (item) {
                        // console.log('------- ', item._id, ' is inserted into input list now')
                        input.push(item);
                    }
                }
            }
            observer.next(input);
            observer.complete();
        });
    }

    private loadRoots(): Observable<shared.TreeNode[]> {
        let tempCollection: shared.TreeNode[];

        return Observable.create(observer => {

            if (!this._dataStore.some((x => !x.path))) {  // check if this is already populated, to save an unnecessary remote api call
                console.warn('GETTING DATA FROM THE SERVER FOR THE ROOTS');
                tempCollection = this._dummyData.filter(x => !x.path);  // to be replaced by a remote api call                
                tempCollection.forEach(x => this._dataStore.push(x));
            } else {
                tempCollection = this._dataStore.filter(x => !x.path);
            }

            observer.next(tempCollection);
            observer.complete();
        });
    }

    private initialiseDataStore() {

        if (!this._appSettings.isFirmStructureLoadOnDemand) {
            this._dataStore = this._dummyData;
        }

        // reset every 3 minutes to dispose stale data
        setTimeout(function () {
            // this._dataStore.firmStructures = [];
            // console.warn('FIRM STRUCTURE IS CLEAR NOW')
        }, 1000 * 60 * this._appSettings.cacheExpiryInMinutes);
    }
}