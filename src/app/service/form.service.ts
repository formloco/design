import { Injectable } from '@angular/core'

import { Store } from '@ngxs/store'
import { Form } from "../state/auth/auth-state.model"

import { AuthState } from '../state/auth/auth.state'

import { HttpClient } from '@angular/common/http'

import { environment } from '../../environments/environment'

@Injectable({
  providedIn: 'root'
})
export class FormService {
  formUrl = environment.formUrl

  constructor(
    private store: Store,
    private http: HttpClient) { }

  addTenantId(obj: any) {
    const tenant = this.store.selectSnapshot(AuthState.tenant)
    obj["tenant_id"] = tenant.tenant_id
    return obj 
  }

  getForm(obj: any) {
    obj = this.addTenantId(obj)
    return this.http.get(this.formUrl + obj.form_id+'/'+obj.data_id+'/')
  }

  getForms(obj: any) {
    obj = this.addTenantId(obj)
    return this.http.post(this.formUrl + 'forms/', obj)
  }

  create(obj: any) {
    obj = this.addTenantId(obj)
    return this.http.post(this.formUrl, obj)
  }

  update(form: Form) {
    form = this.addTenantId(form)
    return this.http.put(this.formUrl, form)
  }

  statusToggle(form: Form) {
    form = this.addTenantId(form)
    return this.http.post(this.formUrl + 'status/', form)
  }

  setPermissions(obj: any) {
    obj = this.addTenantId(obj)
    return this.http.post(this.formUrl + 'permission/', obj)
  }

  getPermissions(obj: any) {
    obj = this.addTenantId(obj)
    return this.http.get(this.formUrl + 'permission/', obj)
  }
  
}
