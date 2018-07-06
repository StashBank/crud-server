import { Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { of } from 'rxjs';
import { Guid } from 'guid-typescript';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class CrudService {
  private DB = {};
  private readonly dbFilePath = path.join(__dirname, '/database.json');

  constructor() {
    this.initDb();
  }

  private initDb() {
    this.DB = require('./database.json');
  }

  private syncDb() {
    const db = this.DB || {};
    fs.writeFile(this.dbFilePath, JSON.stringify(db), err => {
      if (err) {
        throw err;
      }
    });
  }

  getDomains(): Observable<string[]> {
    const domains = Object.keys(this.DB);
    return of(domains);
  }

  getDomainSchemas(domain: string): Observable<string[]>  {
    const domainData = this.DB[domain] || {};
    const schemas = Object.keys(domainData);
    return of(schemas);
  }

  getDomainSchemaObjects(domain: string, schema: string): Observable<any[]>  {
    const domainData = this.DB[domain] || {};
    const schemaData = domainData[schema] || [];
    const objects = schemaData;
    return of(objects);
  }

  getDomainSchemaObjectById(domain: string, schema: string, id: string): Observable<any>  {
    const domainData = this.DB[domain] || {};
    const schemaData: any[] = domainData[schema] || [];
    const object = schemaData.find(i => i.id === id);
    return of(object);
  }

  addDomainSchemaObject(domain: string, schema: string, data: any): Observable<any> {
    if (!this.DB[domain]) {
      this.DB[domain] = { [schema]: [] };
    }
    data.id = Guid.create().toString();
    this.DB[domain][schema].push(data);
    this.syncDb();
    return of(data);
  }

  setDomainSchemaObject(domain: string, schema: string, id: string, data: any): Observable<any> {
    if (!this.DB[domain]) {
      this.DB[domain] = { [schema]: [] };
    }
    const objects: any[] = this.DB[domain][schema];
    const object = objects.find(i => i.id === id);
    const index = objects.indexOf(object);
    const newData = Object.assign({}, data, { id });
    objects[index] = newData;
    this.syncDb();
    return of(newData);
  }

  changeDomainSchemaObject(domain: string, schema: string, id: string, data: any): Observable<any> {
    if (!this.DB[domain]) {
      this.DB[domain] = { [schema]: [] };
    }
    const objects: any[] = this.DB[domain][schema];
    const object = objects.find(i => i.id === id);
    const index = objects.indexOf(object);
    const newData = Object.assign({}, object, data, { id });
    objects[index] = newData;
    this.syncDb();
    return of(newData);
  }

  removeDomainSchemaObject(domain, schema, id): Observable<any> {
    if (!this.DB[domain]) {
      this.DB[domain] = { [schema]: [] };
    }
    const objects: any[] = this.DB[domain][schema];
    const object = objects.find(i => i.id === id);
    const index = objects.indexOf(object);
    objects.splice(index, 1);
    return of({});
  }
}