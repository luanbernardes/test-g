import { AxiosHttpClient } from '@/infra/http/axios-http-client';
import { RequesService } from '@/services/regres';
import { LocalstorageHttpClient } from '@/infra/http/localstorage-http-client';

const httpClientAxios = new AxiosHttpClient();
const httpClientLocalStorage = new LocalstorageHttpClient();

const reqresService = new RequesService(httpClientAxios, httpClientLocalStorage);

export { reqresService };
