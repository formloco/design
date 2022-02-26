export class SetEvent {
  static type = '[Canvas] SetEvent'
  constructor(public event: any) {}
}

export class SetCurrentIndex {
  static type = '[Canvas] SetCurrentIndex'
  constructor(public currentIndex: any) {}
}

export class SetPreviousIndex {
  static type = '[Canvas] SetPreviousIndex'
  constructor(public previousIndex: number) {}
}

export class SetCanvasFormControls {
  static type = '[Canvas] SetCanvasFormControls'
  constructor(public canvasFormControls: object) {}
}

export class SetShowControls {
  static type = '[Canvas] SetShowControls'
  constructor(public showControls: boolean) {}
}

export class SetIsSave {
  static type = '[Canvas] SetIsSave'
  constructor(public isSave: boolean) {}
}



