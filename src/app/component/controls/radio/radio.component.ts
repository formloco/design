import { Component, Input } from '@angular/core'

import { Store } from '@ngxs/store'
import { SetCurrentIndex } from '../../canvas/state/canvas-state.actions'

import { MatBottomSheet } from '@angular/material/bottom-sheet'
import { DesignService } from "../../../service/design.service"
import { RadioDetailsComponent } from "../../details/radio-details/radio-details.component"

@Component({
  selector: 'app-radio',
  templateUrl: './radio.component.html',
  styleUrls: ['./radio.component.scss']
})
export class RadioComponent {

  @Input() index: any

  control: any

  constructor(
    private store: Store,
    private bottomSheet: MatBottomSheet,
    public designService: DesignService) { }

    openDetails() {
      this.store.dispatch(new SetCurrentIndex(this.index))
      this.bottomSheet.open(RadioDetailsComponent)
    }
    
}
