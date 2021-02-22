import './combo-field-style.css'
import view from './combo-field-template.html'
import { FieldComponent } from '../field-component'
import { Observable } from 'rxjs'
import { FieldModel } from '../../../state/fields/field-model'

export class ComboFieldComponent extends FieldComponent{

    constructor(fieldObservable: Observable<FieldModel>){
        super(fieldObservable, 'Field', view as string)
    }
}