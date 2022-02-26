import { Injectable } from '@angular/core'
import { State, Selector, StateContext, Action } from '@ngxs/store'

import * as CanvasActions from './canvas-state.actions'
import { CanvasStateModel } from './canvas-state.model'

@Injectable()
@State<CanvasState>({
  name: 'canvas'
})

export class CanvasState {

  @Selector()
  static event(state: CanvasStateModel): object {
    return state.event
  }

  @Selector()
  static currentIndex(state: CanvasStateModel): number {
    return state.currentIndex
  }

  @Selector()
  static previousIndex(state: CanvasStateModel): number {
    return state.previousIndex
  }

  @Selector()
  static controls(state: CanvasStateModel): object {
    return state.controls
  }

  @Selector()
  static formObject(state: CanvasStateModel): object {
    return state.formObject
  }

  @Selector()
  static isSave(state: CanvasStateModel): boolean {
    return state.isSave
  }

  @Action(CanvasActions.SetEvent)
  onSetEvent(ctx: StateContext<CanvasStateModel>, { event }: CanvasActions.SetEvent) {
    ctx.patchState({
      event: event
    });
  }

  @Action(CanvasActions.SetCurrentIndex)
  onSetCurrentIndex(ctx: StateContext<CanvasStateModel>, { currentIndex }: CanvasActions.SetCurrentIndex) {
    ctx.patchState({
      currentIndex: currentIndex
    });
  }

  @Action(CanvasActions.SetPreviousIndex)
  onSetPreviousIndex(ctx: StateContext<CanvasStateModel>, { previousIndex }: CanvasActions.SetPreviousIndex) {
    ctx.patchState({
      previousIndex: previousIndex
    });
  }

  @Action(CanvasActions.SetIsSave)
  onSetIsSave(ctx: StateContext<CanvasStateModel>, { isSave }: CanvasActions.SetIsSave) {
    ctx.patchState({
      isSave: isSave
    });
  } 

}

