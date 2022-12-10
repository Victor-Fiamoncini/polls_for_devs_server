import { AccountModel, DbAuthenticationUseCase, LoadAccountByEmailRepository, HashComparator, Encrypter, UpdateAccessTokenRepository } from 'src/data'

const makeLoadAccountByEmailRepositoryStub = () => {
  class LoadAccountByEmailRepositoryStub implements LoadAccountByEmailRepository.Repository {
    async loadByEmail (params: LoadAccountByEmailRepository.Params): Promise<AccountModel> {
      const fakeAccount = {
        email: 'any_email@mail.com',
        id: 'any_id',
        name: 'any_name',
        password: 'hashed_password'
      }

      return fakeAccount
    }
  }

  return new LoadAccountByEmailRepositoryStub()
}

const makeHashComparatorStub = () => {
  class HashComparatorStub implements HashComparator.Comparator {
    async compare (params: HashComparator.Params): Promise<boolean> {
      return true
    }
  }

  return new HashComparatorStub()
}

const makeEncrypterStub = () => {
  class EncrypterStub implements Encrypter {
    async encrypt (payload: string): Promise<string> {
      return 'any_token'
    }
  }

  return new EncrypterStub()
}

const makeUpdateAccessTokenRepositoryStub = () => {
  class UpdateAccessTokenRepositoryStub implements UpdateAccessTokenRepository.Repository {
    async updateAccessToken (params: UpdateAccessTokenRepository.Params): Promise<void> {}
  }

  return new UpdateAccessTokenRepositoryStub()
}

const makeSut = () => {
  const loadAccountByEmailRepositoryStub = makeLoadAccountByEmailRepositoryStub()
  const hashComparatorStub = makeHashComparatorStub()
  const encrypterStub = makeEncrypterStub()
  const updateAccessTokenRepositoryStub = makeUpdateAccessTokenRepositoryStub()
  const sut = new DbAuthenticationUseCase(
    loadAccountByEmailRepositoryStub,
    hashComparatorStub,
    encrypterStub,
    updateAccessTokenRepositoryStub
  )

  return {
    loadAccountByEmailRepositoryStub,
    hashComparatorStub,
    encrypterStub,
    updateAccessTokenRepositoryStub,
    sut
  }
}

describe('DbAuthenticationUseCase', () => {
  it('should call LoadAccountByEmailRepository with correct email', async () => {
    const { loadAccountByEmailRepositoryStub, sut } = makeSut()

    const loadSpy = jest.spyOn(loadAccountByEmailRepositoryStub, 'loadByEmail')

    await sut.auth({ email: 'any_email@mail.com', password: 'any_password' })

    expect(loadSpy).toHaveBeenCalledWith({ email: 'any_email@mail.com' })
  })

  it('should throw if LoadAccountByEmailRepository throws', async () => {
    const { loadAccountByEmailRepositoryStub, sut } = makeSut()

    jest.spyOn(loadAccountByEmailRepositoryStub, 'loadByEmail').mockReturnValueOnce(new Promise((resolve, reject) => reject(new Error())))

    const authPromise = sut.auth({ email: 'any_email@mail.com', password: 'any_password' })

    await expect(authPromise).rejects.toThrow()
  })

  it('should return null if LoadAccountByEmailRepository returns null', async () => {
    const { loadAccountByEmailRepositoryStub, sut } = makeSut()

    jest.spyOn(loadAccountByEmailRepositoryStub, 'loadByEmail').mockReturnValueOnce(null)

    const accessToken = await sut.auth({ email: 'any_email@mail.com', password: 'any_password' })

    expect(accessToken).toBeNull()
  })

  it('should call HashComparator with correct email', async () => {
    const { hashComparatorStub, sut } = makeSut()

    const compareSpy = jest.spyOn(hashComparatorStub, 'compare')

    await sut.auth({ email: 'any_email@mail.com', password: 'any_password' })

    expect(compareSpy).toHaveBeenCalledWith({ plainPayload: 'any_password', hashedPayload: 'hashed_password' })
  })

  it('should throw if HashComparator throws', async () => {
    const { hashComparatorStub, sut } = makeSut()

    jest.spyOn(hashComparatorStub, 'compare').mockReturnValueOnce(new Promise((resolve, reject) => reject(new Error())))

    const authPromise = sut.auth({ email: 'any_email@mail.com', password: 'any_password' })

    await expect(authPromise).rejects.toThrow()
  })

  it('should return null if HashComparator returns false', async () => {
    const { hashComparatorStub, sut } = makeSut()

    jest.spyOn(hashComparatorStub, 'compare').mockResolvedValueOnce(false)

    const accessToken = await sut.auth({ email: 'any_email@mail.com', password: 'any_password' })

    expect(accessToken).toBeNull()
  })

  it('should call Encrypter with correct id', async () => {
    const { encrypterStub, sut } = makeSut()

    const encryptSpy = jest.spyOn(encrypterStub, 'encrypt')

    await sut.auth({ email: 'any_email@mail.com', password: 'any_password' })

    expect(encryptSpy).toHaveBeenCalledWith('any_id')
  })

  it('should throw if Encrypter throws', async () => {
    const { encrypterStub, sut } = makeSut()

    jest.spyOn(encrypterStub, 'encrypt').mockReturnValueOnce(new Promise((resolve, reject) => reject(new Error())))

    const authPromise = sut.auth({ email: 'any_email@mail.com', password: 'any_password' })

    await expect(authPromise).rejects.toThrow()
  })

  it('should return access token if Encrypter succeeds', async () => {
    const { sut } = makeSut()

    const accessToken = await sut.auth({ email: 'any_email@mail.com', password: 'any_password' })

    expect(accessToken).toBe('any_token')
  })

  it('should call UpdateAccessTokenRepository with correct values', async () => {
    const { updateAccessTokenRepositoryStub, sut } = makeSut()

    const updateSpy = jest.spyOn(updateAccessTokenRepositoryStub, 'updateAccessToken')

    await sut.auth({ email: 'any_email@mail.com', password: 'any_password' })

    expect(updateSpy).toHaveBeenCalledWith({ id: 'any_id', token: 'any_token' })
  })

  it('should throw if UpdateAccessTokenRepository throws', async () => {
    const { updateAccessTokenRepositoryStub, sut } = makeSut()

    jest.spyOn(updateAccessTokenRepositoryStub, 'updateAccessToken').mockReturnValueOnce(new Promise((resolve, reject) => reject(new Error())))

    const authPromise = sut.auth({ email: 'any_email@mail.com', password: 'any_password' })

    await expect(authPromise).rejects.toThrow()
  })
})
