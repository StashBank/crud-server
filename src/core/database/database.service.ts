import { Injectable } from '@nestjs/common';
import * as firebase from 'firebase';

@Injectable()
export class DatabaseService {
  private _db: firebase.database.Database;
  private _app: firebase.app.App;
  private _rootRef: firebase.database.Reference;
  private config = {
    apiKey: 'AIzaSyBABMklJzkCDV1jDOcWP3wpdmHBcvIJ4Sc',
    authDomain: 'crud-server.firebaseapp.com',
    databaseURL: 'https://crud-server.firebaseio.com',
    projectId: 'crud-server',
    storageBucket: '',
    messagingSenderId: '401756523227',
  };

  constructor() {
    this._app = firebase.initializeApp(this.config);
    this._db = firebase.database();
    this._rootRef = this._db.ref();
  }

  public get db(): firebase.database.Database {
    return this._db;
  }

  public get rootRef(): firebase.database.Reference {
    return this._rootRef;
  }
}