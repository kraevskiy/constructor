export enum TypesUser {
  createUser = "USER/CREATE_USER",
  editUser = "USER/EDIT_USER",
  login = "USER/LOGIN",
  autologin = "USER/AUTOLOGIN",
  logout = "USER/LOGOUT",
  delete = "USER/DELETE",
}

export enum TypesAllUsers {
  usersGetAll = "USERS/GET_ALL",
}

export enum TypesOrderAll {
  getOrdersAll = "ORDERS/GET_ALL",
}

export enum TypesOrder {
  getOrders = "ORDER/GET_ORDERS",
  createOrder = "ORDER/CREATE_ORDER",
  deleteOrder = "ORDER/DELETE_ORDER",
  editOrder = "ORDER/EDIT_ORDER",
  editStatusOrder = "ORDER/EDIT_Status_ORDER",
  clearOrder = "ORDER/CLEAR_ORDER",
}

export enum TypesLayout {
  getLayout = "LAYOUT/GET",
  getLayouts = "LAYOUT/GET",
  getAllLayouts = "LAYOUT/GET_ALL",
  createLayout = "LAYOUT/CREATE_LAYOUT",
  deleteLayout = "LAYOUT/DELETE_LAYOUT",
  editLayout = "LAYOUT/EDIT_LAYOUT",
  clearLayout = "LAYOUT/CLEAR_LAYOUT",
  clearAllLayout = "LAYOUT/CLEAR_ALL_LAYOUT",
}

export enum TypesLayoutAll {
  getLayoutsAll = "LAYOUTS/GET_ALL",
  clearLayoutsAll = "LAYOUTS/CLEAR_ALL",
}

export enum TypesPage {
  getBySlug = "PAGE/GET_BY_SLUG",
  editById = "PAGE/EDIT_BY_ID",
}

export enum TypesApp {
  showLoader = "APP/SHOW_LOADER",
  hideLoader = "APP/HIDE_LOADER",
  toggleCatalog = "APP/TOGGLE_CATALOG",
  toggleMenu = "APP/TOGGLE_MENU",
  showFooter = "APP/SHOW_FOOTER",
  hideFooter = "APP/HIDE_FOOTER",
  showDownloadBtn = "APP/SHOW_DOWNLOAD_BUTTON",
  hideDownloadBtn = "APP/HIDE_DOWNLOAD_BUTTON",
}

export enum TypesEditor {
  set_main_ref = "EDITOR/SET_MAIN_REF",
  set_cover_ref = "EDITOR/SET_COVER_REF",
  set_editor = "EDITOR/SET_EDITOR",
  set_cover_editor = "EDITOR/SET_COVER_EDITOR",
  set_config = "EDITOR/SET_CONFIG",
  set_scale = "EDITOR/SET_SCALE",
  change_history = "EDITOR/CHANGE_HISTORY",
  set_history_moment = "EDITOR/SET_HISTORY_MOMENT",
  set_loading = "EDITOR/SET_LOADING",
}

export enum TypesImages {
  getImages = "IMAGES/GET_IMAGES",
  setLoading = "IMAGES/SET_LOADING",
  uploadImage = "IMAGES/UPLOAD_IMAGE",
  deleteImage = "IMAGES/DELETE_IMAGE",
}
