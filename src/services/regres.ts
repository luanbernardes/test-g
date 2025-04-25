import { HttpClient, HttpRequest, HttpResponse } from '@/data/protocols/http';
import {
  GetUsersResponse,
  LocalStorageKeys,
  PostSignInBody,
  PostSignInResponse,
  PostSignUpBody,
  PostSignUpResponse
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

  async postTokenLocalStorage(body: PostSignUpResponse): Promise<HttpResponse<PostSignUpResponse>> {
    const httpRequest: HttpRequest = {
      url: LocalStorageKeys.token,
      method: 'post',
      body
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

  async postSignIn(body: PostSignInBody): Promise<HttpResponse<PostSignInResponse>> {
    // TODO - Mock
    return Promise.resolve({
      statusCode: 200,
      body: {
        id: 1,
        token: 'token-123-456'
      }
    });

    const httpRequest: HttpRequest = {
      url: `${baseUrl}/api/login`,
      method: 'get',
      body,
      headers: {
        'x-api-key': apiKey
      }
    };

    return this.httpClient.request(httpRequest);
  }

  async getUsers(): Promise<HttpResponse<GetUsersResponse>> {
    const httpRequest: HttpRequest = {
      url: `${baseUrl}/api/users`,
      method: 'get'
    };
    return this.httpClient.request(httpRequest);
  }
}
