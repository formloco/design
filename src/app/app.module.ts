import { NgModule, APP_INITIALIZER } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'

import { environment } from '../environments/environment'

import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http'
import { HttpConfig } from './interceptor/httpconfig.interceptor'

import { MaterialModule } from "./material/material.module"

import { AppRoutingModule } from './app-routing.module'
import { AppComponent } from './app.component'

import { BrowserAnimationsModule } from '@angular/platform-browser/animations'

//indexedDB
import { IdbPersistenceService } from './service-idb/idb-persistence.service'

// state management
import { NgxsModule } from '@ngxs/store'
import { States } from './state/app.state'

// import { PipeModule } from '../pipe/pipe.module'

// third party
// import { QuillModule } from "ngx-quill"
import { NgxDropzoneModule } from 'ngx-dropzone'

// app functional components
import { LayoutComponent } from './component/layout/layout.component'
import { CanvasComponent } from './component/canvas/canvas.component'
import { LibraryComponent } from './component/library/library.component'
import { DesignComponent } from './component/design/design.component'

// form controls
import { RadioComponent } from './component/controls/radio/radio.component'
import { LabelComponent } from './component/controls/label/label.component'
import { SliderComponent } from './component/controls/slider/slider.component'
import { ToggleComponent } from './component/controls/toggle/toggle.component'
import { TextboxComponent } from './component/controls/textbox/textbox.component'
import { SelectComponent } from './component/controls/select/select.component'
import { CheckboxComponent } from './component/controls/checkbox/checkbox.component'
import { TextareaComponent } from './component/controls/textarea/textarea.component'

// form detail configuration
import { DetailsComponent } from './component/details/details.component'
import { LabelDetailsComponent } from './component/details/label-details/label-details.component'
import { RadioDetailsComponent } from './component/details/radio-details/radio-details.component'
import { SliderDetailsComponent } from './component/details/slider-details/slider-details.component'
import { ToggleDetailsComponent } from './component/details/toggle-details/toggle-details.component'
import { TextboxDetailsComponent } from './component/details/textbox-details/textbox-details.component'
import { CheckboxDetailsComponent } from './component/details/checkbox-details/checkbox-details.component'
import { SelectDetailsComponent } from './component/details/select-details/select-details.component'
import { TextareaDetailsComponent } from './component/details/textarea-details/textarea-details.component'

@NgModule({
  declarations: [
    AppComponent,
    DesignComponent,
    LayoutComponent,
    CanvasComponent,
    LibraryComponent,
    RadioComponent,
    LabelComponent,
    SliderComponent,
    ToggleComponent,
    TextboxComponent,
    CheckboxComponent,
    TextareaComponent,
    SelectComponent,
    DetailsComponent,
    LabelDetailsComponent,
    RadioDetailsComponent,
    SliderDetailsComponent,
    ToggleDetailsComponent,
    TextboxDetailsComponent,
    CheckboxDetailsComponent,
    SelectDetailsComponent,
    TextareaDetailsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MaterialModule,
    HttpClientModule,
    BrowserAnimationsModule,
    
    NgxsModule.forRoot(States, { developmentMode: !environment.production })
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpConfig,
      multi: true
    },
    {
      provide: APP_INITIALIZER,
      useFactory: (idbPersistenceService: IdbPersistenceService) => () => idbPersistenceService.connect(),
      deps: [IdbPersistenceService],
      multi: true
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
