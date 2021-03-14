import './float-field-style.css'
import { FieldComponent } from '../field-component'
import { Observable } from 'rxjs'
import { FieldModel } from '../../../state/fields/field-model'
import { distinctUntilChanged } from 'rxjs/operators'

export class FloatFieldComponent extends FieldComponent {
    protected setFieldDecoration(field: FieldModel): void {
        throw new Error('Method not implemented.')
    }
    public get Type(): string {
        throw new Error('Method not implemented.')
    }

    constructor(fieldObservable: Observable<FieldModel>, valueChanger: (newValue: string) => void) {
        super(fieldObservable, valueChanger)
    }
}