import bcrypt from 'bcrypt'

import { Hasher } from 'src/data'

export class BcryptHasher implements Hasher {
  constructor (private readonly salt: number = 12) { }

  async hash (value: string): Promise<string> {
    return bcrypt.hash(value, this.salt)
  }
}
