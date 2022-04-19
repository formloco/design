export interface AuthStateModel {
  isIdentified: boolean
  tenant: Tenant
  cloudForms: Form[]
  user: User
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

export interface Form {
  id?: number
  name?: string
  type?: string
  details?: any[]
  form_id?: string
  is_list?: boolean
  is_data?: boolean
  is_published?: boolean
  is_deployed?: boolean
  date_archived?: Date
  date_created?: Date
  date_last_access?: Date
  user_created?: any
  user_archived?: any
}