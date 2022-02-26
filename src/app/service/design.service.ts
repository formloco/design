import { Injectable } from '@angular/core'

import { MatBottomSheet } from '@angular/material/bottom-sheet'
// import { MatDialog, MatDialogRef, MatDialogConfig } from '@angular/material/dialog'

import { Store } from '@ngxs/store'
import { SetCurrentIndex, SetIsSave } from '../component/canvas/state/canvas-state.actions'

import { IdbCrudService } from "../service-idb/idb-crud.service"
import { DetailsComponent } from "../component/details/details.component"

// import { ExportComponent } from '../component/dialogs/export/export.component'
// import { MessageComponent } from '../component/dialogs/message/message.component'

@Injectable({
  providedIn: 'root'
})
export class DesignService {

 public formId: any
 public formObj: any
//  public isDetails = false
//  public isListOpen = false
//  public isRightMenu = false
//  public isLookuplist = false
 
//  public showControls = true
//  public isPreview = false
//  public isDrag = false

 // drag'n drop
 controls: string[] = []
 public event: any //captures drag'n drop event
 public currentIndex: number = 0//current index for details and drag n drop
 public previousIndex!: number
 public canvasFormControls: any //current form controls
 
 public isExpandDetails: boolean = false
 // public currentQilllIndex

 public isFileUploadDisabled = false
 public isFileUploadRunning = false

 // run form
 public detailArray = []
 public controlArray = []
 public fileArray = [] //used to hold file content for attach files

 constructor(
  private store: Store,
   // private dialog: MatDialog,
   private bottomSheet: MatBottomSheet,
   private idbCrudService: IdbCrudService) { }

 selectDetails(index: number) {
   this.currentIndex = index
   this.bottomSheet.open(DetailsComponent)
  //  this.isRightMenu = true
  //  this.isDetails = true
  //  this.isLookuplist = false
  //  this.isExpandDetails = false
 }

 selectControlDetails(index: number) {
   this.currentIndex = index
  //  this.isRightMenu = true
  //  this.isDetails = true
  //  this.isLookuplist = false
  //  this.isExpandDetails = false
 }

 selectDetailsExpanded(index: number) {
   this.currentIndex = index
  //  this.isRightMenu = true
  //  this.isDetails = true
  //  this.isLookuplist = false
  //  this.isExpandDetails = true
 }

 toggleDetails(index: number) {
   this.currentIndex = index
  //  this.isDetails = !this.isDetails
 }

 deleteDetails() {
   this.deleteControl(this.currentIndex)
 }

 updateDetail(control: any, index: string | number) {
   this.canvasFormControls.controls[index] = control
 }

 deleteControl(idx: number) {
   this.controls.splice(idx, 1)
   this.canvasFormControls.details.splice(idx, 1)
  
   if (this.formId)
     this.idbCrudService.read('form', this.formId).subscribe(form => {
       this.formObj = form
       this.formObj.form = this.canvasFormControls
       this.formObj.date_last_access = new Date()
       this.idbCrudService.delete('form', this.formObj).subscribe()
     })

    if (this.canvasFormControls.length === 0) this.store.dispatch(new SetIsSave(false))
 }


}
