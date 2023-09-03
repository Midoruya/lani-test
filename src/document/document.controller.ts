import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { DocumentService } from './document.service';
import { CreateDocumentDto } from './dto/create-document.dto';
import { UpdateDocumentDto } from './dto/update-document.dto';

@Controller('document')
export class DocumentController {
  constructor(private readonly documentService: DocumentService) {}
  @Get('')
  async get() {
    return await this.documentService.get();
  }
  @Get(':id')
  async getById(@Param('id') id: number) {
    return await this.documentService.getById(id);
  }
  @Post('')
  async create(@Body() body: CreateDocumentDto) {
    return this.documentService.create(body);
  }
  @Delete(':id')
  async delete(@Param('id') id: number) {
    return this.documentService.delete(id);
  }
  @Put()
  async update(@Body() body: UpdateDocumentDto) {
    return await this.documentService.update(body);
  }
}
