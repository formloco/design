import { Component, Input } from '@angular/core'

import { CdkDragDrop, moveItemInArray, copyArrayItem } from '@angular/cdk/drag-drop'

import { SetIsSave } from './state/canvas-state.actions'

import { Store } from '@ngxs/store'
import { environment } from '../../../environments/environment'

import { DesignService } from "../../service/design.service"
import { DesignerControlService } from "../../service/designer-control.service"

@Component({
  selector: 'app-canvas',
  templateUrl: './canvas.component.html',
  styleUrls: ['./canvas.component.scss']
})
export class CanvasComponent {
  
  @Input() connectedTo: any

  form: any
  tenantId = environment.tenantId

  constructor(
    private store: Store,
    public designService: DesignService,
    public designerControlService: DesignerControlService) {
  }

  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer.id === event.container.id) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex)
    } else {
      copyArrayItem(event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex)
      this.designerControlService.updateDetail(event.container.data, event.currentIndex)
    }
    
    this.store.dispatch(new SetIsSave(true))

    let details:any = []
    this.designService.controls.forEach(control =>{
      let detail = this.designService.canvasFormControls.details.filter((detail: any) => detail.type == control) 
      details.push(detail[0])
    })
    this.designService.canvasFormControls.details = details
  }

}
