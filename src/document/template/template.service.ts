import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DataSource } from 'typeorm';
import { CreateTemplateDto } from '../dto/create-template.dto';
import { TemplateAttributeEntity } from './entity/template-attribute.entity';
import { TemplateEntity } from './entity/template.entity';
import { AttributesTypeEnum } from '../attributesType';

@Injectable()
export class TemplateService {
  constructor(
    private readonly dataSource: DataSource,
    @InjectRepository(TemplateEntity)
    private readonly templateEntity: Repository<TemplateEntity>,
    @InjectRepository(TemplateAttributeEntity)
    private readonly templateAttributeEntity: Repository<TemplateAttributeEntity>,
  ) {}
  async create(payload: CreateTemplateDto) {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.startTransaction();
    try {
      const attributes = await Promise.all(
        payload.attributeFields.map(async (item) => {
          if (!AttributesTypeEnum[item.type])
            throw new BadRequestException('неизвестный тип');
          const atr = await this.templateAttributeEntity.create({
            name: item.name,
            type: item.type,
          });
          return await queryRunner.manager.save(atr);
        }),
      );
      const template = await this.templateEntity.create({
        name: payload.name,
        templateAttribute: attributes,
      });
      const tmp = await queryRunner.manager.save(template);
      await queryRunner.commitTransaction();
      return tmp;
    } catch (e) {
      await queryRunner.rollbackTransaction();
      throw e;
    } finally {
      await queryRunner.release();
    }
  }
  async getByID(id: number) {
    return await this.templateEntity.findOne({
      where: { id: id },
      relations: {
        templateAttribute: true,
      },
    });
  }
  async get() {
    return await this.templateEntity.find();
  }
}
