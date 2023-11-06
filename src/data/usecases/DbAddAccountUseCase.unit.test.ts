import { Hasher } from '@/data/contracts/hash/Hasher'
import { AddAccountRepository } from '@/data/contracts/repositories/AddAccountRepository'
import { LoadAccountByEmailRepository } from '@/data/contracts/repositories/LoadAccountByEmailRepository'
import { AccountModel } from '@/data/models/AccountModel'
import { DbAddAccountUseCase } from '@/data/usecases/DbAddAccountUseCase'

const makeAddAccountRepositoryStub = () => {
  class AddAccountRepositoryStub implements AddAccountRepository.Repository {
    async add(account: AddAccountRepository.Params): Promise<AccountModel> {
      const fakeAccount = {
        id: 'valid_id',
        name: 'valid_name',
        email: 'valid_email',
        password: 'hashed_password',
      }

      return new Promise(resolve => resolve(fakeAccount))
    }
  }

  return new AddAccountRepositoryStub()
}

const makeHasherStub = () => {
  class HasherStub implements Hasher {
    async hash(value: string): Promise<string> {
      return new Promise(resolve => resolve('hashed_password'))
    }
  }

  return new HasherStub()
}

const makeLoadAccountByEmailRepositoryStub = () => {
  class LoadAccountByEmailRepositoryStub
    implements LoadAccountByEmailRepository.Repository
  {
    async loadByEmail(
      params: LoadAccountByEmailRepository.Params
    ): Promise<AccountModel> {
      return null
    }
  }

  return new LoadAccountByEmailRepositoryStub()
}

const makeSut = () => {
  const addAccountRepositoryStub = makeAddAccountRepositoryStub()
  const hasherStub = makeHasherStub()
  const loadAccountByEmailRepositoryStub =
    makeLoadAccountByEmailRepositoryStub()
  const sut = new DbAddAccountUseCase(
    hasherStub,
    addAccountRepositoryStub,
    loadAccountByEmailRepositoryStub
  )

  return {
    addAccountRepositoryStub,
    hasherStub,
    loadAccountByEmailRepositoryStub,
    sut,
  }
}

describe('DbAddAccountUseCase', () => {
  it('should call Hasher with correct password', async () => {
    const { hasherStub, sut } = makeSut()

    const hashSpy = jest.spyOn(hasherStub, 'hash')

    const accountData = {
      name: 'valid_name',
      email: 'valid_email',
      password: 'valid_password',
    }

    await sut.add(accountData)

    expect(hashSpy).toHaveBeenCalledWith('valid_password')
  })

  it('should throw if Hasher throws', async () => {
    const { hasherStub, sut } = makeSut()

    jest
      .spyOn(hasherStub, 'hash')
      .mockReturnValueOnce(
        new Promise((resolve, reject) => reject(new Error()))
      )

    const accountData = {
      name: 'valid_name',
      email: 'valid_email',
      password: 'valid_password',
    }

    const promise = sut.add(accountData)

    await expect(promise).rejects.toThrow()
  })

  it('should call AddAccountRepository with correct values', async () => {
    const { addAccountRepositoryStub, sut } = makeSut()

    const addSpy = jest.spyOn(addAccountRepositoryStub, 'add')

    const accountData = {
      name: 'valid_name',
      email: 'valid_email',
      password: 'valid_password',
    }

    await sut.add(accountData)

    expect(addSpy).toHaveBeenCalledWith({
      name: 'valid_name',
      email: 'valid_email',
      password: 'hashed_password',
    })
  })

  it('should throw if AddAccountRepository throws', async () => {
    const { addAccountRepositoryStub, sut } = makeSut()

    jest
      .spyOn(addAccountRepositoryStub, 'add')
      .mockReturnValueOnce(
        new Promise((resolve, reject) => reject(new Error()))
      )

    const accountData = {
      name: 'valid_name',
      email: 'valid_email',
      password: 'valid_password',
    }

    const promise = sut.add(accountData)

    await expect(promise).rejects.toThrow()
  })

  it('should return an account on success', async () => {
    const { sut } = makeSut()

    const accountData = {
      name: 'valid_name',
      email: 'valid_email',
      password: 'valid_password',
    }

    const account = await sut.add(accountData)

    expect(account).toEqual({
      id: 'valid_id',
      name: 'valid_name',
      email: 'valid_email',
      password: 'hashed_password',
    })
  })

  it('should call LoadAccountByEmailRepository with correct email', async () => {
    const { loadAccountByEmailRepositoryStub, sut } = makeSut()

    const loadSpy = jest.spyOn(loadAccountByEmailRepositoryStub, 'loadByEmail')

    const accountData = {
      name: 'valid_name',
      email: 'valid_email',
      password: 'valid_password',
    }

    await sut.add(accountData)

    expect(loadSpy).toHaveBeenCalledWith({ email: 'valid_email' })
  })

  it('should return null if LoadAccountByEmailRepository returns an account', async () => {
    const { loadAccountByEmailRepositoryStub, sut } = makeSut()

    const existingAccountData = {
      id: 'any_id',
      name: 'existing_name',
      email: 'existing_email',
      password: 'existing_password',
    }

    jest
      .spyOn(loadAccountByEmailRepositoryStub, 'loadByEmail')
      .mockReturnValueOnce(
        new Promise((resolve, reject) => resolve(existingAccountData))
      )

    const accountData = {
      name: 'existing_name',
      email: 'existing_email',
      password: 'existing_password',
    }

    const account = await sut.add(accountData)

    expect(account).toBeNull()
  })
})
