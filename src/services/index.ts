import { AxiosHttpClient } from '@/infra/http/axios-http-client';
import { LocalstorageHttpClient } from '@/infra/http/localstorage-http-client';
import { RequesService } from '@/services/regres';
import { ThemeService } from '@/services/theme';

const httpClientAxios = new AxiosHttpClient();
const httpClientLocalStorage = new LocalstorageHttpClient();

const reqresService = new RequesService(httpClientAxios, httpClientLocalStorage);
const themeService = new ThemeService(httpClientLocalStorage);

export { reqresService, themeService };
