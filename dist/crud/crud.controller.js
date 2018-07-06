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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const crud_service_1 = require("./crud.service");
const rxjs_1 = require("rxjs");
let CrudController = class CrudController {
    constructor(service) {
        this.service = service;
    }
    getDomains() {
        return this.service.getDomains();
    }
    getDomainSchemas(domain) {
        return this.service.getDomainSchemas(domain);
    }
    getDomainSchemaObjects(domain, schema) {
        return this.service.getDomainSchemaObjects(domain, schema);
    }
    getDomainSchemaObjectById(domain, schema, id) {
        return this.service.getDomainSchemaObjectById(domain, schema, id);
    }
    addDomainSchemaObject(domain, schema, data) {
        return this.service.addDomainSchemaObject(domain, schema, data);
    }
    setDomainSchemaObject(domain, schema, id, data) {
        return this.service.setDomainSchemaObject(domain, schema, id, data);
    }
};
__decorate([
    common_1.Get(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", rxjs_1.Observable)
], CrudController.prototype, "getDomains", null);
__decorate([
    common_1.Get(':domain'),
    __param(0, common_1.Param('domain')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", rxjs_1.Observable)
], CrudController.prototype, "getDomainSchemas", null);
__decorate([
    common_1.Get(':domain/:schema'),
    __param(0, common_1.Param('domain')), __param(1, common_1.Param('schema')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", rxjs_1.Observable)
], CrudController.prototype, "getDomainSchemaObjects", null);
__decorate([
    common_1.Get(':domain/:schema/:id'),
    __param(0, common_1.Param('domain')), __param(1, common_1.Param('schema')), __param(2, common_1.Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object]),
    __metadata("design:returntype", rxjs_1.Observable)
], CrudController.prototype, "getDomainSchemaObjectById", null);
__decorate([
    common_1.Post(':domain/:schema'),
    __param(0, common_1.Param('domain')), __param(1, common_1.Param('schema')), __param(2, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object]),
    __metadata("design:returntype", rxjs_1.Observable)
], CrudController.prototype, "addDomainSchemaObject", null);
__decorate([
    common_1.Put(':domain/:schema/:id'),
    __param(0, common_1.Param('domain')), __param(1, common_1.Param('schema')), __param(2, common_1.Param('id')), __param(3, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object, Object]),
    __metadata("design:returntype", rxjs_1.Observable)
], CrudController.prototype, "setDomainSchemaObject", null);
CrudController = __decorate([
    common_1.Controller('crud'),
    __metadata("design:paramtypes", [crud_service_1.CrudService])
], CrudController);
exports.CrudController = CrudController;
//# sourceMappingURL=crud.controller.js.map