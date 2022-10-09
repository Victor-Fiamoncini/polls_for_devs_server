import { LogErrorRepository } from 'src/data'

import { MongoHelper } from 'src/infra'

export class MongoDbLogErrorRepository implements LogErrorRepository {
  async logError (stack: string): Promise<void> {
    const errorsCollection = await MongoHelper.getCollection('errors')

    await errorsCollection.insertOne({ stack, date: new Date() })
  }
}
