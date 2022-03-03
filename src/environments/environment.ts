// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
import { Formloco } from '../app/state/app.state'

export const environment = {
  production: false,

  kioske: true,
  
  authUrl: Formloco.authUrl,
  // homeUrl: Formloco.deployUrl,
  logo: Formloco.logo,
  linkedinUrl: Formloco.linkedinUrl,
  githubUrl: Formloco.githubUrl,
  kioskeEmail: Formloco.kioskeEmail,
  idbName: Formloco.idbName,
  tenantId: Formloco.tenantId,
  version: '2.0',
  homeUrl: 'http://localhost:4200/',
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
