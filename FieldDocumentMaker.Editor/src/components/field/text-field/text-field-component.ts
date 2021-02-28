import './text-field-style.css'
import view from './text-field-template.html'
import { FieldComponent } from '../field-component'
import { Observable } from 'rxjs'
import { FieldModel } from '../../../state/fields/field-model'

export class TextFieldComponent extends FieldComponent {

    private changeValue: (newValue: string) => void

    constructor(fieldObservable: Observable<FieldModel>, changeValue: (newValue: string) => void) {
        super(fieldObservable, view as string)
        this.changeValue = changeValue
        this.on('click', 'value', (h, e) => {
            if (h.contentEditable !== 'true') {
                h.contentEditable = 'true'
                h.parentElement?.classList.add('editing')
                h.focus()
            }
        })

        this.on('focusout', 'value', (h, e) => {
            if (h.contentEditable === 'true') {
                h.contentEditable = 'false'
                h.parentElement?.classList.remove('editing')
            }
        })

        this.on('keypress', 'value', (h, e) => {
            if (e.key === 'Enter') {
                e.preventDefault()
                this.changeValue(h.innerText)

            }
        })
    }
}