// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
import { Formloco } from '../app/state/app.state'

export const environment = {
  production: false,

  kioske: false,
  
  authUrl: Formloco.authUrl,
  formUrl: Formloco.formUrl,
  logo: Formloco.logo,
  linkedinUrl: Formloco.linkedinUrl,
  githubUrl: Formloco.githubUrl,
  kioskeEmail: Formloco.kioskeEmail,
  idbName: Formloco.idbName,
  tenantId: Formloco.tenantId,
  emailUrl: Formloco.emailUrl,
  version: '2.0',
  homeUrl: 'http://localhost:4200/',
  signinUrl: 'http://localhost:4200/signin/',
  // formUrl: 'http://localhost:9002/form/',
  // authUrl: 'http://localhost:9000/auth/',
  redirectForgotPasswordUrl: Formloco.redirectForgotPasswordUrl
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
