import { Component, Input, OnInit, Inject } from '@angular/core'

import { Store } from '@ngxs/store'
import { CanvasState } from '../../canvas/state/canvas.state'

import { FormBuilder, Validators, FormGroup, FormControl } from '@angular/forms'
import { MatBottomSheetRef } from '@angular/material/bottom-sheet'

import { Appearances, Types } from "../../../constants/textbox"

import { DesignService } from "../../../service/design.service"

@Component({
  selector: 'app-textbox-details',
  templateUrl: './textbox-details.component.html',
  styleUrls: ['./textbox-details.component.scss']
})
export class TextboxDetailsComponent implements OnInit {

  index!: number
  textboxForm: FormGroup

  appearances = Appearances
  types = Types
  textboxRequired!: boolean

  constructor(
    private store: Store,
    private fb: FormBuilder,
    public designService: DesignService,
    public matBottomSheetRef: MatBottomSheetRef<TextboxDetailsComponent>) {
    this.textboxForm = this.fb.group({
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
      this.textboxForm.patchValue({
        appearance: this.designService.canvasFormControls.details[this.index].appearance,
        error: this.designService.canvasFormControls.details[this.index].error,
        label: this.designService.canvasFormControls.details[this.index].label,
        placeholder: this.designService.canvasFormControls.details[this.index].placeholder,
        required: this.designService.canvasFormControls.details[this.index].required,
        types: this.designService.canvasFormControls.details[this.index].types
      })
      if (this.designService.canvasFormControls.details[this.index].required === true)
        this.textboxRequired = true
      else
        this.textboxRequired = false
    })
    
  }

  setAppearance() {
    this.designService.canvasFormControls.details[this.index].appearance = this.textboxForm.controls['appearance'].value
  }

  setTypes() {
    this.designService.canvasFormControls.details[this.index].types = this.textboxForm.controls['types'].value
  }

  setLabel() {
    this.designService.canvasFormControls.details[this.index].label = this.textboxForm.controls['label'].value
  }

  setPlaceholder() {
    this.designService.canvasFormControls.details[this.index].placeholder = this.textboxForm.controls['placeholder'].value
  }

  setError() {
    this.designService.canvasFormControls.details[this.index].error = this.textboxForm.controls['error'].value
  }

  setRequired(value: boolean) {
    if (value === true)
      this.textboxRequired = true
    else
      this.textboxRequired = false

    this.designService.canvasFormControls.details[this.index].required = this.textboxRequired
  }

  close() {
    this.matBottomSheetRef.dismiss()
  }

}
