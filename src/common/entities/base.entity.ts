import {
  CreateDateColumn,
  DeleteDateColumn,
  Index,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

export abstract class BaseEntity {
  @Index()
  @PrimaryGeneratedColumn({ comment: 'id' })
  id: number;

  @CreateDateColumn({
    comment: '创建时间',
    type: 'timestamp',
    name: 'create_time',
  })
  createdDate: Date;

  @UpdateDateColumn({
    comment: '更新时间',
    type: 'timestamp',
    name: 'update_time',
  })
  updatedDate: Date;

  @DeleteDateColumn({
    name: 'deleted_time',
    type: 'datetime',
    comment: '删除时间',
  })
  deletedTime: string;
}
