import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateDocumentDto } from './dto/create-document.dto';
import { DataSource, Repository } from 'typeorm';
import { DocumentEntity } from './entity/document.entity';
import { TemplateService } from './template/template.service';
import { AttributesTypeEnum } from './attributesType';
import { UpdateDocumentDto } from './dto/update-document.dto';

@Injectable()
export class DocumentService {
  constructor(
    private readonly dataSource: DataSource,
    private readonly templateService: TemplateService,
    @InjectRepository(DocumentEntity)
    private readonly documentEntity: Repository<DocumentEntity>,
  ) {}
  async checkTypes(
    templateAttribute: Array<object>,
    attributeFields: Array<object>,
  ) {
    if (templateAttribute.length !== attributeFields.length)
      throw new BadRequestException('Не соответствие с шаблоном');
    await Promise.all(
      templateAttribute.map((item) => {
        if (!('name' in item && 'type' in item))
          throw new BadRequestException('Неизвестный тип данных');
        const payloadAttr = attributeFields.find((el) => {
          if (!('name' in el && 'name' in item)) return false;
          return el.name === item.name;
        });
        if (!('value' in payloadAttr))
          throw new BadRequestException('Неизвестный тип данных');
        const type = item.type as string;
        if (
          AttributesTypeEnum[type] === AttributesTypeEnum.string &&
          typeof payloadAttr.value !== 'string'
        )
          throw new BadRequestException(
            `Поле ${item.name} не соответствует строке`,
          );
        if (
          AttributesTypeEnum[type] === AttributesTypeEnum.number &&
          (isNaN(+payloadAttr.value) || !+payloadAttr.value)
        )
          throw new BadRequestException(
            `Поле ${item.name} не соответствует числу`,
          );
        if (
          AttributesTypeEnum[type] === AttributesTypeEnum.date &&
          isNaN(Date.parse(payloadAttr.value as string))
        )
          throw new BadRequestException(
            `Поле ${item.name} не соответствует дате`,
          );
      }),
    );
  }
  async update(payload: UpdateDocumentDto) {
    const doc = await this.documentEntity.findOne({
      where: { id: payload.id },
    });
    const getTemplate = await this.templateService.getByID(payload.templateId);
    if (!getTemplate) throw new NotFoundException('Неизвестный шаблон');
    await this.checkTypes(
      getTemplate.templateAttribute,
      payload.attributeFields,
    );
    doc.name = payload.name;
    doc.attributeFields = payload.attributeFields;
    doc.template = getTemplate;
    return await this.documentEntity.save(doc);
  }
  async delete(id: number) {
    const del = await this.documentEntity.delete({ id: id });
    if (del.affected <= 0)
      throw new NotFoundException('Не найдена запись на удаление');
    return del.raw;
  }
  async getById(id: number) {
    return await this.documentEntity.findOne({
      where: { id: id },
      relations: {
        template: true,
      },
    });
  }
  async get() {
    return await this.documentEntity.find();
  }
  async create(payload: CreateDocumentDto) {
    const template = await this.templateService.getByID(payload.templateId);
    if (!template) throw new NotFoundException('Неизвестный шаблон');
    await this.checkTypes(template.templateAttribute, payload.attributeFields);
    const newDoc = await this.documentEntity.create({
      template: template,
      attributeFields: payload.attributeFields,
      name: payload.name,
    });
    return await this.documentEntity.save(newDoc);
  }
}
