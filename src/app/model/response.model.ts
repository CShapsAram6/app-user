export interface singleResponse<T> {
  success: boolean;
  message: string;
  data: T;
}

export interface orderResponse{
  success: boolean;
  data: any;
  message: string;
}
