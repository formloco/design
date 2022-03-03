import { Component, OnInit } from '@angular/core'

import { Observable } from 'rxjs'
import { MatBottomSheet } from '@angular/material/bottom-sheet'

import { Store, Select } from '@ngxs/store'
import { SetPage, SetPageLabel } from '../../state/auth/auth-state.actions'

import { DesignService } from "../../service/design.service"
import { environment } from '../../../environments/environment'

import { CanvasState } from '../canvas/state/canvas.state'
import { SetCurrentIndex, SetFormObject, SetIsSave } from '../canvas/state/canvas-state.actions'

import { SignupComponent } from "../signup/signup.component"

@Component({
  selector: 'app-library',
  templateUrl: './library.component.html',
  styleUrls: ['./library.component.scss']
})
export class LibraryComponent implements OnInit {

  @Select(CanvasState.forms) forms$!: Observable<any>

  kioske = environment.kioske
  version = environment.version
  homeUrl = environment.homeUrl

  constructor(
    private store: Store,
    private bottomSheet: MatBottomSheet,
    public designService: DesignService) { }

  ngOnInit(): void {
  
  }
  
  create() {
    this.store.dispatch(new SetFormObject(undefined))
    this.store.dispatch(new SetPage('design'))
    this.store.dispatch(new SetPageLabel('Create'))
  }

  edit(idx: any, formObj: any) {
    this.store.dispatch(new SetCurrentIndex(idx))
    this.store.dispatch(new SetFormObject(formObj))
    this.store.dispatch(new SetIsSave(true))
    this.store.dispatch(new SetPage('design'))
    this.store.dispatch(new SetPageLabel('Edit'))
  }
  admin() {}

  signup() {
    this.bottomSheet.open(SignupComponent)
  }

  forms() {}
  
}
