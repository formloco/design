import { Component, Input } from '@angular/core'

import { Store } from '@ngxs/store'
import { SetCurrentIndex } from '../../canvas/state/canvas-state.actions'

import { MatBottomSheet } from '@angular/material/bottom-sheet'
import { DesignService } from "../../../service/design.service"
import { TextareaDetailsComponent } from "../../details/textarea-details/textarea-details.component"

@Component({
  selector: 'app-textarea',
  templateUrl: './textarea.component.html',
  styleUrls: ['./textarea.component.scss']
})
export class TextareaComponent {

  @Input() index: any

  control: any

  constructor(
    private store: Store,
    private bottomSheet: MatBottomSheet,
    public designService: DesignService) { }

  openDetails() {
    this.store.dispatch(new SetCurrentIndex(this.index))
    this.bottomSheet.open(TextareaDetailsComponent)
  }

}
