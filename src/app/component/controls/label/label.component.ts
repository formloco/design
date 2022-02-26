import { Component, Input } from '@angular/core'

import { Store } from '@ngxs/store'
import { SetCurrentIndex } from '../../canvas/state/canvas-state.actions'

import { MatBottomSheet } from '@angular/material/bottom-sheet'
import { DesignService } from "../../../service/design.service"
import { LabelDetailsComponent } from "../../details/label-details/label-details.component"

@Component({
  selector: 'app-label',
  templateUrl: './label.component.html',
  styleUrls: ['./label.component.scss']
})
export class LabelComponent {

  @Input() index: any

  control: any
  
  constructor(
    private store: Store,
    private bottomSheet: MatBottomSheet,
    public designService: DesignService) { }

  openDetails() {
    this.store.dispatch(new SetCurrentIndex(this.index))
    this.bottomSheet.open(LabelDetailsComponent)
  }

}
