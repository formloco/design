import { Component, Input, OnInit } from '@angular/core'

import { CdkDragDrop, moveItemInArray, copyArrayItem } from '@angular/cdk/drag-drop'

import { SetIsSave } from './state/canvas-state.actions'
import { CanvasState } from '../canvas/state/canvas.state'

import { Store } from '@ngxs/store'

import { DesignService } from "../../service/design.service"
import { DesignerControlService } from "../../service/designer-control.service"

@Component({
  selector: 'app-canvas',
  templateUrl: './canvas.component.html',
  styleUrls: ['./canvas.component.scss']
})
export class CanvasComponent implements OnInit {

  @Input() connectedTo: any

  form: any


  constructor(
    private store: Store,
    public designService: DesignService,
    public designerControlService: DesignerControlService) {
  }

  ngOnInit() {
    this.store.select(CanvasState.formObject).subscribe((formObj: any) => {
      console.log(formObj)
      if (formObj) {
        this.designService.canvasFormControls.details = formObj.details

        formObj.details.forEach((detail: any) => {
          this.designService.controls.push(detail.type)
        })
        console.log(this.designService.controls)
      }
    })
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

    let details: any = []
    this.designService.controls.forEach(control => {
      let detail = this.designService.canvasFormControls.details.filter((detail: any) => detail.type == control)
      details.push(detail[0])
    })
    this.designService.canvasFormControls.details = details
  }

}
