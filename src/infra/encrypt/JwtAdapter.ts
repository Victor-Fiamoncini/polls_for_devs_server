import { sign } from 'jsonwebtoken'

import { Encrypter } from '@/data/contracts/encrypt/Encrypter'

export class JwtAdapter implements Encrypter {
  constructor(private readonly secret: string) {}

  async encrypt(payload: string): Promise<string> {
    return sign({ id: payload }, this.secret)
  }
}
