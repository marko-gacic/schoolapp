export interface Page {
  page: number;
  size: number;
  orderBy: string;
  order: string;
  totalItems: number;
}


export interface PageResponse<T> {
  content: T[];
  totalItems: number;
  page: number;
  size: number;
}


export interface Response {
  message: String;
}

