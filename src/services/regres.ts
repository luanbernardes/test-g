import { HttpClient, HttpRequest, HttpResponse } from '@/data/protocols/http';
import {
  GetUserResponse,
  GetUsersResponse,
  LocalStorageKeys,
  LogoutResponse,
  PostSignInBody,
  PostSignInResponse,
  PostSignUpBody,
  PostSignUpResponse,
  PostUserBody,
  PostUserResponse
} from '@/@types/reqres';

const baseUrl = import.meta.env.VITE_REQRES_API;
const apiKey = import.meta.env.VITE_REQRES_API_KEY;

export class RequesService {
  private httpClient: HttpClient;
  private httpClientLocalStorage: HttpClient;

  constructor(httpClient: HttpClient, httpClientLocalStorage: HttpClient) {
    this.httpClient = httpClient;
    this.httpClientLocalStorage = httpClientLocalStorage;
  }

  async postSignUp(body: PostSignUpBody): Promise<HttpResponse<PostSignUpResponse>> {
    const httpRequest: HttpRequest = {
      url: `${baseUrl}/api/register`,
      method: 'get',
      body,
      headers: {
        'x-api-key': apiKey
      }
    };

    return this.httpClient.request(httpRequest);
  }

  async postTokenLocalStorage(token: string): Promise<HttpResponse<PostSignUpResponse>> {
    const httpRequest: HttpRequest = {
      url: LocalStorageKeys.token,
      method: 'post',
      body: { token }
    };

    return this.httpClientLocalStorage.request(httpRequest);
  }
  async getTokenLocalStorage(): Promise<HttpResponse<PostSignUpResponse>> {
    const httpRequest: HttpRequest = {
      url: LocalStorageKeys.token,
      method: 'get'
    };

    return this.httpClientLocalStorage.request(httpRequest);
  }
  async deleteTokenLocalStorage(): Promise<HttpResponse<LogoutResponse>> {
    const httpRequest: HttpRequest = {
      url: LocalStorageKeys.token,
      method: 'delete'
    };

    return this.httpClientLocalStorage.request(httpRequest);
  }

  async postSignIn(body: PostSignInBody): Promise<HttpResponse<PostSignInResponse>> {
    const httpRequest: HttpRequest = {
      url: `${baseUrl}/api/login`,
      method: 'post',
      body,
      headers: {
        'x-api-key': apiKey
      }
    };

    return this.httpClient.request(httpRequest);
  }

  async getUsers(token: string, page: number): Promise<HttpResponse<GetUsersResponse>> {
    const httpRequest: HttpRequest = {
      url: `${baseUrl}/api/users?page${page}`,
      method: 'get',
      headers: {
        'x-api-key': apiKey,
        token
      }
    };
    return this.httpClient.request(httpRequest);
  }

  async getUser(token: string, userId: number): Promise<HttpResponse<GetUserResponse>> {
    const httpRequest: HttpRequest = {
      url: `${baseUrl}/api/users/${userId}`,
      method: 'get',
      headers: {
        'x-api-key': apiKey,
        token
      }
    };
    return this.httpClient.request(httpRequest);
  }

  async postUser(token: string, user: PostUserBody): Promise<HttpResponse<PostUserResponse>> {
    const httpRequest: HttpRequest = {
      url: `${baseUrl}/api/users`,
      method: 'post',
      headers: {
        'x-api-key': apiKey,
        token
      },
      body: user
    };
    return this.httpClient.request(httpRequest);
  }
}
