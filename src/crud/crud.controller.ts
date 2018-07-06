
import {
  Controller,
  Get,
  Post,
  Put,
  Patch,
  Delete,
  Param,
  Body,
} from '@nestjs/common';
import { CrudService } from './crud.service';
import { Observable } from 'rxjs';

@Controller('crud')
export class CrudController {

  constructor(private service: CrudService) {}

  @Get()
  getDomains(): Observable<string[]> {
    return this.service.getDomains();
  }

  @Get(':domain')
  getDomainSchemas(
    @Param('domain') domain): Observable<string[]> {
    return this.service.getDomainSchemas(domain);
  }

  @Get(':domain/:schema')
  getDomainSchemaObjects(@Param('domain') domain, @Param('schema') schema): Observable<any[]> {
    return this.service.getDomainSchemaObjects(domain, schema);
  }

  @Get(':domain/:schema/:id')
  getDomainSchemaObjectById(@Param('domain') domain, @Param('schema') schema, @Param('id') id): Observable<any> {
    return this.service.getDomainSchemaObjectById(domain, schema, id);
  }

  @Post(':domain/:schema')
  addDomainSchemaObject(@Param('domain') domain, @Param('schema') schema, @Body() data): Observable<any> {
    return this.service.addDomainSchemaObject(domain, schema, data);
  }

  @Put(':domain/:schema/:id')
  setDomainSchemaObject(@Param('domain') domain, @Param('schema') schema, @Param('id') id, @Body() data): Observable<any> {
    return this.service.setDomainSchemaObject(domain, schema, id, data);
  }

  @Patch(':domain/:schema/:id')
  changeDomainSchemaObject(@Param('domain') domain, @Param('schema') schema, @Param('id') id, @Body() data): Observable<any> {
    return this.service.changeDomainSchemaObject(domain, schema, id, data);
  }

  @Delete(':domain/:schema/:id')
  removeDomainSchemaObject(@Param('domain') domain, @Param('schema') schema, @Param('id') id): Observable<any> {
    return this.service.removeDomainSchemaObject(domain, schema, id);
  }
}