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
}

export enum TypesLayout {
  getLayouts = "LAYOUT/GET",
  createLayout = "LAYOUT/CREATE_LAYOUT",
  deleteLayout = "LAYOUT/DELETE_LAYOUT",
  editLayout = "LAYOUT/EDIT_LAYOUT",
}

export enum TypesLayoutAll {
  getLayoutsAll = "LAYOUTS/GET_ALL",
}

export enum TypesApp {
  showLoader = "APP/SHOW_LOADER",
  hideLoader = "APP/HIDE_LOADER",
  toggleCatalog = "APP/TOGGLE_CATALOG",
  toggleMenu = "APP/TOGGLE_MENU",
}

export enum TypesEditor {
  set_editor = "EDITOR/SET_EDITOR",
  set_cover_editor = "EDITOR/SET_COVER_EDITOR",
  set_config = "EDITOR/SET_CONFIG",
  set_prefab = "EDITOR/SET_PREFAB",
  get_images = "EDITOR/GET_IMAGES",
  delete_prefab = "EDITOR/DELETE_PREFAB",
  set_scale = "EDITOR/SET_SCALE",
  change_history = "EDITOR/CHANGE_HISTORY",
  set_history_moment = "EDITOR/SET_HISTORY_MOMENT",
}
