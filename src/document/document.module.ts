import { Module } from '@nestjs/common';
import { TemplateModule } from './template/template.module';
import { DocumentService } from './document.service';
import { DocumentController } from './document.controller';
import { DocumentEntity } from './entity/document.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TemplateModule, TypeOrmModule.forFeature([DocumentEntity])],
  providers: [DocumentService],
  controllers: [DocumentController],
})
export class DocumentModule {}
