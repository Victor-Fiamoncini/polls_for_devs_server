import { sign } from 'jsonwebtoken'

import { Encrypter } from 'src/data'

export class JwtAdapter implements Encrypter {
  constructor (private readonly secret: string) {}

  async encrypt (payload: string): Promise<string> {
    return sign({ id: payload }, this.secret)
  }
}
