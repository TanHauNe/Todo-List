"use client";

import { getSessionStorage, getTokenFromCookie } from "@/utils/cookie";
import axios, { AxiosResponse, AxiosError } from "axios";

const apiUrl = "https://todoapp-uit.vercel.app";

const accessToken = getTokenFromCookie();
const user = getSessionStorage();
const userId = user?._id;

interface ApiResponse {
  data: any;
}

export async function getData(): Promise<ApiResponse> {
  try {
    const response: AxiosResponse<ApiResponse> = await axios.get(
      `${apiUrl}/api/todo/${userId}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    return response.data;
  } catch (error: any) {
    if (error.response) {
      console.error("Lỗi từ server:", error.response.data);
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
      data,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      }
    );

    return response.data;
  } catch (error: any) {
    if (error.response) {
      console.error("Lỗi từ server:", error.response.data);
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
      data,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      }
    );

    return response.data;
  } catch (error: any) {
    if (error.response) {
      console.error("Lỗi từ server:", error.response.data);
    } else {
      console.error("Lỗi không thể kết nối đến server:", error.message);
    }
    throw error;
  }
}

export async function deleteData(postId: string): Promise<ApiResponse> {
  try {
    const response: AxiosResponse<ApiResponse> = await axios.delete(
      `${apiUrl}/api/todo/${postId}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    return response.data;
  } catch (error: any) {
    if (error.response) {
      console.error("Lỗi từ server:", error.response.data);
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
      data,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    return response.data;
  } catch (error: any) {
    if (error.response) {
      console.error("Lỗi từ server:", error.response.data);
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
      data,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    return response.data;
  } catch (error: any) {
    if (error.response) {
      console.error("Lỗi từ server:", error.response.data);
    } else {
      console.error("Lỗi không thể kết nối đến server:", error.message);
    }
    throw error;
  }
}
