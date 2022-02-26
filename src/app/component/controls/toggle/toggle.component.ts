import { Component, Input } from '@angular/core'

import { Store } from '@ngxs/store'
import { SetCurrentIndex } from '../../canvas/state/canvas-state.actions'

import { MatBottomSheet } from '@angular/material/bottom-sheet'
import { ToggleDetailsComponent } from "../../details/toggle-details/toggle-details.component"
import { DesignService } from "../../../service/design.service"

@Component({
  selector: 'app-toggle',
  templateUrl: './toggle.component.html',
  styleUrls: ['./toggle.component.scss']
})
export class ToggleComponent {

  @Input() index: any

  constructor(
    private store: Store,
    private bottomSheet: MatBottomSheet,
    public designService: DesignService) { }

  openDetails() {
    this.store.dispatch(new SetCurrentIndex(this.index))
    this.bottomSheet.open(ToggleDetailsComponent)
  }

}
