import { DateRange } from "./common";

export interface PaginationParams {
  page: number;
  pageSize: number;
}

export interface SearchParams extends PaginationParams {
  query?: string;
  categories?: string[];
  sources?: string[];
  dateRange?: DateRange;
  dateFrom: string | null;
  dateTo:  string | null;
}

export type DateFormatter = (date: string | null) => string | undefined;
