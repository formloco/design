import { Component, Input, OnInit } from '@angular/core'

import { Store } from '@ngxs/store'
import { MatBottomSheetRef } from '@angular/material/bottom-sheet'
import { FormBuilder, Validators, FormGroup } from '@angular/forms'

import { FontClasses } from "../../../constants/label"

import { DesignService } from "../../../service/design.service"
import { CanvasState } from '../../canvas/state/canvas.state'

@Component({
  selector: 'app-label-details',
  templateUrl: './label-details.component.html',
  styleUrls: ['./label-details.component.scss']
})
export class LabelDetailsComponent implements OnInit {

  index!: number

  labelForm: FormGroup

  isForm: boolean = false
  fontClasses = FontClasses

  constructor(
    private store: Store,
    private fb: FormBuilder,
    public designService: DesignService,
    public matBottomSheetRef: MatBottomSheetRef<LabelDetailsComponent>) {
    this.labelForm = this.fb.group({
      label: [null, Validators.required],
      fontValue: [null]
    })
  }

  ngOnInit() {
    this.store.select(CanvasState.currentIndex).subscribe(index => {
      this.index = index
      this.labelForm.setValue({
        label: this.designService.canvasFormControls.details[this.index].label,
        fontValue: this.designService.canvasFormControls.details[this.index].fontValue
      })
    })
  }
  
  setLabel() {
    this.designService.canvasFormControls.details[this.index].label = this.labelForm.controls['label'].value
  }

  setFont() {
    this.designService.canvasFormControls.details[this.index].fontValue = this.labelForm.controls['fontValue'].value
  }

  deleteControl() {
    this.designService.deleteControl(this.index)
  }

  close() {
    this.matBottomSheetRef.dismiss()
  }

}
