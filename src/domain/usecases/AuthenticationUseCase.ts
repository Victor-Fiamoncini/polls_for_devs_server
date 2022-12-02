export namespace AuthenticationUseCase {
  export type Params = {
    email: string
    password: string
  }

  export interface UseCase {
    auth(account: AuthenticationUseCase.Params): Promise<string>
  }
}
