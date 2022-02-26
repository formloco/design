import { Component, OnInit } from '@angular/core'

import { Observable } from 'rxjs'

// import * as _ from 'lodash'

import { ActivatedRoute, Params } from '@angular/router'

import { Store, Select } from '@ngxs/store'

import { AuthState } from '../../state/auth/auth.state'
import { DeviceState } from '../../state/device/device.state'

import { SetPage } from '../../state/auth/auth-state.actions'

import { environment } from '../../../environments/environment'

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

  constructor(private store: Store) { }

  ngOnInit(): void {
    
  }

}
