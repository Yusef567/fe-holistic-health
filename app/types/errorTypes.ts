import { AxiosError } from "axios";

type CustomErrorData = {
  msg: string;
};

export type CustomAxiosError = AxiosError<CustomErrorData>;
