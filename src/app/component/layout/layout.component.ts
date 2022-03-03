import { Component, OnInit } from '@angular/core'

import { Observable } from 'rxjs'
import { Store, Select } from '@ngxs/store'

import { AuthState } from '../../state/auth/auth.state'
import { DeviceState } from '../../state/device/device.state'

import { IdbCrudService } from "../../service-idb/idb-crud.service"
import { SetForms } from '../canvas/state/canvas-state.actions'

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {

  prefs:any

  @Select(AuthState.page) page$!: Observable<string>
  @Select(DeviceState.background) background$!: Observable<string>
  @Select(DeviceState.screenWidth) screenWidth$!: Observable<string>

  constructor(
    private store: Store,
    private idbCrudService: IdbCrudService) { }

  ngOnInit(): void {
    this.idbCrudService.readAll('form').subscribe(forms => {
      this.store.dispatch(new SetForms(forms))
    })
  }

}
