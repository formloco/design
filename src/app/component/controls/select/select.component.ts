import { Component, Input, OnChanges } from '@angular/core'

import { Store } from '@ngxs/store'
import { SetCurrentIndex } from '../../canvas/state/canvas-state.actions'

import { MatBottomSheet } from '@angular/material/bottom-sheet'
import { DesignService } from "../../../service/design.service"
import { SelectDetailsComponent } from "../../details/select-details/select-details.component"

@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss']
})
export class SelectComponent implements OnChanges {

  @Input() index: any

  constructor(
    private store: Store,
    private bottomSheet: MatBottomSheet,
    public designService: DesignService) { }

  ngOnChanges() {
    console.log(this.designService.canvasFormControls.details[this.index].multiple)
    // if (this.designService.canvasFormControls.details[this.index].list !== 'none')
      // this.designService.getList(this.index)
  }

  openDetails() {
    this.store.dispatch(new SetCurrentIndex(this.index))
    this.bottomSheet.open(SelectDetailsComponent)
  }

}
