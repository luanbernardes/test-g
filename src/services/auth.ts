import { HttpClient, HttpRequest, HttpResponse } from '@/data/protocols/http';

export interface authUserResponse {
  token: string;
}

export class AuthService {
  private httpClient: HttpClient;

  constructor(httpClient: HttpClient) {
    this.httpClient = httpClient;
  }

  async saveAuthUser(token: string): Promise<HttpResponse<authUserResponse>> {
    const httpRequest: HttpRequest = {
      url: 'token',
      method: 'post',
      body: { token }
    };
    return this.httpClient.request(httpRequest);
  }

  async getAuthUser(): Promise<HttpResponse<authUserResponse>> {
    const httpRequest: HttpRequest = {
      url: 'token',
      method: 'get'
    };
    return this.httpClient.request(httpRequest);
  }
}
