import { AuthState } from './auth/auth.state'
import { DeviceState } from './device/device.state'
import { CanvasState } from '../component/canvas/state/canvas.state'

export const States = [
  AuthState,
  DeviceState,
  CanvasState
];

export enum Formloco {
  tenantId = 'formloco',
  idbName = 'formlocoDesigner',
  email = 'poly@formloco.com',
  logo = 'assets/logo-light.png',
  tenant = 'formloco',
  linkedinUrl = 'https://www.linkedin.com/in/formloco',
  githubUrl = 'https://github.com/formloco/',
  homeUrl = 'https://mobile.formloco.com/',
  homeKioskeUrl = 'https://formloco.com/',
  apiUrl = 'https://api.formloco.com/api/',
  authUrl = 'https://api.formloco.com/auth/',
  formUrl = 'https://api.formloco.com/form/',
  emailUrl = 'https://api.formloco.com/email/',
  notificationUrl = 'https://api.formloco.com/notification/',
  signinUrl = 'https://mobile.formloco.com/signin/',
  redirectForgotPasswordUrl = 'https://mobile.formloco.com/O451fd2702f54a00b1007f6e80b32e45/'
}
