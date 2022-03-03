import { Component, OnInit } from '@angular/core'
import { FormBuilder, Validators, FormGroup } from '@angular/forms'

import * as uuid from 'uuid'

import { Observable } from 'rxjs'

import { SetPage } from '../../state/auth/auth-state.actions'
import { SetCurrentIndex } from '../canvas/state/canvas-state.actions'

import { Store, Select } from '@ngxs/store'

import { environment } from '../../../environments/environment'

import { DesignService } from "../../service/design.service"
import { SuccessService } from "../../service/success.service"
import { IdbCrudService } from "../../service-idb/idb-crud.service"

import { CanvasState } from '../canvas/state/canvas.state'

import { ControlLabels, ControlIcons } from "../../constants/design"

@Component({
  selector: 'app-design',
  templateUrl: './design.component.html',
  styleUrls: ['./design.component.scss']
})
export class DesignComponent implements OnInit {

  @Select(CanvasState.isSave) isSave$!: Observable<any>

  isMenu = true
  canvasForm: FormGroup
  tenantId = environment.tenantId

  controls: string[] = []
  controlLabels = ControlLabels
  controlIcons = ControlIcons

  constructor(
    private store: Store,
    private fb: FormBuilder,
    public designService: DesignService,
    private successService: SuccessService,
    private idbCrudService: IdbCrudService) {
    this.canvasForm = this.fb.group({
      name: [null, Validators.required]
    })
  }

  ngOnInit() {
    this.designService.controls = []
    this.designService.canvasFormControls = []
    this.designService.canvasFormControls.details = []
    this.store.select(CanvasState.formObject).subscribe((formObj: any) => {
      if (formObj) {
        this.canvasForm.patchValue({name: formObj.name})
        this.designService.canvasFormControls.details = formObj.form.details
      }
    })
  }

  close() {
    this.store.dispatch(new SetPage('library'))
  }

  save(): void {
    // this.form["name"] = this.canvasForm.controls['name'].value
    if (this.designService.formObj === undefined)
      this.saveIdbForm()
    else {
      this.designService.formObj
      this.idbCrudService.read('form', this.designService.formObj.id).subscribe(form => {
        // this.form = form
        // this.form["name"] = this.canvasForm.controls['name'].value
        // this.form.form = this.designService.canvasFormControls
        this.idbCrudService.put('form', form).subscribe()
        this.successService.popSnackbar('Successfully Saved')
      })
    }
  }

  run() {
    // this.appService.page = 'run'
    // this.appService.pageTitle = ''
    // this.appService.isAnonymous = false
    // this.appService.parentPage = 'form-library'
    // this.designService.controlArray = this.canvasFormControl.controls
    // this.designService.detailArray = this.canvasFormControl.details
  }

  saveAs() {
    // const dialogConfig = new MatDialogConfig()
    // dialogConfig.width = '450px'
    // dialogConfig.data = {
    //   name: this.canvasForm.get('name').value
    // }
    // const dialogRef = this.dialog.open(SaveasComponent, dialogConfig)
    // dialogRef.afterClosed().subscribe(data => {
    //   if (data) {
    //     this.designService.currentIndex = 0
    //     this.canvasFormControl = this.designService.formObj.form
    //     this.designService.canvasFormControls = this.designService.formObj.form
    //     this.canvasForm.patchValue({
    //       name: this.designService.formObj.form.name
    //     })
    //     this.dropForm[1] = this.canvasFormControl.name
    //   }
    // })
  }

  saveIdbForm() {

    let idbForm = ({
      form: this.designService.canvasFormControls,
      form_id: uuid.v4(),
      name: this.canvasForm.controls['name'].value,
      tenant_id: this.tenantId,
      date_created: new Date(),
      date_archived: null,
      date_last_access: new Date(),
      user_created: null,
      user_archived: null,
      is_data: false,
      is_published: false,
      type: 'dynamic'
    })

    this.idbCrudService.put('form', idbForm).subscribe(id => {
      this.designService.formObj = idbForm
      this.designService.formObj["id"] = id
      this.designService.canvasFormControls.detailArray = idbForm.form.details
      // this.designService.controlArray = idbForm.form.controls
    })
    this.successService.popSnackbar('Successfully Saved')

  }

  delete() { }

  signin() { }

  clearIndex() {
    this.store.dispatch(new SetCurrentIndex(undefined))
  }

}
