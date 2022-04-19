import { Injectable } from '@angular/core'

import { HttpClient } from '@angular/common/http'

import { environment } from '../../environments/environment'

@Injectable({
  providedIn: 'root'
})
export class EmailService {

  emailUrl = environment.emailUrl

  constructor(private http: HttpClient) { }

  forgotPassword(obj: any) {
    return this.http.post(this.emailUrl + 'forgot/password/', obj)
  }

}
