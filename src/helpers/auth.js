import { setCookie, getCookie, deleteCookie } from "./cookies";
import {
  setLocalStorage,
  getLocalStorage,
  deleteLocalStorage,
} from "./localStorage";

export const setAuthentication = (user) => {
  //setCookie("token", token);
  setLocalStorage("user", user);
};

export const isAuthenticated = () => {
  if (getLocalStorage("user")) {
    return getLocalStorage("user");
  } else {
    return false;
  }
};
/*Chat component starting */
export const getCurrentUser = () => {
  if (getLocalStorage("user")) {
    return getLocalStorage("user");
  } else {
    return false;
  }
};

export const setSelectedChat = (id) => {
  setLocalStorage("chatID", id);
};

export const getCurrentChat = () => {
  if (getLocalStorage("chatID")) {
    return getLocalStorage("chatID");
  } else {
    return false;
  }
};
/*Chat component ending */

export function logout() {
  deleteLocalStorage("user");
}
