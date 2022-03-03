import { Injectable } from '@angular/core'

import { Store } from '@ngxs/store'
import { SetIsSave } from '../component/canvas/state/canvas-state.actions'

import { IdbCrudService } from "../service-idb/idb-crud.service"

@Injectable({
  providedIn: 'root'
})
export class DesignService {

  public formId: any
  public formObj: any

  controls: string[] = []
  public currentIndex: number = 0
  public canvasFormControls: any

  // public detailArray = []
  // public controlArray = []

  constructor(
    private store: Store,
    private idbCrudService: IdbCrudService) { }

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
