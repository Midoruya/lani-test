import { CreateDocumentDto } from './create-document.dto';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class UpdateDocumentDto extends CreateDocumentDto {
  @IsNumber()
  @IsNotEmpty()
  id: number;
}
