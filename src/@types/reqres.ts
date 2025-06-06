export interface User {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  avatar: string;
}

export interface GetUsersResponse {
  page: number;
  per_page: number;
  total: number;
  total_pages: number;
  data: User[];
}
export interface GetUserResponse {
  data: {
    id: number;
    email: string;
    first_name: string;
    last_name: string;
    avatar: string;
  };
  support: {
    url: string;
    text: string;
  };
}
export interface PostUserBody {
  name: string;
  job: string;
}
export interface PostUserResponse {
  name: string;
  job: string;
  id: string;
  createdAt: string;
}

export interface PostSignInBody {
  email: string;
  password: string;
}
export interface PostSignInResponse {
  token: string;
}

export interface PostSignUpBody {
  email: string;
  password: string;
}
export interface PostSignUpResponse {
  id: number;
  token: string;
}

export interface PostSignUpFormData extends PostSignUpBody {
  confirmPassword: string;
}

export enum LocalStorageKeys {
  token = '1global-token',
  theme = '1global-theme-selected'
}

export interface LogoutResponse {
  message: string;
}
