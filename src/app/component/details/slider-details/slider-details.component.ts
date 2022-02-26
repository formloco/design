import { Component, OnInit } from '@angular/core'

import { Store } from '@ngxs/store'
import { CanvasState } from '../../canvas/state/canvas.state'

import { FormBuilder, Validators, FormGroup, FormControl } from '@angular/forms'

import { DesignService } from "../../../service/design.service"

@Component({
  selector: 'app-slider-details',
  templateUrl: './slider-details.component.html',
  styleUrls: ['./slider-details.component.scss']
})
export class SliderDetailsComponent implements OnInit {

  index!: number

  sliderForm: FormGroup

  constructor(
    private store: Store,
    private fb: FormBuilder,
    public designService: DesignService) {
    this.sliderForm = this.fb.group({
      label: [null, Validators.required],
      value: [null, Validators.required],
      min: [null, Validators.required],
      max: [null, Validators.required],
      step: [null, Validators.required],
      interval: [null, Validators.required],
      thumbLabel: [null],
      invert: [null]
    })
  }

  ngOnInit() {
    this.store.select(CanvasState.currentIndex).subscribe(index => {
      this.index = index
      this.sliderForm.patchValue({
        label: this.designService.canvasFormControls.details[this.index].label,
        value: this.designService.canvasFormControls.details[this.index].value,
        min: this.designService.canvasFormControls.details[this.index].min,
        max: this.designService.canvasFormControls.details[this.index].max,
        step: this.designService.canvasFormControls.details[this.index].step,
        interval: this.designService.canvasFormControls.details[this.index].interval,
        thumbLabel: this.designService.canvasFormControls.details[this.index].thumbLabel,
        invert: this.designService.canvasFormControls.details[this.index].invert
      })
    })
  }

  setLabel() {
      this.designService.canvasFormControls.details[this.index].label = this.sliderForm.controls['label'].value
    }

  setValue() {
      this.designService.canvasFormControls.details[this.index].value = this.sliderForm.controls['value'].value    
    }

  setMin() {
      this.designService.canvasFormControls.details[this.index].min = this.sliderForm.controls['min'].value    
    }

  setMax() {
      this.designService.canvasFormControls.details[this.index].max = this.sliderForm.controls['max'].value    
    }

  setStep() {
      this.designService.canvasFormControls.details[this.index].step = this.sliderForm.controls['step'].value    
    }

  setInterval() {
      this.designService.canvasFormControls.details[this.index].interval = this.sliderForm.controls['interval'].value    
    }

  setThumb() {
      this.designService.canvasFormControls.details[this.index].label = this.sliderForm.controls['label'].value    
    }

  setInvert() {
      this.designService.canvasFormControls.details[this.index].invert = this.sliderForm.controls['invert'].value    
    }

  deleteControl() {
      this.designService.deleteControl(this.index)
    }

}
