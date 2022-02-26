export interface AuthStateModel {
  isIdentified: boolean
  tenant: Tenant
  user: User
  selectedForm: object
  page: string
  pageLabel: string
  childPage: string
  childPageLabel: string
}
          
export interface User {
  email: string
  isDarkMode: boolean
}

export interface Tenant {
  tenant_id: string
  email: string
}