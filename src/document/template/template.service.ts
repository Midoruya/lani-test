import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Transaction } from 'typeorm';
import { CreateTemplateDto } from '../dto/create-template.dto';
import { TemplateAttributeEntity } from './entity/template-attribute.entity';
import { TemplateEntity } from './entity/template.entity';
import { type } from 'os';
import { AttributesTypeEnum } from '../attributesType';

@Injectable()
export class TemplateService {
  constructor(
    @InjectRepository(TemplateEntity)
    private readonly templateEntity: Repository<TemplateEntity>,
    @InjectRepository(TemplateAttributeEntity)
    private readonly templateAttributeEntity: Repository<TemplateAttributeEntity>,
  ) {}
  async create(payload: CreateTemplateDto) {
    console.log(AttributesTypeEnum[payload.attributeFields[0].type]);
    payload.attributeFields.forEach((item) => {
      if (!AttributesTypeEnum[item.type])
        throw new BadRequestException('неизвестный тип');
    });
    const attributes = await Promise.all(
      payload.attributeFields.map(async (item) => {
        const atr = await this.templateAttributeEntity.create({
          name: item.name,
          type: item.type,
        });
        return await this.templateAttributeEntity.save(atr);
      }),
    );
    const template = await this.templateEntity.create({
      name: payload.name,
      TemplateAttribute: attributes,
    });
    const tmp = await this.templateEntity.save(template);
    return tmp;
  }
  async getByID(id: number) {
    return await this.templateEntity.findOne({
      where: { id: id },
      relations: {
        TemplateAttribute: true,
      },
    });
  }
  async get() {
    return await this.templateEntity.find();
  }
}
