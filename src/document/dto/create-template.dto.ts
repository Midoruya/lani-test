import { Type } from 'class-transformer';
import {
  IsArray,
  IsEnum,
  IsNotEmpty,
  IsString,
  ValidateNested,
} from 'class-validator';
import { AttributesTypeEnum } from '../attributesType';

export class TemplateAttributesDto {
  @IsString()
  @IsNotEmpty()
  name: string;
  @IsString()
  @IsEnum(AttributesTypeEnum)
  @IsNotEmpty()
  type: AttributesTypeEnum;
}

export class CreateTemplateDto {
  @IsString()
  @IsNotEmpty()
  name: string;
  @IsNotEmpty()
  @IsArray()
  @Type(() => TemplateAttributesDto)
  @ValidateNested({ each: true })
  attributeFields: TemplateAttributesDto[];
}
