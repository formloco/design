import { Component, OnInit } from '@angular/core'

// import { MatDialog, MatDialogRef, MatDialogConfig } from '@angular/material/dialog'

import { Store, Select } from '@ngxs/store'
import { SetPage, SetPageLabel } from '../../state/auth/auth-state.actions'
import { SetShowControls } from '../canvas/state/canvas-state.actions'

import { DesignService } from "../../service/design.service"
import { environment } from '../../../environments/environment'

@Component({
  selector: 'app-library',
  templateUrl: './library.component.html',
  styleUrls: ['./library.component.scss']
})
export class LibraryComponent implements OnInit {

  version = environment.version

  constructor(
    private store: Store,
    public designService: DesignService) { }

  ngOnInit(): void {
  
  }
  

  openForm(value:any) {
    this.designService.fileArray = []
    this.designService.detailArray = []
    this.designService.canvasFormControls = []
    this.designService.canvasFormControls.details = []
    this.store.dispatch(new SetPage('design'))
    this.store.dispatch(new SetPageLabel('Edit'))
    if (value === 'new') {
      this.store.dispatch(new SetShowControls(false))
      this.store.dispatch(new SetPageLabel('Create'))
    }
  }

  signin() {
    // const dialogConfig = new MatDialogConfig()
    // dialogConfig.height = '600px'
    // dialogConfig.width = '500px'
    // dialogConfig.data = {
    //   isSignin: true
    // }
    // const dialogRef = this.dialog.open(AuthComponent, dialogConfig)
    // dialogRef.afterClosed().subscribe(() => {
    //   // this.getUser()
    //   // this.appService.getForms()
    // })
  }

  signout() {
    // this.appService.authProvider = undefined
    // this.userName = undefined
    // this.appService.getForms()
  }

}
