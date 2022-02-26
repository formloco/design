import { Component, OnInit } from '@angular/core'

import { Store } from '@ngxs/store'
import { CanvasState } from '../../canvas/state/canvas.state'
import { MatBottomSheetRef } from '@angular/material/bottom-sheet'

import { FormBuilder, Validators, FormGroup, FormArray, FormControl } 
from '@angular/forms'

import { MatTableDataSource } from '@angular/material/table'

import { DesignService } from "../../../service/design.service"

import { IdbCrudService } from "../../../service-idb/idb-crud.service"

import { Appearances } from "../../../constants/textbox"

@Component({
  selector: 'app-select-details',
  templateUrl: './select-details.component.html',
  styleUrls: ['./select-details.component.scss']
})
export class SelectDetailsComponent implements OnInit {

  index!: number
  
  selectArray!: []
  allData!: any
  count!: number
  selectRequired!: boolean
  arrayControl: any

  appearances = Appearances

  selectedList = new FormControl()
  selectForm: FormGroup

  dataSource = new MatTableDataSource()

  displayedColumns: string[] = ['id']

  defautSelectArray = [
    {
      label: "Option 1",
      value: "1"
    },
    {
      label: "Option 2",
      value: "2"
    }
  ]

  constructor(
    private store: Store,
    private fb: FormBuilder,
    public designService: DesignService,
    private idbCrudService: IdbCrudService,
    public matBottomSheetRef: MatBottomSheetRef<SelectDetailsComponent>) {
    this.selectForm = this.fb.group({
      appearance: [null, Validators.required],
      required:   [null, Validators.required],
      multiple:   [null, Validators.required],
      label:      [null, Validators.required],
      error:      [null, Validators.required],
      list:       [null],
      selectArray: this.fb.array([])
    })
  }

  ngOnInit() {
    this.store.select(CanvasState.currentIndex).subscribe(index => {
      this.index = index
       
      this.selectForm.patchValue({
        appearance: this.designService.canvasFormControls.details[this.index].appearance,
        required: this.designService.canvasFormControls.details[this.index].required,
        multiple: this.designService.canvasFormControls.details[this.index].multiple,
        label: this.designService.canvasFormControls.details[this.index].label,
        error: this.designService.canvasFormControls.details[this.index].error,
        list: [],
        selectArray: []
      })
      if (this.designService.canvasFormControls.details[this.index].required === true)
        this.selectRequired = true
      else
        this.selectRequired = false
      
      this.selectArray = this.designService.canvasFormControls.details[this.index].selectArray

      this.getDetailForm()
    })
  }

  getDetailForm() {
    let control = <FormArray>this.selectForm.controls.selectArray
    control.clear()
    this.selectArray.forEach((element: any) => {
      control.push(this.fb.group({ 
        value: element.value })
      )
    })
  }

  add() {
    if (this.designService.canvasFormControls.details[this.index].selectArray) {
      this.count = this.designService.canvasFormControls.details[this.index].selectArray.length
      this.count = this.count + 1
    }
    else this.count = 1
      this.designService.canvasFormControls.details[this.index].selectArray.push({
        value: "Option " + this.count
      })
    this.getDetailForm()
  }

  delete(index: number) {
    this.designService.canvasFormControls.details[this.index].selectArray.splice(index,1)
    this.getDetailForm()
  }

  deleteControl() {
    this.designService.deleteControl(this.index)
  }

  setRequired(value: any) {
    if (value === true)
      this.selectRequired = true
    else
      this.selectRequired = false
    this.designService.canvasFormControls.details[this.index].required = this.selectRequired
  }

  setMultiple(value: boolean) {
    this.designService.canvasFormControls.details[this.index].multiple = value
  }

  setLabel() {
    this.designService.canvasFormControls.details[this.index].label = this.selectForm.controls['label'].value    
  }

  setError() {
    this.designService.canvasFormControls.details[this.index].error = this.selectForm.controls['error'].value    
  }

  setAppearance() {
    this.designService.canvasFormControls.details[this.index].appearance = this.selectForm.controls['appearance'].value
  }

  setValue(index: number) {
    this.designService.canvasFormControls.details[this.index].selectArray[index].value
        = this.selectForm.controls.selectArray.value
  }

  close() {
    this.matBottomSheetRef.dismiss()
  }

}
