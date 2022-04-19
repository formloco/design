import { Injectable } from '@angular/core'

import { HttpClient } from '@angular/common/http'

import { environment } from '../../environments/environment'

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  authUrl = environment.authUrl

  constructor(private http: HttpClient) { }

  token() {
    return this.http.get(this.authUrl+'token/')
  }

  signupEmail(obj: any) {
    return this.http.post(this.authUrl+'email/', obj)
  }

  signinEmail(obj: any) {
    return this.http.post(this.authUrl, obj)
  }

}
