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
        headers: data.headers
      });
    } catch (error: unknown) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      axiosResponse = error?.response;
    }
    return {
      statusCode: axiosResponse.status,
      body: axiosResponse.data
    };
  }
}
