import './text-field-style.css'
import { FieldComponent } from '../field-component'
import { Observable } from 'rxjs'
import { FieldModel } from '../../../state/fields/field-model'

export class TextFieldComponent extends FieldComponent {


    constructor(fieldObservable: Observable<FieldModel>, valueChanger: (newValue: string) => void) {
        super(fieldObservable, valueChanger)

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
                this.ValueChanger(h.innerText)

            }
        })
    }

    public get Type(): string {
        return 'text'
    }
    protected setFieldDecoration(): void {
        if (this.IsRendered) {
            this.HtmlElement.classList.add('field-text')
        }
    }

}
