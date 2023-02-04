import bcrypt from 'bcrypt'

import { HashComparator } from '@/data/contracts/hash/HashComparator'
import { Hasher } from '@/data/contracts/hash/Hasher'

export class BcryptAdapter implements Hasher, HashComparator.Comparator {
  constructor(private readonly salt: number = 12) {}

  async hash(value: string): Promise<string> {
    return bcrypt.hash(value, this.salt)
  }

  async compare({
    plainPayload,
    hashedPayload,
  }: HashComparator.Params): Promise<boolean> {
    return bcrypt.compare(plainPayload, hashedPayload)
  }
}
