import { IUser } from "../types/User.type";

function setTokenCookie(
  key: string,
  value: string,
  expirationDays: number,
  path: string = "/"
) {
  const expirationDate = new Date();
  expirationDate.setDate(expirationDate.getDate() + expirationDays);
  document.cookie = `${key}=${value}; expires=${expirationDate.toUTCString()}; path=${path}`;
}

function getTokenFromCookie(key: string): string | null {
  function getCookie(name: string): string | null {
    if (typeof window !== "undefined") {
      const value = `; ${document.cookie}`;
      const parts = value.split(`; ${name}=`);
      if (parts.length === 2) return parts.pop()?.split(";").shift() || null;
      return null;
    }
  }
  const tokenFromCookie = getCookie(key);
  return tokenFromCookie;
}

function clearCookie(key: string) {
  document.cookie = `${key}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
}

function setSessionStorage(user: IUser) {
  const userDataJSON = JSON.stringify(user);
  sessionStorage.setItem("userData", userDataJSON);
}

function getSessionStorage() {
  if (typeof window !== "undefined") {
    const userDataJSON = sessionStorage.getItem("userData");
    try {
      if (userDataJSON) {
        const userData = JSON.parse(userDataJSON);
        return userData;
      }
    } catch (err) {
      return err;
    }
  }
}

function clearSessionStorage() {
  sessionStorage.removeItem("userData");
}

export {
  getSessionStorage,
  getTokenFromCookie,
  setSessionStorage,
  setTokenCookie,
  clearCookie,
  clearSessionStorage,
};
