import { EnvironmentConfiguration } from './environment.contract';

// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment: EnvironmentConfiguration = {
  production: false,
  ENVIRONMENT_NAME: 'dev',
  BASE_HREF: '/',
  REST_API_URL: '/api',
  SEARCH_API_URL: '/search',
  VERSION: 'WIP'
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
