import { TypesApp, TypesUser } from "./types";
import {
  AdvantagesPage,
  ContactsPage,
  FaqPage,
  HeaderPage,
  PicturesPage,
  OthersPage,
  SeoPage,
  SliderPage,
  SouvenirsPage,
} from "../types/page";

export interface StateUserOrderLayout {
  title: string;
  _id: string;
}

export interface StateUserOrder {
  status: "new" | "progress" | "completed";
  layouts: StateUserOrderLayout[];
  user: string;
  paymentIntent?: "hold" | "succeeded";
  _id: string;
  orderID?: number | undefined;
  createdAt: Date;
  updatedAt: Date;
  delivery?: string;
  paymentType?: string;
  address?: string;
  firstName?: string;
  lastName?: string;
  phone?: string;
  email?: string;
  comment?: string;
  price?: string;
  count?: string;
}

export interface TotalCount {
  totalCount: number;
}

export interface OrderAllLayout {
  _id: string;
  title: string;
}

export interface StateAllOrders {
  totalCount: TotalCount[];
  orders: StateUserOrder[];
}

export interface User {
  _id: string;
  email: string;
  passwordHash: string;
  role: string;
  login: string;
  createdAt: Date;
  updatedAt: Date;
  __v: number;
  layouts: StateUserLayout[];
  orders: StateUserOrder[];
}

export interface StateUserLayout {
  user?: string;
  title: string;
  slash?: string;
  config: string;
  files: string[];
  instance: string;
  preview?: string;
  _id: string;
  onOrder?: false;
  createdAt: Date;
  updatedAt: Date;
  type: string;
  public: boolean;
}

export interface StateAllLayouts {
  totalCount: TotalCount[];
  layouts: StateUserLayout[];
}

export interface StateAllImages {
  totalCount: TotalCount[];
  images: Image[];
}

export interface RegisterUserModel {
  email: string;
  _id: string;
  createdAt: Date;
  updatedAt: Date;
}

export type RolesUser = "admin" | "user" | "visitor" | "vendor";

export interface StateUser {
  access_token: string;
  isLoggedIn: boolean;
  initAutologin: boolean;
  passwordHash?: string;
  email: string;
  _id: string;
  role: RolesUser;
  login: string;
  canEdit: boolean;
  address: string;
  firstName: string;
  lastName: string;
  phone: string;
  avatar: string;
}

export interface StateApp {
  loading: boolean;
  isOpenCatalog: boolean;
  isOpenMenu: boolean;
  showFooter: boolean;
  showDownloadBtn: boolean;
}

export interface StatePage {
  _id: string;
  slag: string;
  seo: SeoPage;
  header: HeaderPage;
  slides: SliderPage[];
  souvenirs: SouvenirsPage;
  pictures: PicturesPage;
  others: OthersPage;
  advantages: AdvantagesPage;
  contacts: ContactsPage;
  faqs: FaqPage;
}

export interface ActionType<
  T = TypesUser | TypesApp,
  P = StateUser | StateApp
> {
  type: T;
  payload?: P;
}

export interface ActionType<
  T = TypesUser | TypesApp,
  P = StateUser | StateApp
> {
  type: T;
  payload?: P;
}

export interface DecodeTokenTypes {
  email: string;
  iat: number;
  role: RolesUser;
  _id: string;
}

//EDITOR////
export interface CanConfig {
  width: number;
  height: number;
  width_mm: number;
  height_mm: number;
  backgroundColor: string;
  // selectionColor: string,
  selectionLineWidth: number;
  type: CanType;
  gender?: "male" | "female";
  sizeE?: "XS" | "S" | "M" | "L" | "XL" | "XXL";
  mode?: "full" | "area";
}

export type CanType = "card" | "module" | "t_shirt" | "cap";

export interface Editor {
  mainRef?: HTMLCanvasElement;
  coverRef?: HTMLCanvasElement;
  instance?: Canvas;
  cover_instance?: Canvas;
  canvasConfig: CanConfig;
  scaleRatio: number;
  prefabsLoading: boolean;
  history: string[];
  history_n: number;
  loading: boolean;
}

export interface Images {
  images: Image[];
  loading: boolean;
}

export interface Image {
  _id: string;
  url: string;
  type: string;
}

export interface Canvas extends fabric.Canvas {}

export interface FabImage extends fabric.Image {
  img_up?: File;
  src: string;
}
