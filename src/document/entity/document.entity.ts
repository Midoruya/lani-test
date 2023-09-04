import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { TemplateEntity } from '../template/entity/template.entity';

@Entity()
export class DocumentEntity {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  name: string;
  @Column({ type: 'jsonb' })
  attributeFields: object;
  @ManyToOne(() => TemplateEntity, (template) => template.id)
  template: TemplateEntity;
}
