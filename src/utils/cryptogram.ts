import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

@Injectable()
export class BcryptService {
  private static readonly SALT_ROUNDS: number = 10;
  /**
   * 对比检查密码
   * @param rawStr
   * @param hashedStr
   */
  static compareSync(rawStr: string, hashedStr: string) {
    return bcrypt.compareSync(rawStr, hashedStr);
  }
  /**
   * 生成 hash
   * @param rawStr
   * @param salt
   */
  static hashSync(rawStr: string, salt?: string | number): string {
    return bcrypt.hashSync(rawStr, salt || BcryptService.SALT_ROUNDS);
  }
  /**
   * 生成盐
   */
  static genSaltSync() {
    return bcrypt.genSaltSync(BcryptService.SALT_ROUNDS);
  }
}
