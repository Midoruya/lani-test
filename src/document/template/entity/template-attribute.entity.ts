import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { TemplateEntity } from './template.entity';

@Entity()
export class TemplateAttributeEntity {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  name: string;
  @Column()
  type: string;
  @ManyToOne(() => TemplateEntity, (template) => template.id)
  template: TemplateEntity;
}
