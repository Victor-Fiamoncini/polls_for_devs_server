export namespace HashComparator {
  export interface Comparator {
    compare(params: HashComparator.Params): Promise<boolean>
  }

  export type Params = {
    plainPayload: string
    hashedPayload: string
  }
}
