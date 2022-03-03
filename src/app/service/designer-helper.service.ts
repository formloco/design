import { Injectable } from '@angular/core'
import { SuccessService } from "../service/success.service"

import { environment } from '../../environments/environment'

@Injectable({
  providedIn: 'root'
})
export class DesignerHelperService {

  linkUrl = environment.homeUrl

  constructor(
    private successService: SuccessService
  ) { }

  copyUrl(type:any, formObj:any) {
    let link = ''
    let url = formObj["form_id"] + '&tenant_id=' + formObj["tenant_id"]

    if (type === 'link')
      link = this.linkUrl + 'link?form_id=' + url
    else
      link = this.linkUrl + 'form?form_id=' + url

    const selBox = document.createElement('textarea')
    selBox.style.position = 'fixed'
    selBox.style.left = '0'
    selBox.style.top = '0'
    selBox.style.opacity = '0'
    selBox.value = link
    document.body.appendChild(selBox)
    selBox.focus()
    selBox.select()
    document.execCommand('copy')
    document.body.removeChild(selBox)
    this.successService.popSnackbar('URL copied to clipboard.')
  }

  exportJSON() {
    // let yy = JSON.stringify(this.designService.formObj)
    // let blob = new Blob([yy], { type: 'text/plain' })
    // saveAs(blob, 'template.json')
  }

  delete(formObj:any) {
    // if (formObj.is_data === false) {
    //   this.idbCrudService.delete('form', formObj.id)
    //   let user = this.authService.userSignedIn()

    //   if (user !== null) {
    //     this.formService.delete(formObj).subscribe(response => {
    //       this.response = response
    //       this.successService.popSnackbar(this.response.message)
    //     })
    //   }
    //   this.appService.getForms()
    // }

    // else {
    //   const dialogConfig = new MatDialogConfig()
    //   dialogConfig.width = '450px'
    //   dialogConfig.data = {
    //     title: 'Form Has Data',
    //     message: 'Please login to sync your data before deleting the form.'
    //   }
    //   const dialogRef = this.dialog.open(MessageComponent, dialogConfig)
    // }
  }

  archive() {
    // const dialogConfig = new MatDialogConfig()
    // dialogConfig.width = '450px'
    // dialogConfig.data = {
    //   form: this.designService.formObj
    // }
    // const dialogRef = this.dialog.open(ArchiveComponent, dialogConfig)
    // dialogRef.afterClosed().subscribe(data => {
    //   this.appService.getForms()
    //   // setTimeout(function () { window.location = window.location }, 1000)
    // })
  }


}
