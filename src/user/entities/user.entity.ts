import { BaseEntity } from '../../common/entities/base.entity';
import { Column, Entity } from 'typeorm';
import { Exclude } from 'class-transformer';

@Entity('user')
export class UserEntity extends BaseEntity {
  @Column({
    length: 20,
    comment: '用户名',
  })
  username: string;

  @Column({
    length: 20,
    comment: '昵称',
  })
  nickname: string;

  @Exclude()
  @Column({ comment: '密码' })
  password: string;

  @Column({ comment: '邮箱' })
  email: string;
}
