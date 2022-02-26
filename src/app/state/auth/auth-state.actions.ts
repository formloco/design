import { User, Tenant } from './auth-state.model'

export class SetIsIdentified {
  static type = '[Auth] SetIsIdentified'
  constructor(public isIdentified: boolean) {}
}

export class SetIsSignIn {
  static type = '[Auth] SetIsSignIn'
  constructor(public isSignIn: boolean) {}
}

export class SetIsAdmin {
  static type = '[Auth] SetIsAdmin'
  constructor(public isAdmin: boolean) {}
}

export class SetIsListMenu {
  static type = '[Auth] SetIsMenuList'
  constructor(public isListMenu: boolean) {}
}

export class SetPage {
  static type = '[Auth] SetPage'
  constructor(public page: string) {}
}

export class SetChildPage {
  static type = '[Auth] SetChildPage'
  constructor(public childPage: string) {}
}

export class SetChildPageLabel {
  static type = '[Auth] SetChildPageLabel'
  constructor(public childPageLabel: string) {}
}

export class SetTenant {
  static type = '[Auth] SetTenant'
  constructor(public tenant: Tenant) {}
}

export class SetUser {
  static type = '[Auth] SetUser'
  constructor(public user: User) {}
}

export class SetSelectedForm {
  static type = '[Auth] SetSelectedForm'
  constructor(public selectedForm: {}) {}
}

export class SetForms {
  static type = '[Auth] SetForms'
  constructor(public forms: any[]) {}
}

export class SetPageLabel {
  static type = '[Auth] SetPageLabel'
  constructor(public pageLabel: string) {}
}

