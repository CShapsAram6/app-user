export interface singleResponse<T> {
  sussess: boolean;
  message: string;
  data: T;
}
