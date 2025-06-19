import axios from "axios";
import { AccessResponse, UserResponse } from "@/types/api-response";
import { UserDTO } from "@/types/user";
import { TrackResponse } from "@/types/api-response";
import { loggedState } from "@/store/is-logged-in";

export const getTracks = async (
  limit: number,
  offset: number,
): Promise<TrackResponse> => {
  const { data } = await axios.get(
    `http://192.168.0.113:3000/tracks?limit=${limit}&&offset=${offset}`,
  );
  return data;
};

export const login = async () => {
  const { data }: { data: AccessResponse } = await axios.post(
    "http://192.168.0.113:3000/auth/login",
    document.querySelector("#login-form"),
    {
      headers: {
        "Content-Type": "application/json",
      },
    },
  );
  localStorage.setItem("access", data.access_token);
};

export const register = async () => {
  await axios.post(
    "http://192.168.0.113:3000/auth/register",
    document.querySelector("#register-form"),
    {
      headers: {
        "Content-Type": "application/json",
      },
    },
  );
};

export const getUser = async (login = ""): Promise<UserDTO> => {
  const { data } = await axios.get(
    `http://192.168.0.113:3000/users/find/${login}`,
  );
  return data;
};

export const getUsers = async (
  limit: number,
  offset: number,
): Promise<UserResponse> => {
  const { data } = await axios.get(
    `http://192.168.0.113:3000/users?limit=${limit}&&offset=${offset}`,
  );
  return data;
};

export const getProfile = async (): Promise<UserDTO> => {
  if (loggedState.isLogged) {
    const { data } = await axios.get(
      "http://192.168.0.113:3000/users/profile",
      {
        headers: { authorization: `Bearer ${localStorage.getItem("access")}` },
      },
    );
    return data;
  }
  throw new Error("unauthorized");
};

export const validateLogin = async () => {
  await axios.get("http://192.168.0.113:3000/auth/validate", {
    headers: { authorization: `Bearer ${localStorage.getItem("access")}` },
  });
};
