import { AccountModel, AddAccountRepository } from 'src/data'

import { MongoHelper } from 'src/infra'

export class MongoDbAccountRepository implements AddAccountRepository.Repository {
  async add (account: AddAccountRepository.Params): Promise<AccountModel> {
    const accountColletion = await MongoHelper.getCollection('accounts')

    const result = await accountColletion.insertOne(account)
    const createdAccount = await accountColletion.findOne({ _id: result.insertedId }, {
      projection: { _id: 1, name: 1, email: 1, password: 1 }
    })

    return {
      id: createdAccount._id.toString(),
      name: createdAccount.name,
      email: createdAccount.email,
      password: createdAccount.password
    }
  }
}
