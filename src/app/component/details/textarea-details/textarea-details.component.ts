import { Component, OnInit } from '@angular/core'

import { Store } from '@ngxs/store'
import { FormBuilder, Validators, FormGroup } from '@angular/forms'
import { MatBottomSheetRef } from '@angular/material/bottom-sheet'

import { Appearances, Types } from "../../../constants/textbox"
import { CanvasState } from '../../canvas/state/canvas.state'
import { DesignService } from "../../../service/design.service"

@Component({
  selector: 'app-textarea-details',
  templateUrl: './textarea-details.component.html',
  styleUrls: ['./textarea-details.component.scss']
})
export class TextareaDetailsComponent implements OnInit {

  index!: number

  textareaForm: FormGroup

  appearances = Appearances
  types = Types
  textareaRequired!: boolean

  constructor(
    private store: Store,
    private fb: FormBuilder,
    public designService: DesignService,
    public matBottomSheetRef: MatBottomSheetRef<TextareaDetailsComponent>) {
    this.textareaForm = this.fb.group({
      appearance: [null, Validators.required],
      error: [null, Validators.required],
      label: [null, Validators.required],
      placeholder: [null, Validators.required],
      required: [null, Validators.required],
      types: [null, Validators.required]
    })
  }

  ngOnInit() {
    this.store.select(CanvasState.currentIndex).subscribe(index => {
      this.index = index
      this.textareaForm.patchValue({
        appearance: this.designService.canvasFormControls.details[this.index].appearance,
        error: this.designService.canvasFormControls.details[this.index].error,
        label: this.designService.canvasFormControls.details[this.index].label,
        placeholder: this.designService.canvasFormControls.details[this.index].placeholder,
        required: this.designService.canvasFormControls.details[this.index].required,
        types: this.designService.canvasFormControls.details[this.index].types
      })
      if (this.designService.canvasFormControls.details[this.index].required === "true")
        this.textareaRequired = true
      else
        this.textareaRequired = false
    })
  }

  setAppearance() {
    this.designService.canvasFormControls.details[this.index].appearance
      = this.textareaForm.controls['appearance'].value
  }

  setTypes() {
    this.designService.canvasFormControls.details[this.index].types
      = this.textareaForm.controls['types'].value
  }

  setLabel() {
    this.designService.canvasFormControls.details[this.index].label
      = this.textareaForm.controls['label'].value
  }

  setPlaceholder() {
    this.designService.canvasFormControls.details[this.index].placeholder
      = this.textareaForm.controls['placeholder'].value
  }

  setError() {
    this.designService.canvasFormControls.details[this.index].error
      = this.textareaForm.controls['error'].value
  }

  setRequired(value: any) {
    if (value === true)
      this.textareaRequired = true
    else
      this.textareaRequired = false
    this.designService.canvasFormControls.details[this.index].required = this.textareaRequired
  }

  close() {
    this.matBottomSheetRef.dismiss()
  }

}