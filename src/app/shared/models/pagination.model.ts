export default interface IPagination<TResult>{
  results: TResult,
  totalCount: number,
  pageCount: number
}
