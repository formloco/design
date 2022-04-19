import { Component } from '@angular/core'

import { FormBuilder, FormGroup, Validators } from "@angular/forms"

import { IdbCrudService } from "../../service-idb/idb-crud.service"
import { environment } from '../../../environments/environment'

import { AuthService } from "../../service/auth.service"
import { FormService } from "../../service/form.service"
import { ErrorService } from "../../service/error.service"
import { DesignService } from "../../service/design.service"

import { Store, Select } from '@ngxs/store'
import { AuthState } from '../../state/auth/auth.state'
import { Form } from "../../state/auth/auth-state.model"
import { SetPage, SetTenant, SetForms } from '../../state/auth/auth-state.actions'

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent {

  auth: any
  // formObj: Form
  notContinue = true
  terms = false
  subscription = false

  logo = environment.logo
  linkedinUrl = environment.linkedinUrl
  githubUrl = environment.githubUrl
  kioskeEmail = environment.kioskeEmail

  emailSignupForm: FormGroup
  forgotPasswordForm: FormGroup

  constructor(
    private store: Store,
    private fb: FormBuilder,
    private authService: AuthService,
    private formService: FormService,
    private errorService: ErrorService,
    private designService: DesignService,
    private idbCrudService: IdbCrudService) {
    this.emailSignupForm = this.fb.group({
      email: ['', Validators.compose([Validators.required, Validators.email])],
      password: ['', Validators.required]
    })
  }

  close() {
    this.store.dispatch(new SetPage('library'))
  }

  signupEmail() {
    const signupObj = this.emailSignupForm.value
    this.authService.signupEmail(signupObj).subscribe((auth: any) => {
      this.auth = auth

      this.store.dispatch(new SetTenant({tenant_id: this.auth.tenant_id, email: signupObj.email}))

      if (this.auth.message === 'Signup sucessful.') {
        this.designService.formObj.is_published = true
        this.idbCrudService.put('form', this.designService.formObj).subscribe(_ => {})
        this.idbCrudService.readAll('form').subscribe((forms: any) => {
          this.store.dispatch(new SetForms(forms))
          this.store.dispatch(new SetPage('library'))
        })

        const formObj = {
          form_id: this.designService.formObj.form_id,
          name: this.designService.formObj.name,
          type: 'dynamic',
          form: this.designService.formObj,
          is_data: false,
          is_published: true,
          is_deployed: false,
          is_list: false,
          user_created: {email: signupObj.email, date_created: new Date}
        }
        
        this.formService.create(formObj).subscribe(_ => {
          const obj = {
            user: {
              isDarkMode: true,
              email: signupObj.email,
              tenant_id: this.auth.tenant_id
            }
          }
          this.idbCrudService.clear('prefs')
          this.idbCrudService.put('prefs', obj)
        })
        // this.emailService.signup({ email: signupObj.email }).subscribe(_ => {})
      }
      else this.errorService.popSnackbar(this.auth.message)
    })
  }

  checkTerms(terms: any) {
    this.terms = terms
    if (!this.terms) this.notContinue = true
    else this.notContinue = false
  }

  selectSubscription() {
    if (this.terms) this.notContinue = false
    else this.notContinue = true
  }

}
