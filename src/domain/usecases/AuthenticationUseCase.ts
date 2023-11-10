export namespace AuthenticationUseCase {
  export type Params = {
    email: string
    password: string
  }

  export interface UseCase {
    auth(credentials: Params): Promise<string>
  }
}
