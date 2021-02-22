import './date-field-style.css'
import view from './date-field-template.html'
import { FieldComponent } from '../field-component'
import { Observable } from 'rxjs'
import { FieldModel } from '../../../state/fields/field-model'

export class DateFieldComponent extends FieldComponent{

    constructor(fieldObservable: Observable<FieldModel>){
        super(fieldObservable, 'Field', view as string)
    }
}