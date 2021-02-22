import './integer-field-style.css'
import view from './integer-field-template.html'
import { FieldComponent } from '../field-component'
import { Observable } from 'rxjs'
import { FieldModel } from '../../../state/fields/field-model'

export class IntegerFieldComponent extends FieldComponent {

    constructor(fieldObservable: Observable<FieldModel>) {
        super(fieldObservable, 'Field', view as string)
    }
}