export default interface SearchParams{
  pageSize: number;
  pageNumber: number;
  searchTerm: string;
  sortBy: string;
  sortDirection: string;
  yearOfReleaseStart: number;
  yearOfReleaseEnd: number;
  minimumPrice: number;
  maximumPrice: number;
}
