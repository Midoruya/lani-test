import { Type } from 'class-transformer';
import {
  IsNotEmpty,
  IsString,
  IsNumber,
  IsArray,
  ValidateNested,
} from 'class-validator';

export class AttributesFieldDto {
  @IsString()
  @IsNotEmpty()
  name: string;
  @IsNotEmpty()
  @IsString()
  value: string;
}

export class CreateDocumentDto {
  @IsString()
  @IsNotEmpty()
  name: string;
  @IsNumber()
  @IsNotEmpty()
  templateId: number;
  @IsNotEmpty()
  @IsArray()
  @Type(() => AttributesFieldDto)
  @ValidateNested({ each: true })
  attributeFields: AttributesFieldDto[];
}
