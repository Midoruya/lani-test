import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { TemplateAttributeEntity } from './template-attribute.entity';

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
  TemplateAttribute: TemplateAttributeEntity[];
}
