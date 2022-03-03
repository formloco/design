export interface CanvasStateModel {
  event: any
  currentIndex: any
  forms: []
  formObject: object
  name: string,
  controls: [],
  details: []
  isSave: boolean
}

export interface CanvasFormControl {
  name: '',
  controls: [],
  details: []
}