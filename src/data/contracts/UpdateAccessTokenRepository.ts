export namespace UpdateAccessTokenRepository {
  export type Params = {
    id: string
    token: string
  }

  export interface Repository {
    updateAccessToken(params: UpdateAccessTokenRepository.Params): Promise<void>
  }
}
