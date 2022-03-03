export class SetEvent {
  static type = '[Canvas] SetEvent'
  constructor(public event: any) {}
}

export class SetCurrentIndex {
  static type = '[Canvas] SetCurrentIndex'
  constructor(public currentIndex: any) {}
}

export class SetForms {
  static type = '[Canvas] SetForms'
  constructor(public forms: any) {}
}

export class SetCanvasFormControls {
  static type = '[Canvas] SetCanvasFormControls'
  constructor(public canvasFormControls: object) {}
}

export class SetFormObject {
  static type = '[Canvas] SetFormObject'
  constructor(public formObject: any) {}
}

export class SetIsSave {
  static type = '[Canvas] SetIsSave'
  constructor(public isSave: boolean) {}
}



