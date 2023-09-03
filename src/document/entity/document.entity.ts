import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { TemplateEntity } from '../template/entity/template.entity';

@Entity()
export class DocumentEntity {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  name: string;
  @Column({ type: 'jsonb' })
  document: object;
  @ManyToOne(() => TemplateEntity, (template) => template.id)
  template: TemplateEntity;
}
