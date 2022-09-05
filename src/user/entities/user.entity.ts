import { BaseEntity } from '../../common/entities/base.entity';
import { BeforeInsert, Column, Entity, Index, OneToMany } from 'typeorm';
import { Exclude } from 'class-transformer';
import { BcryptService } from '../../utils/cryptogram';
import { ArticleEntity } from '../../article/entities/article.entity';

@Entity('user')
export class UserEntity extends BaseEntity {
  @Column({
    length: 20,
    comment: '用户名',
    default: '123',
  })
  username: string;

  @Column({
    length: 20,
    comment: '昵称',
    default: '1243',
  })
  nickname: string;

  @Exclude()
  @Column({ comment: '密码' })
  password: string;

  @Index({
    unique: true,
  })
  @Column({ comment: '邮箱' })
  email: string;

  @OneToMany(() => ArticleEntity, (article) => article.author, {
    cascade: true,
  })
  articles: ArticleEntity[];

  @BeforeInsert()
  private async hashPassword() {
    this.password = BcryptService.hashSync(this.password);
  }
}
