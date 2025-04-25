import { HttpClient, HttpRequest, HttpResponse } from '@/data/protocols/http';
import { GetUsersResponse, PostSignInBody, PostSignInResponse } from '@/@types/reqres';

const baseUrl = import.meta.env.VITE_REQRES_API;

export class RequesService {
  private httpClient: HttpClient;

  constructor(httpClient: HttpClient) {
    this.httpClient = httpClient;
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
