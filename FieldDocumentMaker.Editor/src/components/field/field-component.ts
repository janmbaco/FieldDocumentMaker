import './field-style.css'
import view from './field-template.html'
import { Observable } from 'rxjs'
import { distinctUntilChanged } from 'rxjs/operators'
import { FieldModel } from '../../state/fields/field-model'
import { BaseComponent } from '../base-component'

export abstract class FieldComponent extends BaseComponent {

    private label = ''
    private value = ''
    private changeValue: (newValue: string) => void

    protected get ValueChanger(): (newValue: string) => void {
        return this.changeValue
    }

    constructor(fieldObservable: Observable<FieldModel>, changeValue: (newValue: string) => void) {
        super(view as string)
        this.changeValue = changeValue
        this.OnRender.push(() => this.HtmlElement.classList.add(`${this.Type}-field`))
        this.subscription.push(fieldObservable.pipe(distinctUntilChanged()).subscribe(field => {
            this.setState(() => {
                this.label = field.base.label
                this.value = field.base.value
            })
        }))

        this.on('mouseover', '', (h, e) => {
            const labelElement = this.HtmlElement.getElementsByClassName('label')[0] as HTMLElement
            if (labelElement) {
                labelElement.classList.add('show')
            }
        })

        this.on('mouseleave', '', (h, e) => {
            const labelElement = this.HtmlElement.getElementsByClassName('label')[0] as HTMLElement
            if (labelElement) {
                labelElement.classList.remove('show')
            }
        })
    }

    protected abstract get Type(): string

}
