import { Component, Input, OnInit } from '@angular/core'

import { Store } from '@ngxs/store'
import { FormBuilder, Validators, FormGroup, FormArray } from '@angular/forms'
import { MatBottomSheetRef } from '@angular/material/bottom-sheet'

import { CanvasState } from '../../canvas/state/canvas.state'
import { DesignService } from "../../../service/design.service"
import { ThisReceiver } from '@angular/compiler'

@Component({
  selector: 'app-toggle-details',
  templateUrl: './toggle-details.component.html',
  styleUrls: ['./toggle-details.component.scss']
})
export class ToggleDetailsComponent implements OnInit {

  index!: any

  toggleArray!: []
  count!: number
  control!: any
  isDetail: boolean = false
  toggleRequired = Array()

  toggleForm: FormGroup

  constructor(
    private store: Store,
    private fb: FormBuilder,
    public designService: DesignService,
    public matBottomSheetRef: MatBottomSheetRef<ToggleDetailsComponent>) {
    this.toggleForm = this.fb.group({
      label: [null, Validators.required],
      toggleArray: this.fb.array([])
    })
  }

  ngOnInit() {
    this.store.select(CanvasState.currentIndex).subscribe(index => {
      this.index = index
      this.toggleForm.patchValue({
        label: this.designService.canvasFormControls.details[this.index].label,
        toggleArray: []
      })
      this.toggleArray = this.designService.canvasFormControls.details[this.index].toggleArray

      this.getDetailForm()
    })
  }

  getDetailForm() {
    this.control = <FormArray>this.toggleForm.controls.toggleArray
    this.control.clear()
    this.toggleArray.forEach((element: any) => {
      this.control.push(this.fb.group({ 
        label: element.label, 
        required: element.required,
        labelPosition: element.labelPosition,
        error: element.error
      }))
    })
    this.isDetail = true
  }

  add() {
    if (this.designService.canvasFormControls.details[this.index].toggleArray) {
      this.count = this.designService.canvasFormControls.details[this.index].toggleArray.length
      this.count = this.count + 1
    }
    else this.count = 1
      this.designService.canvasFormControls.details[this.index].toggleArray.push({
        label: "Toggle " + this.count,
        required: true,
        labelPosition: "after"
      })
    this.getDetailForm()
  }

  delete(index: number) {
    this.designService.canvasFormControls.details[this.index].toggleArray.splice(index,1)
    this.getDetailForm()
  }

  deleteControl() {
    this.designService.deleteControl(this.index)
  }

  setLabel() {
    this.designService.canvasFormControls.details[this.index].label = this.toggleForm.controls['label'].value
  }

  updateToggleArray() {
    this.designService.canvasFormControls.details[this.index].toggleArray = this.toggleForm.controls.toggleArray.value
  }

  setError(index: number) {
    this.designService.canvasFormControls.details[this.index].error = this.toggleForm.controls.toggleArray.value
  }

  setRequired(value: any, index: number) {
    if (value) this.toggleRequired.push(index)
    else {
      const indexToDelete = this.toggleRequired.indexOf(index)
      this.toggleRequired.splice(indexToDelete,1)
    }
    this.designService.canvasFormControls.details[this.index].toggleArray[index].required = value
  }

  close() {
    this.matBottomSheetRef.dismiss()
  }

}


