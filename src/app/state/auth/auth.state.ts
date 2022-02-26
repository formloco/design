import { Injectable } from '@angular/core'
import { State, Selector, StateContext, Action } from '@ngxs/store'

import * as AuthActions from './auth-state.actions'
import { AuthStateModel, User, Tenant } from './auth-state.model'

@Injectable()
@State<AuthStateModel>({
  name: 'auth'
})

export class AuthState {

  @Selector()
  static isIdentified(state: AuthStateModel): boolean {
    return state.isIdentified
  }

  @Selector()
  static page(state: AuthStateModel): string {
    return state.page
  }

  @Selector()
  static childPage(state: AuthStateModel): string {
    return state.childPage
  }

  @Selector()
  static childPageLabel(state: AuthStateModel): string {
    return state.childPageLabel
  }

  @Selector()
  static tenant(state: AuthStateModel): Tenant {
    return state.tenant
  }

  @Selector()
  static user(state: AuthStateModel): User {
    return state.user
  }

  @Action(AuthActions.SetIsIdentified)
  onSetIsIdentified(ctx: StateContext<AuthStateModel>, { isIdentified }: AuthActions.SetIsIdentified) {
    ctx.patchState({
      isIdentified: isIdentified
    })
  }

  @Action(AuthActions.SetPage)
  onSetPage(ctx: StateContext<AuthStateModel>, { page }: AuthActions.SetPage) {
    ctx.patchState({
      page: page
    })
  }

  @Action(AuthActions.SetChildPage)
  onSetChildPage(ctx: StateContext<AuthStateModel>, { childPage }: AuthActions.SetChildPage) {
    ctx.patchState({
      childPage: childPage
    })
  }

  @Action(AuthActions.SetChildPageLabel)
  onSetChildPageLabel(ctx: StateContext<AuthStateModel>, { childPageLabel }: AuthActions.SetChildPageLabel) {
    ctx.patchState({
      childPageLabel: childPageLabel
    })
  }

  @Action(AuthActions.SetTenant)
  onSetTenant(ctx: StateContext<AuthStateModel>, { tenant }: AuthActions.SetTenant) {
    ctx.patchState({
      tenant: tenant
    })
  }

  @Action(AuthActions.SetUser)
  onSetUser(ctx: StateContext<AuthStateModel>, { user }: AuthActions.SetUser) {
    ctx.patchState({
      user: user
    })
  }

  @Action(AuthActions.SetSelectedForm)
  onSetSelectedForm(ctx: StateContext<AuthStateModel>, { selectedForm }: AuthActions.SetSelectedForm) {
    ctx.patchState({
      selectedForm: selectedForm
    });
  }

}

