import { AccountModel, DbAuthenticationUseCase, LoadAccountByEmailRepository, HashComparator, TokenGenerator, UpdateAccessTokenRepository } from 'src/data'

const makeLoadAccountByEmailRepositoryStub = () => {
  class LoadAccountByEmailRepositoryStub implements LoadAccountByEmailRepository.Repository {
    async load (params: LoadAccountByEmailRepository.Params): Promise<AccountModel> {
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

const makeTokenGeneratorStub = () => {
  class TokenGeneratorStub implements TokenGenerator {
    async generate (payload: string): Promise<string> {
      return 'any_token'
    }
  }

  return new TokenGeneratorStub()
}

const makeUpdateAccessTokenRepositoryStub = () => {
  class UpdateAccessTokenRepositoryStub implements UpdateAccessTokenRepository.Repository {
    async update (params: UpdateAccessTokenRepository.Params): Promise<void> {}
  }

  return new UpdateAccessTokenRepositoryStub()
}

const makeSut = () => {
  const loadAccountByEmailRepositoryStub = makeLoadAccountByEmailRepositoryStub()
  const hashComparatorStub = makeHashComparatorStub()
  const tokenGeneratorStub = makeTokenGeneratorStub()
  const updateAccessTokenRepositoryStub = makeUpdateAccessTokenRepositoryStub()
  const sut = new DbAuthenticationUseCase(
    loadAccountByEmailRepositoryStub,
    hashComparatorStub,
    tokenGeneratorStub,
    updateAccessTokenRepositoryStub
  )

  return {
    loadAccountByEmailRepositoryStub,
    hashComparatorStub,
    tokenGeneratorStub,
    updateAccessTokenRepositoryStub,
    sut
  }
}

describe('DbAuthenticationUseCase', () => {
  it('should call LoadAccountByEmailRepository with correct email', async () => {
    const { loadAccountByEmailRepositoryStub, sut } = makeSut()

    const loadSpy = jest.spyOn(loadAccountByEmailRepositoryStub, 'load')

    await sut.auth({ email: 'any_email@mail.com', password: 'any_password' })

    expect(loadSpy).toHaveBeenCalledWith({ email: 'any_email@mail.com' })
  })

  it('should throw if LoadAccountByEmailRepository throws', async () => {
    const { loadAccountByEmailRepositoryStub, sut } = makeSut()

    jest.spyOn(loadAccountByEmailRepositoryStub, 'load').mockReturnValueOnce(new Promise((resolve, reject) => reject(new Error())))

    const authPromise = sut.auth({ email: 'any_email@mail.com', password: 'any_password' })

    await expect(authPromise).rejects.toThrow()
  })

  it('should return null if LoadAccountByEmailRepository returns null', async () => {
    const { loadAccountByEmailRepositoryStub, sut } = makeSut()

    jest.spyOn(loadAccountByEmailRepositoryStub, 'load').mockReturnValueOnce(null)

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

  it('should call TokenGenerator with correct id', async () => {
    const { tokenGeneratorStub, sut } = makeSut()

    const generateSpy = jest.spyOn(tokenGeneratorStub, 'generate')

    await sut.auth({ email: 'any_email@mail.com', password: 'any_password' })

    expect(generateSpy).toHaveBeenCalledWith('any_id')
  })

  it('should throw if TokenGenerator throws', async () => {
    const { tokenGeneratorStub, sut } = makeSut()

    jest.spyOn(tokenGeneratorStub, 'generate').mockReturnValueOnce(new Promise((resolve, reject) => reject(new Error())))

    const authPromise = sut.auth({ email: 'any_email@mail.com', password: 'any_password' })

    await expect(authPromise).rejects.toThrow()
  })

  it('should return access token if TokenGenerator succeeds', async () => {
    const { sut } = makeSut()

    const accessToken = await sut.auth({ email: 'any_email@mail.com', password: 'any_password' })

    expect(accessToken).toBe('any_token')
  })

  it('should call UpdateAccessTokenRepository with correct values', async () => {
    const { updateAccessTokenRepositoryStub, sut } = makeSut()

    const updateSpy = jest.spyOn(updateAccessTokenRepositoryStub, 'update')

    await sut.auth({ email: 'any_email@mail.com', password: 'any_password' })

    expect(updateSpy).toHaveBeenCalledWith({ id: 'any_id', token: 'any_token' })
  })

  it('should throw if UpdateAccessTokenRepository throws', async () => {
    const { updateAccessTokenRepositoryStub, sut } = makeSut()

    jest.spyOn(updateAccessTokenRepositoryStub, 'update').mockReturnValueOnce(new Promise((resolve, reject) => reject(new Error())))

    const authPromise = sut.auth({ email: 'any_email@mail.com', password: 'any_password' })

    await expect(authPromise).rejects.toThrow()
  })
})