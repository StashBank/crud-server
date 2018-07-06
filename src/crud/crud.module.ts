import { CoreModule } from './../core/core.module';

import { Module } from '@nestjs/common';
import { CrudController } from './crud.controller';
import { CrudService } from './crud.service';

@Module({
  imports: [CoreModule],
  controllers: [CrudController],
  providers: [CrudService],
})
export class CrudModule { }
