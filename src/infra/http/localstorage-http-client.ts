import { HttpClient, HttpRequest, HttpResponse } from '@/data/protocols/http';

export class LocalstorageHttpClient implements HttpClient {
  async request(data: HttpRequest): Promise<HttpResponse> {
    if (data.method === 'post') {
      const key = data.url;
      localStorage.setItem(key, JSON.stringify(data.body?.token));

      return Promise.resolve({
        statusCode: 200,
        body: { message: 'success from localStorage' }
      });
    }

    if (data.method === 'get') {
      const key = data.url;
      const response = localStorage.getItem(key);

      if (response) {
        return Promise.resolve({
          statusCode: 200,
          body: JSON.parse(response)
        });
      }
    }

    return Promise.reject({
      statusCode: 400,
      body: { message: 'error' }
    });
  }
}
