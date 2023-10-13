"use client";

import { ISearchParams } from "@/types/Post.type";
import { getSessionStorage, getTokenFromCookie } from "@/utils/cookie";
import axios, { AxiosResponse } from "axios";

const apiUrl = "https://todoapp-uit.vercel.app";

const accessToken = getTokenFromCookie("token");
const user = getSessionStorage();
const userId = user?._id;

axios.defaults.headers.post["Content-Type"] = "application/json";
axios.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;

interface ApiResponse {
  data: any;
}

export async function getListData(
  additionalParams: ISearchParams
): Promise<ApiResponse> {
  try {
    const response: AxiosResponse<ApiResponse> = await axios.get(
      `${apiUrl}/api/todo/list/${userId}`,
      { params: additionalParams }
    );

    return response.data;
  } catch (error: any) {
    if (error.response) {
      console.error("Lỗi từ API:", error.response.data);
    } else {
      console.error("Lỗi không thể kết nối đến server:", error.message);
    }
    throw error;
  }
}

export async function getData(postId: string): Promise<ApiResponse> {
  try {
    const response: AxiosResponse<ApiResponse> = await axios.get(
      `${apiUrl}/api/todo/${postId}`
    );

    return response.data;
  } catch (error: any) {
    if (error.response) {
      console.error("Lỗi từ API:", error.response.data);
    } else {
      console.error("Lỗi không thể kết nối đến server:", error.message);
    }
    throw error;
  }
}

export async function postData(data: any): Promise<ApiResponse> {
  try {
    const response: AxiosResponse<ApiResponse> = await axios.post(
      `${apiUrl}/api/todo`,
      data
    );

    return response.data;
  } catch (error: any) {
    if (error.response) {
      console.error("Lỗi từ API:", error.response.data);
    } else {
      console.error("Lỗi không thể kết nối đến server:", error.message);
    }
    throw error;
  }
}

export async function putData(data: any, postId: string): Promise<ApiResponse> {
  try {
    const response: AxiosResponse<ApiResponse> = await axios.put(
      `${apiUrl}/api/todo/${postId}`,
      data
    );

    return response.data;
  } catch (error: any) {
    if (error.response) {
      console.error("Lỗi từ API:", error.response.data);
    } else {
      console.error("Lỗi không thể kết nối đến server:", error.message);
    }
    throw error;
  }
}

export async function deleteData(postId: string): Promise<ApiResponse> {
  try {
    const response: AxiosResponse<ApiResponse> = await axios.delete(
      `${apiUrl}/api/todo/${postId}`
    );

    return response.data;
  } catch (error: any) {
    if (error.response) {
      console.error("Lỗi từ API:", error.response.data);
    } else {
      console.error("Lỗi không thể kết nối đến server:", error.message);
    }
    throw error;
  }
}

export async function registerAPI(data: any): Promise<ApiResponse> {
  try {
    const response: AxiosResponse<ApiResponse> = await axios.post(
      `${apiUrl}/api/users`,
      data
    );

    return response.data;
  } catch (error: any) {
    if (error.response) {
      console.error("Lỗi từ API:", error.response.data);
    } else {
      console.error("Lỗi không thể kết nối đến server:", error.message);
    }
    throw error;
  }
}

export async function loginAPI(data: any): Promise<ApiResponse> {
  try {
    const response: AxiosResponse<ApiResponse> = await axios.post(
      `${apiUrl}/api/auth/login`,
      data
    );

    return response.data;
  } catch (error: any) {
    if (error.response) {
      console.error("Lỗi từ API:", error.response.data);
    } else {
      console.error("Lỗi không thể kết nối đến server:", error.message);
    }
    throw error;
  }
}

export async function refreshTokenAPI(data: any): Promise<ApiResponse> {
  try {
    const response: AxiosResponse<ApiResponse> = await axios.post(
      `${apiUrl}/api/auth/refresh-token`,
      data
    );

    return response.data;
  } catch (error: any) {
    if (error.response) {
      console.error("Lỗi từ API:", error.response.data);
    } else {
      console.error("Lỗi không thể kết nối đến server:", error.message);
    }
    throw error;
  }
}

export async function editProfileAPI(data: any): Promise<ApiResponse> {
  try {
    const response: AxiosResponse<ApiResponse> = await axios.put(
      `${apiUrl}/api/users/${userId}`,
      data
    );

    return response.data;
  } catch (error: any) {
    if (error.response) {
      console.error("Lỗi từ API:", error.response.data);
    } else {
      console.error("Lỗi không thể kết nối đến server:", error.message);
    }
    throw error;
  }
}

export async function postImage(formData: FormData): Promise<ApiResponse> {
  try {
    const response: AxiosResponse<ApiResponse> = await axios.post(
      `${apiUrl}/api/upload/image`,
      formData,
      {
        headers: { "Content-Type": "multipart/form-data" },
      }
    );

    return response.data;
  } catch (error: any) {
    if (error.response) {
      console.error("Lỗi từ API:", error.response.data);
    } else {
      console.error("Lỗi không thể kết nối đến server:", error.message);
    }
    throw error;
  }
}
