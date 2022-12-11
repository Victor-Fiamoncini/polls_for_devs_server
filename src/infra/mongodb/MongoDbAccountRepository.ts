import { ObjectId } from 'mongodb'

import { AccountModel, AddAccountRepository, LoadAccountByEmailRepository, UpdateAccessTokenRepository } from 'src/data'

import { MongoHelper } from 'src/infra'

export class MongoDbAccountRepository implements AddAccountRepository.Repository, LoadAccountByEmailRepository.Repository, UpdateAccessTokenRepository.Repository {
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

  async loadByEmail ({ email }: LoadAccountByEmailRepository.Params): Promise<AccountModel> {
    const accountColletion = await MongoHelper.getCollection('accounts')

    const account = await accountColletion.findOne({ email }, {
      projection: { _id: 1, name: 1, email: 1, password: 1 }
    })

    if (!account) return null

    return {
      id: account._id.toString(),
      name: account.name,
      email: account.email,
      password: account.password
    }
  }

  async updateAccessToken ({ id, token }: UpdateAccessTokenRepository.Params): Promise<void> {
    const accountColletion = await MongoHelper.getCollection('accounts')

    await accountColletion.updateOne({ _id: new ObjectId(id) }, { $set: { accessToken: token } })
  }
}
