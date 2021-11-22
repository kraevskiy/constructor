import { TFunctionResult } from "i18next";
import { DetailedHTMLProps, HTMLAttributes } from "react";

export interface ItemProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  id: string;
  titles: string[];
  title: string;
  handleDelete: (id: string) => void;
  deleteText?: TFunctionResult;
  linkText?: TFunctionResult;
  addOrder?: TFunctionResult;
  preview?: string;
  createdAt: Date;
  updatedAt: Date;
  userName?: string | null;
  onOrder?: boolean;
  type:string;
}
