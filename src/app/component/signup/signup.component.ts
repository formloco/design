import { Component } from '@angular/core'

import { MatBottomSheetRef } from '@angular/material/bottom-sheet'

import { FormBuilder, FormGroup, Validators } from "@angular/forms"

import { IdbCrudService } from "../../service-idb/idb-crud.service"
import { environment } from '../../../environments/environment'
import { MatBottomSheet } from '@angular/material/bottom-sheet'
// import { AppService } from "../../../service/app.service"
// import { AuthService } from "../../../service/auth.service"

import { Store, Select } from '@ngxs/store'

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent {


  logo = environment.logo
  linkedinUrl = environment.linkedinUrl
  githubUrl = environment.githubUrl
  kioskeEmail = environment.kioskeEmail
  homeUrl = environment.homeUrl

  emailSignupForm: FormGroup
  forgotPasswordForm: FormGroup

  constructor(
    private store: Store,
    private fb: FormBuilder,
    private idbCrudService: IdbCrudService,
    public matBottomSheetRef: MatBottomSheetRef<SignupComponent>) { 
      this.emailSignupForm = this.fb.group({
        email: ['', Validators.compose([Validators.required, Validators.email])],
        password: ['', Validators.required]
      })
      this.forgotPasswordForm = this.fb.group({
        email: ['', Validators.compose([Validators.required, Validators.email])]
      })
    }

    close() {
      this.matBottomSheetRef.dismiss()
    }

  signupEmail() {
    window.location.href = this.homeUrl+'e93f63d8e62d44da93009229f8a7f890'
    // this.authService.signupEmail(obj).subscribe(auth => {
    //   this.auth = auth
    //   this.emailWelcome()
    //   if (this.auth.message === 'Signup sucessful.')
    //     this.setSession(provider)
    //   else
    //     this.errorService.popSnackbar(this.auth.message)
    // })

  }

  emailWelcome() {
    // this.emailService.signup({ email: this.auth.user.email }).subscribe(res => {
      
    // })
  }
  

}
