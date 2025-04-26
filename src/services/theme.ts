import { HttpClient, HttpRequest, HttpResponse } from '@/data/protocols/http';
import { LocalStorageKeys } from '@/@types/reqres';
import { themeEnum, themeResponse } from '@/@types/theme';

export class ThemeService {
  private httpClient: HttpClient;

  constructor(httpClient: HttpClient) {
    this.httpClient = httpClient;
  }
  async postThemeLocalStorage(theme: themeEnum): Promise<HttpResponse<themeResponse>> {
    console.log({ theme });
    const httpRequest: HttpRequest = {
      url: LocalStorageKeys.theme,
      method: 'post',
      body: { theme }
    };

    return this.httpClient.request(httpRequest);
  }
  async getThemeLocalStorage(): Promise<HttpResponse<themeResponse>> {
    const httpRequest: HttpRequest = {
      url: LocalStorageKeys.theme,
      method: 'get'
    };

    return this.httpClient.request(httpRequest);
  }
}
