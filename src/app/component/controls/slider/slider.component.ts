import { Component, Input } from '@angular/core'

import { Store } from '@ngxs/store'
import { SetCurrentIndex } from '../../canvas/state/canvas-state.actions'

import { MatBottomSheet } from '@angular/material/bottom-sheet'
import { DesignService } from "../../../service/design.service"
import { SliderDetailsComponent } from "../../details/slider-details/slider-details.component"

@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.scss']
})
export class SliderComponent {

  @Input() index: any

  constructor(
    private store: Store,
    private bottomSheet: MatBottomSheet,
    public designService: DesignService) { }

  openDetails() {
    this.store.dispatch(new SetCurrentIndex(this.index))
    this.bottomSheet.open(SliderDetailsComponent)
  }

}
