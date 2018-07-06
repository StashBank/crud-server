"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const rxjs_1 = require("rxjs");
const guid_typescript_1 = require("guid-typescript");
const fs = require("fs");
const path = require("path");
let CrudService = class CrudService {
    constructor() {
        this.DB = {};
        this.dbFilePath = path.join(__dirname, '/crud/storage/db.json');
        this.initDb();
    }
    initDb() {
        if (fs.existsSync(this.dbFilePath)) {
            fs.readFile(this.dbFilePath, (err, data) => {
                if (data) {
                    this.DB = JSON.parse(data.toString());
                }
            });
        }
    }
    syncDb() {
        if (this.DB) {
            fs.writeFile(this.dbFilePath, JSON.stringify(this.DB), err => { });
        }
    }
    getDomains() {
        const domains = Object.keys(this.DB);
        return rxjs_1.of(domains);
    }
    getDomainSchemas(domain) {
        const domainData = this.DB[domain] || {};
        const schemas = Object.keys(domainData);
        return rxjs_1.of(schemas);
    }
    getDomainSchemaObjects(domain, schema) {
        const domainData = this.DB[domain] || {};
        const schemaData = domainData[schema] || [];
        const objects = schemaData;
        return rxjs_1.of(objects);
    }
    getDomainSchemaObjectById(domain, schema, id) {
        const domainData = this.DB[domain] || {};
        const schemaData = domainData[schema] || [];
        const object = schemaData.find(i => i.id === id);
        return rxjs_1.of(object);
    }
    addDomainSchemaObject(domain, schema, data) {
        if (!this.DB[domain]) {
            this.DB[domain] = { [schema]: [] };
        }
        data.id = guid_typescript_1.Guid.create().toString();
        this.DB[domain][schema].push(data);
        this.syncDb();
        return rxjs_1.of(data);
    }
    setDomainSchemaObject(domain, schema, id, data) {
        if (!this.DB[domain]) {
            this.DB[domain] = { [schema]: [] };
        }
        const objects = this.DB[domain][schema];
        const object = objects.find(i => i.id === id);
        const index = objects.indexOf(object);
        objects[index] = Object.assign({}, object, data, { id });
        this.syncDb();
        return rxjs_1.of(data);
    }
};
CrudService = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [])
], CrudService);
exports.CrudService = CrudService;
//# sourceMappingURL=crud.service.js.map