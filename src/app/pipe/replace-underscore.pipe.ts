import { Pipe, PipeTransform } from '@angular/core'

@Pipe({
  name: 'replaceUnderscore'
})
export class ReplaceUnderscorePipe implements PipeTransform {

  transform(value: string): any {
    if (value !== null)
      return value.replace(/_/g, ' ')
  }

}
