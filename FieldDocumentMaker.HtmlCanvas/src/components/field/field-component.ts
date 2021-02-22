import { Observable } from 'rxjs'
import { distinctUntilChanged } from 'rxjs/operators'
import { FieldModel } from '../../state/fields/field-model'
import { BaseComponent } from '../base-component'

export abstract class FieldComponent extends BaseComponent {

    label = ''
    value = ''
    maskedValue = ''

    constructor(fieldObservable: Observable<FieldModel>, name: string, view: string) {
        super(name, view)
        this.subscription = fieldObservable.pipe(distinctUntilChanged()).subscribe(field => {
            this.setState(() => {
                this.label = field.label
                this.value = field.value
                this.maskedValue = field.maskedValue
            })
        })
    }
}
