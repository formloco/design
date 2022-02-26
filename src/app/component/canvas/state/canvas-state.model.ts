export interface CanvasStateModel {
  event: any
  currentIndex: any
  previousIndex: number
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