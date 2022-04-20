import { Component, OnInit } from '@angular/core'

import * as _ from 'lodash'
import { Observable } from 'rxjs'

import { Store, Select } from '@ngxs/store'
import { SetPage, SetPageLabel, SetTenant } from '../../state/auth/auth-state.actions'

import { FormService } from "../../service/form.service"
import { DesignService } from "../../service/design.service"
import { IdbCrudService } from "../../service-idb/idb-crud.service"

import { environment } from '../../../environments/environment'

import { AuthState } from '../../state/auth/auth.state'
import { Form } from "../../state/auth/auth-state.model"
import { SetCloudForms } from '../../state/auth/auth-state.actions'
import { CanvasState } from '../canvas/state/canvas.state'

import { SetCurrentIndex, SetFormObject, SetIsSave, SetForms } from '../canvas/state/canvas-state.actions'

@Component({
  selector: 'app-library',
  templateUrl: './library.component.html',
  styleUrls: ['./library.component.scss']
})
export class LibraryComponent implements OnInit {

  @Select(AuthState.tenant) tenant$!: Observable<any>
  @Select(CanvasState.forms) forms$!: Observable<any>

  version = environment.version
  homeUrl = environment.homeUrl
  signinUrl = environment.signinUrl

  constructor(
    private store: Store,
    private formService: FormService,
    public designService: DesignService,
    private idbCrudService: IdbCrudService) { }

  ngOnInit(): void {
    // this.tenant$.subscribe((tenant: any) => {
    //   this.formService.getForms({ email: tenant.email }).subscribe((forms: any) => {
    //     let cloudForms: any[] = []
    //     forms.forEach((ele: any) => {
    //       cloudForms.push(ele.form)
    //     })
    //     this.store.dispatch(new SetCloudForms(cloudForms))
    //     console.log(cloudForms)
    //   })
    // })
    
    // const user = this.store.selectSnapshot(AuthState.user)
    
    
    // this.tenant = this.store.selectSnapshot(AuthState.tenant)

  }

  create() {
    this.store.dispatch(new SetFormObject(undefined))
    this.store.dispatch(new SetPage('design'))
    this.store.dispatch(new SetPageLabel('Create'))
  }

  edit(idx: any, formObj: any) {
    console.log(formObj)
    this.store.dispatch(new SetCurrentIndex(idx))
    this.store.dispatch(new SetFormObject(formObj))
    this.store.dispatch(new SetIsSave(true))
    this.store.dispatch(new SetPage('design'))
    this.store.dispatch(new SetPageLabel('Edit'))
  }

  admin() { }

  signin() {
    this.store.dispatch(new SetPage('signin'))
  }

  signout() {
    this.idbCrudService.clear('prefs')
    this.store.dispatch(new SetTenant(null))
    this.store.dispatch(new SetPage('library'))
  }

  deployToggle(formObj: Form) {
    this.designService.formObj = _.cloneDeep(formObj)
    const tenant = this.store.selectSnapshot(AuthState.tenant)

    if (!tenant) this.store.dispatch(new SetPage('signup'))

    else {
      this.designService.formObj.is_deployed = !this.designService.formObj.is_deployed
      this.idbCrudService.put('form', this.designService.formObj).subscribe(_ => { })
      this.idbCrudService.readAll('form').subscribe((forms: any) => {
        this.store.dispatch(new SetForms(forms))
        this.store.dispatch(new SetPage('library'))
      })
      
      if (!this.designService.formObj['user_created'])
        this.designService.formObj['user_created'] = { email: tenant.email, date_created: new Date().toLocaleString("en-US", { timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone }) }

      this.formService.update(this.designService.formObj).subscribe(_ => { })
    }

  }

}
