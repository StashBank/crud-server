import { Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { Subject } from 'rxjs';
import { of, from, pipe } from 'rxjs';
import { map, switchMap  } from 'rxjs/operators';
import { Guid } from 'guid-typescript';
import { DatabaseService } from 'core/database/database.service';
import * as firebase from 'firebase';

@Injectable()
export class CrudService {
  private DB: firebase.database.Database;

  constructor(private databaseService: DatabaseService) {
    this.initDb();
  }

  private initDb() {
    this.DB = this.databaseService.db;
  }

  getDomains(): Observable<string[]> {
    const entityRef = this.databaseService.rootRef;
    const resp = entityRef.once('value');
    return from(resp).pipe(
      map((snapshot: firebase.database.DataSnapshot) => snapshot.val()),
      map(val => Object.keys(val || {})),
    );
  }

  getDomainSchemas(domain: string): Observable<string[]>  {
    const entityRef = this.getEntityRef(domain);
    const resp = entityRef.once('value');
    return from(resp).pipe(
      map((snapshot: firebase.database.DataSnapshot) => snapshot.val()),
      map(val => Object.keys(val || {})),
    );
  }

  getDomainSchemaObjects(domain: string, schema: string): Observable<any[]>  {
    const entityRef = this.getEntityRef(domain, schema);
    const resp = entityRef.once('value');
    return from(resp).pipe(
      map((snapshot: firebase.database.DataSnapshot) => snapshot.val()),
      map(val => Object.keys(val || {}).map(id => Object.assign({}, val[id], {id}))),
    );
  }

  getDomainSchemaObjectById(domain: string, schema: string, id: string): Observable<any>  {
    const entityRef = this.getEntityRef(domain, schema, id);
    const resp = entityRef.once('value');
    return from(resp).pipe(
      map((snapshot: firebase.database.DataSnapshot) => snapshot.val()),
      map(v => v ? Object.assign(v, { id }) : null),
    );
  }

  addDomainSchemaObject(domain: string, schema: string, data: any): Observable<any> {
    const id = Guid.create().toString();
    return this.setDomainSchemaObject(domain, schema, id, data);
  }

  setDomainSchemaObject(domain: string, schema: string, id: string, data: any): Observable<any> {
    const entityRef = this.getEntityRef(domain, schema, id);
    const resp = entityRef.set(data)
      .then(() => entityRef.once('value'));
    return from(resp).pipe(
      map((snapshot: firebase.database.DataSnapshot) => snapshot.val()),
      map(v => Object.assign(v, { id })),
    );
  }

  changeDomainSchemaObject(domain: string, schema: string, id: string, data: any): Observable<any> {
    const entityRef = this.getEntityRef(domain, schema, id);
    const resp = entityRef.once('value');
    return from(resp).pipe(
      map((snapshot: firebase.database.DataSnapshot) => snapshot.val()),
      map(v => Object.assign(v || {}, data, { id })),
      switchMap(v => entityRef.set(v).then(() => entityRef.once('value'))),
      map((snapshot: firebase.database.DataSnapshot) => snapshot.val()),
    );
  }

  removeDomainSchemaObject(domain, schema, id): Observable<any> {
    const entityRef = this.getEntityRef(domain, schema, id);
    return from(entityRef.remove()).pipe(map(() => {}));
  }

  private getEntityRef(...parts: string[]): firebase.database.Reference {
    const path = parts.join('/');
    const ref = this.DB.ref(path);
    return ref;
  }
}