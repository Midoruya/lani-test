import { Controller } from '@nestjs/common';
import { TemplateService } from './template.service';
import { Post, Get, Body, Param } from '@nestjs/common/decorators';
import { CreateTemplateDto } from '../dto/create-template.dto';

@Controller('template')
export class TemplateController {
  constructor(private readonly templateService: TemplateService) {}

  @Post('')
  async create(@Body() body: CreateTemplateDto): Promise<object> {
    return await this.templateService.create(body);
  }

  @Get('')
  async get(): Promise<object> {
    return await this.templateService.get();
  }

  @Get(':id')
  async getById(@Param('id') id: number): Promise<object> {
    return await this.templateService.getByID(id);
  }
}
