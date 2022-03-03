import { Component, Input, OnInit, Inject } from '@angular/core'

import { Store } from '@ngxs/store'
import { FormBuilder, Validators, FormGroup, FormArray } from '@angular/forms'
import { MatBottomSheetRef } from '@angular/material/bottom-sheet'

import { CanvasState } from '../../canvas/state/canvas.state'
import { DesignService } from "../../../service/design.service"

@Component({
  selector: 'app-checkbox-details',
  templateUrl: './checkbox-details.component.html',
  styleUrls: ['./checkbox-details.component.scss']
})
export class CheckboxDetailsComponent implements OnInit {

  index!: number
  count!: number
  control!: any
  checkboxArray!: []
  checkboxRequired = Array()
  checkboxForm: FormGroup
  isDetail: boolean = false

  constructor(
    private store: Store,
    private fb: FormBuilder,
    public designService: DesignService,
    public matBottomSheetRef: MatBottomSheetRef<CheckboxDetailsComponent>) {
    this.checkboxForm = this.fb.group({
      label: ['', Validators.required],
      checkboxArray: this.fb.array([])
    })
  }

  ngOnInit() {
    this.store.select(CanvasState.currentIndex).subscribe(index => {
      this.index = index
      this.checkboxForm.patchValue({
        label: this.designService.canvasFormControls.details[this.index].label,
        checkboxArray: []
      })

      this.checkboxArray = this.designService.canvasFormControls.details[this.index].checkboxArray
      this.getDetailForm()
    })
  }

  getDetailForm() {
    this.control = <FormArray>this.checkboxForm.controls.checkboxArray
    this.control.clear()
    this.checkboxArray.forEach((element: any) => {
      this.control.push(this.fb.group({
        label: element.label,
        labelPosition: element.labelPosition,
        required: element.required,
        error: element.error
      }))
    })

    this.isDetail = true
  }

  add() {
    if (this.designService.canvasFormControls.details[this.index].checkboxArray) {
      this.count = this.designService.canvasFormControls.details[this.index].checkboxArray.length
      this.count = this.count + 1
    }
    else this.count = 1
    this.designService.canvasFormControls.details[this.index].checkboxArray.push({
      label: "Checkbox " + this.count,
      labelPosition: "after",
      formControlName: "checkbox" + this.index + this.count,
      required: false
    })

    this.checkboxArray = this.designService.canvasFormControls.details[this.index].checkboxArray

    this.getDetailForm()
  }

  delete() {
    this.designService.canvasFormControls.details[this.index].checkboxArray.splice(this.index, 1)
    this.getDetailForm()
  }

  deleteControl() {
    this.designService.deleteControl(this.index)
  }

  setLabel() {
    this.designService.canvasFormControls.details[this.index].label
      = this.checkboxForm.controls['label'].value
  }

  updateCheckbox() {
    this.designService.canvasFormControls.details[this.index].checkboxArray
      = this.checkboxForm.controls['checkboxArray'].value
  }

  setError() {
    this.designService.canvasFormControls.details[this.index].checkboxArray[this.index].error
      = this.checkboxForm.controls["checkboxArray"].value
  }

  setRequired(value: any, index: number) {
    if (value) this.checkboxRequired.push(index)
    else {
      const indexToDelete = this.checkboxRequired.indexOf(index)
      this.checkboxRequired.splice(indexToDelete,1)
    }
    this.designService.canvasFormControls.details[this.index].checkboxArray[index].required = value
  }

  close() {
    this.matBottomSheetRef.dismiss()
  }
}

