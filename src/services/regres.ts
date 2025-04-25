import { HttpClient, HttpRequest, HttpResponse } from '@/data/protocols/http';
import { GetUsersResponse, PostSignInBody, PostSignInResponse } from '@/@types/reqres';

const baseUrl = import.meta.env.VITE_REQRES_API;

export class RequesService {
  private httpClient: HttpClient;

  constructor(httpClient: HttpClient) {
    this.httpClient = httpClient;
  }

  async postSignIn(body: PostSignInBody): Promise<HttpResponse<PostSignInResponse>> {
    const httpRequest: HttpRequest = {
      url: `${baseUrl}/api/login`,
      method: 'get',
      body
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
