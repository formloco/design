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
  linkUrl = 'https://mobile.formloco.com/',
  apiUrl = 'https://api.formloco.com/api/',
  authUrl = 'https://api.formloco.com/auth/',
  formUrl = 'https://api.formloco.com/form/',
  emailUrl = 'https://api.formloco.com/email/',
  notificationUrl = 'https://api.formloco.com/notification/',
  signinUrl = 'https://mobile.formloco.com/e93f63d8e62d44da93009229f8a7f890/'
}
