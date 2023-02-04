import { LogErrorRepository } from '@/data/contracts/repositories/LogErrorRepository'

import { MongoHelper } from '@/infra/mongodb/MongoHelper'

export class MongoDbLogErrorRepository implements LogErrorRepository {
  async logError(stack: string): Promise<void> {
    const errorsCollection = await MongoHelper.getCollection('errors')

    await errorsCollection.insertOne({ stack, date: new Date() })
  }
}
