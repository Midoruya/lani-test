import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { TemplateAttributeEntity } from './template-attribute.entity';
import { DocumentEntity } from '../../entity/document.entity';

@Entity()
export class TemplateEntity {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  name: string;
  @OneToMany(
    () => TemplateAttributeEntity,
    (templateAttribute) => templateAttribute.template,
    { cascade: ['insert', 'update'] },
  )
  templateAttribute: TemplateAttributeEntity[];
  @OneToMany(
    () => DocumentEntity,
    (templateAttribute) => templateAttribute.template,
    { cascade: ['insert', 'update'] },
  )
  document: DocumentEntity[];
}
