import { Component, OnInit } from '@angular/core'
import { FormBuilder, Validators, FormGroup } from '@angular/forms'

import * as uuid from 'uuid'

import { Observable } from 'rxjs'

import { SetPage } from '../../state/auth/auth-state.actions'
import { SetCurrentIndex } from '../canvas/state/canvas-state.actions'

import { Store, Select } from '@ngxs/store'
import { Form } from "../../state/auth/auth-state.model"

import { environment } from '../../../environments/environment'

import { FormService } from "../../service/form.service"
import { DesignService } from "../../service/design.service"
import { SuccessService } from "../../service/success.service"
import { IdbCrudService } from "../../service-idb/idb-crud.service"

import { AuthState } from '../../state/auth/auth.state'
import { CanvasState } from '../canvas/state/canvas.state'
import { SetForms } from '../canvas/state/canvas-state.actions'

import { ControlLabels, ControlIcons } from "../../constants/design"

@Component({
  selector: 'app-design',
  templateUrl: './design.component.html',
  styleUrls: ['./design.component.scss']
})
export class DesignComponent implements OnInit {

  @Select(CanvasState.isSave) isSave$!: Observable<any>

  isMenu = true
  tenant: any
  canvasForm: FormGroup
  tenantId = environment.tenantId

  controls: string[] = []
  controlLabels = ControlLabels
  controlIcons = ControlIcons

  constructor(
    private store: Store,
    private fb: FormBuilder,
    private formService: FormService,
    public designService: DesignService,
    private successService: SuccessService,
    private idbCrudService: IdbCrudService) {
    this.canvasForm = this.fb.group({
      name: [null, Validators.required]
    })
  }

  ngOnInit() {
    this.tenant = this.store.selectSnapshot(AuthState.tenant)
    this.designService.controls = []
    this.designService.canvasFormControls = []
    this.designService.canvasFormControls.details = []
    this.store.select(CanvasState.formObject).subscribe((formObj: any) => {
      if (formObj) {
        this.canvasForm.patchValue({ name: formObj.name })
        this.designService.canvasFormControls.details = formObj.details
      }
    })
  }

  close() {
    this.idbCrudService.readAll('form').subscribe(forms => {
      this.store.dispatch(new SetForms(forms))
      this.store.dispatch(new SetPage('library'))
    })
  }

  save(): void {
    const tenant: any = this.store.selectSnapshot(AuthState.tenant)
    const formObj: any = this.store.selectSnapshot(CanvasState.formObject)

    if (!formObj) {
      const name = this.canvasForm.controls['name'].value
      this.createForm(name)
    }
    else {
      this.idbCrudService.read('form', formObj.id).subscribe((form: any) => {
        form["name"] = this.canvasForm.controls['name'].value
        form.details = this.designService.canvasFormControls.details
        form.icon = 'dynamic_form'
        this.idbCrudService.put('form', form).subscribe(_ => {
          if (tenant) {
            this.formService.update(form).subscribe((form: any) => {
              this.successService.popSnackbar(form.message)
            })
          }
        })
      })
    }
  }

  saveAs() {
    let name = this.canvasForm.controls['name'].value
    name = name + 'copy'
    this.createForm(name)
  }

  createForm(name: string) {
    let deviceForm: Form = ({
      details: this.designService.canvasFormControls.details,
      form_id: uuid.v4(),
      name: name,
      date_created: new Date(),
      date_archived: null,
      date_last_access: null,
      user_created: null,
      user_archived: null,
      is_data: false,
      is_list: false,
      is_deployed: false,
      is_published: false,
      type: 'dynamic'
    })

    this.idbCrudService.put('form', deviceForm).subscribe(id => {
      this.designService.formObj = deviceForm
      this.designService.formObj["id"] = id
      this.designService.canvasFormControls.detailArray = deviceForm.details

      if (this.tenant) {
        deviceForm['user_created'] = { email: this.tenant.email, date_created: new Date().toLocaleString("en-US", { timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone }) }
        this.formService.create(deviceForm).subscribe((form: any) => {
          this.successService.popSnackbar(form.message)
        })
      }
    })
  }

  delete() { 
    const formObj: any = this.store.selectSnapshot(CanvasState.formObject)
    this.idbCrudService.delete('form', formObj.id).subscribe(_ => {
      this.successService.popSnackbar('Form Deleted.')
    })
  }

  clearIndex() {
    this.store.dispatch(new SetCurrentIndex(undefined))
  }

}
