import { Component } from '@angular/core'

import { Observable } from 'rxjs'
import { FormBuilder, FormGroup, Validators } from "@angular/forms"

import { FormService } from "../../service/form.service"
import { AuthService } from "../../service/auth.service"
import { EmailService } from "../../service/email.service"
import { ErrorService } from "../../service/error.service"
import { SuccessService } from "../../service/success.service"

import { environment } from '../../../environments/environment'

import { Store, Select } from '@ngxs/store'
import { DeviceState } from '../../state/device/device.state'
import { SetPage, SetTenant, SetIsIdentified, SetCloudForms } from '../../state/auth/auth-state.actions'

import { IdbCrudService } from "../../service-idb/idb-crud.service"

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent {

  @Select(DeviceState.background) background$: Observable<string>

  logo = environment.logo
  signinForm: FormGroup

  redirectForgotPasswordUrl = environment.redirectForgotPasswordUrl

  constructor(
    private store: Store,
    private fb: FormBuilder,
    private formService: FormService,
    private authService: AuthService,
    private errorService: ErrorService,
    private emailService: EmailService,
    private idbCrudService: IdbCrudService,
    private successService: SuccessService) {
    this.signinForm = this.fb.group({
      email: [null, [Validators.required, Validators.email]],
      password: [null, Validators.required]
    })
  }

  signin() {
    let obj = {
      email: this.signinForm.controls['email'].value,
      password: this.signinForm.controls['password'].value
    }
    this.authService.signinEmail(obj).subscribe((tenant: any) => {
      if (tenant) {
        this.store.dispatch(new SetTenant({ tenant_id: tenant.user.tenant_id, email: tenant.user.email }))
        this.store.dispatch(new SetIsIdentified(true))

        let obj = {
          user: {
            isDarkMode: true,
            email: tenant.user.email,
            tenant_id: tenant.user.tenant_id
          }
        }

        this.idbCrudService.clear('prefs')
        this.idbCrudService.put('prefs', obj)

        this.successService.popSnackbar('Sign in successful.')

        this.formService.getForms({ email: tenant.user.email }).subscribe((forms: any) => {
          let cloudForms: any[] = []
          forms.forEach((ele: any) => {
            cloudForms.push(ele.form)
          })
          this.store.dispatch(new SetCloudForms(cloudForms))
        })
      }
      else this.errorService.popSnackbar('Authentication error.')

      this.store.dispatch(new SetPage('library'))
    })
  }

  close() {
    this.store.dispatch(new SetPage('library'))
  }

  forgotPasswordEmail() {
    let obj = {
      email: this.signinForm.controls['email'].value,
      url: this.redirectForgotPasswordUrl
    }
    if (obj.email !== null)
      this.emailService.forgotPassword(obj).subscribe(() => {
        this.successService.popSnackbar('Email Sent.')
      })
    else this.errorService.popSnackbar('Please Enter a Valid Email.')
  }

}
