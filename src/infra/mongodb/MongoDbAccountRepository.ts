import { AccountModel, AddAccountRepository } from 'src/data'

import { MongoHelper } from './MongoHelper'

export class MongoDbAccountRepository implements AddAccountRepository.Repository {
  async add (account: AddAccountRepository.Params): Promise<AccountModel> {
    const accountColletion = MongoHelper.getCollection('accounts')

    const result = await accountColletion.insertOne(account)
    const createdAccount = await accountColletion.findOne({ _id: result.insertedId }, {
      projection: { _id: 1, name: 1, email: 1, password: 1 }
    })

    const { _id, ...accountWithoutMongoId } = createdAccount

    return { ...accountWithoutMongoId, id: _id.toString() } as AccountModel
  }
}
