export interface singleResponse<T> {
  success: boolean;
  message: string;
  data: T;
}
