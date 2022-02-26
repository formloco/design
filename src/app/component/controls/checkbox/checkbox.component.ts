import { Component, Input } from '@angular/core'

import { Store } from '@ngxs/store'
import { SetCurrentIndex } from '../../canvas/state/canvas-state.actions'

import { MatBottomSheet } from '@angular/material/bottom-sheet'
import { CheckboxDetailsComponent } from "../../details/checkbox-details/checkbox-details.component"
import { DesignService } from "../../../service/design.service"

@Component({
  selector: 'app-checkbox',
  templateUrl: './checkbox.component.html',
  styleUrls: ['./checkbox.component.scss']
})
export class CheckboxComponent {

  @Input() index: any

  constructor(
    private store: Store,
    private bottomSheet: MatBottomSheet,
    public designService: DesignService) { }

    openDetails() {
      this.store.dispatch(new SetCurrentIndex(this.index))
      this.bottomSheet.open(CheckboxDetailsComponent)
    }
}
