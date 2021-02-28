import './float-field-style.css'
import view from './float-field-template.html'
import { FieldComponent } from '../field-component'
import { Observable } from 'rxjs'
import { FieldModel } from '../../../state/fields/field-model'

export class FloatFieldComponent extends FieldComponent {

    constructor(fieldObservable: Observable<FieldModel>) {
        super(fieldObservable, view as string)
    }
}