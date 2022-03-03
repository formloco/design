import { Injectable } from '@angular/core'

import * as _ from 'lodash'

import { DesignService } from "../service/design.service"
import { CanvasState } from '../component/canvas/state/canvas.state'

@Injectable({
  providedIn: 'root'
})
export class DesignerControlService {

  constructor(public designService: DesignService) { }

  updateDetail(control:any, index:number) {

    let obj = {}
    let type = control[index]
    console.log(type)
    let length = this.designService.canvasFormControls.details.length

    if (type == 'Textbox') {
      obj = {
        type: "Textbox",
        placeholder: "Textbox",
        formControlName: type + length,
        label: "Textbox",
        appearance: "outline",
        required: false,
        types: "text",
        error: "Required Field"
      }
    }
    else if (type == 'GPS') {
      obj = {
        type: "GPS",
        lat: {
          type: "Textbox",
          placeholder: "Latitude",
          formControlName: 'Latitude',
          label: "Latitude",
          appearance: "outline",
          required: false,
          types: "text"
        },
        long: {
          type: "Textbox",
          placeholder: "Longitude",
          formControlName: 'Longitude',
          label: "Longitude",
          appearance: "outline",
          required: false,
          types: "text"
        }
      }
    }
    else if (type == 'Checkbox') {
      obj = {
        type: "Checkbox",
        label: "Checkboxes",
        checkboxArray: [
          {
            label: "Checkbox 1",
            labelPosition: "after",
            formControlName: type + length + 1,
            required: false,
            value: false,
            error: "Field is required"
          },
          {
            label: "Checkbox 2",
            labelPosition: "after",
            formControlName: type + length + 2,
            required: false,
            value: false,
            error: "Field is required"
          }
        ]
      }
    }
    else if (type == 'Select') {
      obj = {
        type: "Select",
        label: "Select",
        formControlName: type + length,
        list: 'none',
        appearance: "outline",
        required: true,
        multiple: false,
        error: "Field is required",
        selectArray: [
          {
            label: "Option 1",
            value: "Option 1"
          },
          {
            label: "Option 2",
            value: "Option 2"
          }
        ]
      }
    }
    else if (type == 'File Upload') {
      obj = []
    }
    else if (type == 'BarCode') {
      obj = {}
    }
    else if (type == 'QRCode') {
      obj = {
        qrcode: '',
        redireectURL: '',
        tagArray: []
      }
    }
    else if (type == 'BarCodeScanner') {
      obj = {
        formControlName: type + length,
        label: "Barcode Numbers",
        appearance: "outline"
      }
    }
    else if (type == 'QRCodeScanner') {
      obj = {
        files: []
      }
    }
    else if (type == 'Label') {
      obj = {
        type: "Label",
        label: "Label",
        fontValue: "mat-display-1"
      }
    }
    else if (type == 'Radio') {
      obj = {
        type: "Radio",
        label: "Radio Buttons",
        formControlName: type + length + 1,
        required: false,
        error: "Field is required",
        radioArray: [
          {
            label: "Opt 1",
            value: "1",
            labelPosition: "after"
          },
          {
            label: "Opt 2",
            value: "2",
            labelPosition: "after"
          }
        ]
      }
    }
    else if (type == 'Slider') {
      obj = {
        type: "Slider",
        label: "Slider",
        formControlName: type + length + 1,
        invert: false,
        max: 100,
        min: 0,
        interval: 10,
        step: 10,
        thumbLabel: true,
        value: 0,
      }
    }
    else if (type == 'Textarea') {
      obj = {
        type: "Textarea",
        label: "Text Area",
        formControlName: type + length + 1,
        placeholder: "Text Area",
        appearance: "outline",
        required: false,
        types: "text",
        error: "Required Field"
      }
    }
    else if (type == 'Toggle') {
      obj = {
        type: "Toggle",
        label: "Toggles",
        toggleArray: [
          {
            label: "Toggle 1",
            formControlName: type + length + 1,
            required: false,
            value: false,
            labelPosition: "after",
            error: "Toggle is required"
          },
          {
            label: "Toggle 2",
            formControlName: type + length + 2,
            required: false,
            value: false,
            labelPosition: "after",
            error: "Toggle is required"
          }
        ]
      }
    }
    else if (type == 'Editor') {
      obj = {
        type: "Editor",
        html: ''
      }
    }

    let details = _.cloneDeep(this.designService.canvasFormControls.details)
    details.push(obj)
    this.designService.canvasFormControls.details = details
  }
}

