import { EnvironmentConfiguration } from './environment.contract';

export const environment: EnvironmentConfiguration = {
  production: true,
  ENVIRONMENT_NAME: '{{__ENVIRONMENT_NAME__}}',
  BASE_HREF: '{{__BASE_HREF__}}',
  REST_API_URL: '{{__REST_API_URL__}}',
  SEARCH_API_URL: '{{__SEARCH_API_URL__}}',
  VERSION: '{{__VERSION__}}',
};
