import { Component, OnInit } from '@angular/core'

import * as _ from 'lodash'
import { Observable } from 'rxjs'
import { Store, Select } from '@ngxs/store'
import { ActivatedRoute, Router } from '@angular/router'

import { AuthState } from '../../state/auth/auth.state'
import { DeviceState } from '../../state/device/device.state'

import { IdbCrudService } from "../../service-idb/idb-crud.service"
import { FormService } from "../../service/form.service"
import { SetForms } from '../canvas/state/canvas-state.actions'
import { SetTenant } from '../../state/auth/auth-state.actions'
@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {

  prefs: any

  @Select(AuthState.page) page$!: Observable<string>
  @Select(DeviceState.background) background$!: Observable<string>
  @Select(DeviceState.screenWidth) screenWidth$!: Observable<string>

  constructor(
    private store: Store,
    private router: Router,
    private route: ActivatedRoute,
    private formService: FormService,
    private idbCrudService: IdbCrudService) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id')
    const email = this.route.snapshot.paramMap.get('email')
   
    if (id && email) {
      this.store.dispatch(new SetTenant({ tenant_id: id, email: email }))

      const obj = {
        user: {
          isDarkMode: true,
          email: email,
          tenant_id: id
        }
      }
      this.idbCrudService.clear('prefs')
      this.idbCrudService.put('prefs', obj)
      this.idbCrudService.readAll('form').subscribe(forms => {
        this.store.dispatch(new SetForms(forms))
      })
    }
    // this route does not set tenant so home button
    // returns to kioske main page, otherwise home goes
    // to tenant forms page
    else if (this.router.url === '/kioske/true') {} 
    else {
      this.idbCrudService.readAll('prefs').subscribe((prefs: any) => {
        if (prefs.length > 0) {
          this.store.dispatch(new SetTenant({ tenant_id: prefs[0]['user'].tenant_id, email: prefs[0]['user'].email }))
          this.formService.getForms({ email: prefs[0]['user'].email }).subscribe((forms: any) => {
            let cloudForms: any[] = []
            forms.forEach((ele: any) => {
              cloudForms.push(ele.form)
            })
            this.idbCrudService.readAll('form').subscribe((forms: any) => {
              forms.forEach((form: any) => {
                let formClone = _.cloneDeep(form)
                let cloudForm = cloudForms.find(f => f.form_id === form.form_id)
                if (cloudForm !== undefined) {
                  formClone['date_archived'] = cloudForm['date_archived']
                  formClone['user_archived'] = cloudForm['user_archived']
                  formClone['is_deployed'] = cloudForm['is_deployed']
                  this.idbCrudService.put('form', formClone)
                }
              })
              this.idbCrudService.readAll('form').subscribe((forms: any) => {
                this.store.dispatch(new SetForms(forms))
              })
            })
          })
        }
      })
    }
  }

}
