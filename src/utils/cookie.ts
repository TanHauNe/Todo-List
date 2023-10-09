import { IUser } from "../types/User.type";

function setTokenCookie(token: string, expirationDays: number) {
  const expirationDate = new Date();
  expirationDate.setDate(expirationDate.getDate() + expirationDays);
  document.cookie = `token=${token}; expires=${expirationDate.toUTCString()}; path=/`;
}

function getTokenFromCookie(): string | null {
  function getCookie(name: string): string | null {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop()?.split(";").shift() || null;
    return null;
  }
  const tokenFromCookie = getCookie("token");
  return tokenFromCookie;
}

function setSessionStorage(user: IUser) {
  const userDataJSON = JSON.stringify(user);
  sessionStorage.setItem("userData", userDataJSON);
}

function getSessionStorage() {
  const userDataJSON = sessionStorage.getItem("userData");
  if (userDataJSON) {
    const userData = JSON.parse(userDataJSON);
    return userData;
  }
  return null;
}

export {
  setTokenCookie,
  getTokenFromCookie,
  getSessionStorage,
  setSessionStorage,
};
