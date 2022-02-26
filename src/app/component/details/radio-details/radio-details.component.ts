import { Component, OnInit } from '@angular/core'

import { Store } from '@ngxs/store'
import { CanvasState } from '../../canvas/state/canvas.state'
import { MatBottomSheetRef } from '@angular/material/bottom-sheet'

import { FormBuilder, Validators, FormGroup, FormArray } from '@angular/forms'

import { DesignService } from "../../../service/design.service"

@Component({
  selector: 'app-radio-details',
  templateUrl: './radio-details.component.html',
  styleUrls: ['./radio-details.component.scss']
})
export class RadioDetailsComponent implements OnInit {

  index!: number

  radioArray!: []
  count!: number
  radioRequired!: boolean
  isDetail: boolean = false

  radioForm: FormGroup

  constructor(
    private store: Store,
    private fb: FormBuilder,
    public designService: DesignService,
    public matBottomSheetRef: MatBottomSheetRef<RadioDetailsComponent>) {
    this.radioForm = this.fb.group({
      label:      [null, Validators.required],
      required:   [null, Validators.required],
      error:      [null, Validators.required],
      radioArray: this.fb.array([])
    })
  }

  ngOnInit() {
    this.store.select(CanvasState.currentIndex).subscribe(index => {
      this.index = index
      this.radioForm.patchValue({
        label: this.designService.canvasFormControls.details[this.index].label,
        error: this.designService.canvasFormControls.details[this.index].error,
        required: this.designService.canvasFormControls.details[this.index].required,
        radioArray: []
      })
      if (this.designService.canvasFormControls.details[this.index].required === true)
        this.radioRequired = true
      else
        this.radioRequired = false

      this.radioArray = this.designService.canvasFormControls.details[this.index].radioArray
      this.getDetailForm()
    })
  }

  getDetailForm() {
    let control = <FormArray>this.radioForm.controls.radioArray
    control.clear()
    this.radioArray.forEach((element: any) => {
      control.push(this.fb.group({ 
        label: element.label, 
        value: element.value,
        labelPosition: element.labelPosition 
      }))
    })
    this.isDetail = true
  }

  add() {
    if (this.designService.canvasFormControls.details[this.index].radioArray) {
      this.count = this.designService.canvasFormControls.details[this.index].radioArray.length
      this.count = this.count + 1
    }
    else this.count = 1
      this.designService.canvasFormControls.details[this.index].radioArray.push({
        label: "Option " + this.count,
        value: this.count,
        labelPosition: "after"
      })
    this.getDetailForm()
  }

  delete(index: number) {
    this.designService.canvasFormControls.details[this.index].radioArray.splice(index,1)
    this.getDetailForm()
  }

  deleteControl() {
    this.designService.deleteControl(this.index)
  }

  updateRadio() {
    this.designService.canvasFormControls.details[this.index].radioArray = this.radioForm.controls.radioArray.value
  }

  setRequired(value: any) {
    if (value === true)
      this.radioRequired = true
    else
      this.radioRequired = false
      this.designService.canvasFormControls.details[this.index].required = this.radioRequired
  }

  setLabel() {
    this.designService.canvasFormControls.details[this.index].label = this.radioForm.controls['label'].value
  }

  setError() {
    this.designService.canvasFormControls.details[this.index].error = this.radioForm.controls.error.value
  }

  close() {
    this.matBottomSheetRef.dismiss()
  }
  
}

