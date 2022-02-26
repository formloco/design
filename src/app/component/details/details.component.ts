import { Component, Input, OnChanges, Inject } from '@angular/core'

import { MAT_BOTTOM_SHEET_DATA, MatBottomSheetRef } from '@angular/material/bottom-sheet'

import { DesignService } from "../../service/design.service"

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnChanges {

  @Input() index!: number
  
  type!: null

  constructor(
    public designService: DesignService,
    @Inject(MAT_BOTTOM_SHEET_DATA) public data: any,
    public matBottomSheetRef: MatBottomSheetRef<DetailsComponent>) { }

  ngOnChanges() {
    this.type = this.designService.canvasFormControls.controls[this.index].type;
    console.log(this.type)
    console.log('got here')
  }

  close() {
    this.matBottomSheetRef.dismiss()
  }

}
