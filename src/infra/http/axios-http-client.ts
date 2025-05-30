import { HttpRequest, HttpResponse, HttpClient } from '@/data/protocols/http';
import axios, { AxiosResponse } from 'axios';

export class AxiosHttpClient implements HttpClient {
  async request(data: HttpRequest): Promise<HttpResponse> {
    let axiosResponse: AxiosResponse;

    try {
      axiosResponse = await axios.request({
        url: data.url,
        method: data.method,
        data: data.body,
        headers: data.headers,
        validateStatus: (status) => status >= 200 && status <= 300
      });
    } catch (error: unknown) {
      throw new Error(error as string);
    }

    return {
      statusCode: axiosResponse.status,
      body: axiosResponse.data
    };
  }
}
