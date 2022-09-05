import { BaseEntity } from '../../common/entities/base.entity';
import { Column, Entity, Index, ManyToOne } from 'typeorm';
import { UserEntity } from '../../user/entities/user.entity';

@Entity('article')
export class ArticleEntity extends BaseEntity {
  @Column({
    length: 100,
    comment: '标题',
  })
  title: string;

  @Column({
    comment: '文章内容',
  })
  content: string;

  @ManyToOne(() => UserEntity, (user) => user.id)
  author: UserEntity;
}
