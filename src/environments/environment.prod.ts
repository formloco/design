import { Formloco } from '../app/state/app.state'

export const environment = {
  production: true,

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
  homeUrl: Formloco.homeUrl,
  signinUrl: Formloco.signinUrl,
  redirectForgotPasswordUrl: Formloco.redirectForgotPasswordUrl
};
