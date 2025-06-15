import { Response } from "express";



export class SuccessResponse {
  public status: string;
  public status_code: string;
  public data?: any;
  public auth_token?: any;

  constructor(
    status_code: string,
    data: any = undefined,
    auth_token: any = undefined
  ) {
    this.status = 'success';
    this.status_code = status_code;
    this.auth_token = auth_token;
    this.data = data;
  }
}

export class ErrorResponse {
  public status: string;
  public status_code: string;
  public message?: string;

  constructor(status_code: string, message: any = undefined) {
    this.status = 'error';
    this.status_code = status_code;
    this.message = message;
  }
}

export const errorResponse = (
  res: Response,
  errorCode: string,
  data?: any,
  status?: number
) => {
  return res.status(status || 400).json(new ErrorResponse(errorCode, data));
};

export const successResponse = (
  res: Response,
  successCode: string,
  data?: any,
  status?: number
) => {
  const resData =  data
  

  return res
    .status(status || 200)
    .json(new SuccessResponse(successCode, resData));
};
