import { Module } from '@nestjs/common';
import { TemplateService } from './template.service';
import { TemplateController } from './template.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TemplateEntity } from './entity/template.entity';
import { TemplateAttributeEntity } from './entity/template-attribute.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([TemplateEntity, TemplateAttributeEntity]),
  ],
  exports: [TemplateService],
  controllers: [TemplateController],
  providers: [TemplateService],
})
export class TemplateModule {}
