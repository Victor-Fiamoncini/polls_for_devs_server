export namespace UpdateAccessTokenRepository {
  export type Params = {
    id: string
    token: string
  }

  export interface Repository {
    update(params: UpdateAccessTokenRepository.Params): Promise<void>
  }
}
