import { Observable } from 'rxjs'
import { distinctUntilChanged } from 'rxjs/operators'
import { FieldModel } from '../../state/fields/field-model'
import { BaseComponent } from '../base-component'

export abstract class FieldComponent extends BaseComponent {

    label = ''
    value = ''

    constructor(fieldObservable: Observable<FieldModel>, view: string) {
        super(view)
        this.subscription = fieldObservable.pipe(distinctUntilChanged()).subscribe(field => {
            this.setState(() => {
                this.label = field.label
                this.value = field.value
            })
        })
    }
}
