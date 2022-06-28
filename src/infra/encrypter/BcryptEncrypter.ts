import bcrypt from 'bcrypt'

import { Encrypter } from 'src/data'

export class BcryptEncrypter implements Encrypter {
  constructor (private readonly salt: number = 12) { }

  async encrypt (value: string): Promise<string> {
    return bcrypt.hash(value, this.salt)
  }
}
