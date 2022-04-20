import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { LayoutComponent } from './component/layout/layout.component'

const routes: Routes = [{
  path: '',
  redirectTo: '/', 
  pathMatch: 'full'
}, 
{
  path: '',
  component: LayoutComponent
},
{
  path: 'email/:email/:id',
  component: LayoutComponent
},
{
  path: 'kioske/true',
  component: LayoutComponent
}]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
