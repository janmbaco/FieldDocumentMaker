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

            this.relocateLabel()
        })

        this.on('mouseover', 'value', (h, e) => {
            const labelElement = this.HtmlElement.getElementsByClassName('label')[0] as HTMLElement
            if (labelElement) {
                labelElement.classList.add('show')
            }
        })
        this.on('mouseleave', 'value', (h, e) => {
            const labelElement = this.HtmlElement.getElementsByClassName('label')[0] as HTMLElement
            if (labelElement) {
                labelElement.classList.remove('show')
            }
        })

        this.onRender.push(() => {
            this.relocateLabel()
        })

    }

    private relocateLabel(): void {
        if (this.IsRendered) {
            const labelElement = this.HtmlElement.getElementsByClassName('label')[0] as HTMLElement
            if (labelElement) {
                const width = (this.label.length * 5) + 12
                const left = (((this.value.length * 7) + 10) / 2) - (width / 2)
                labelElement.setAttribute('style', `width:${width}px;left:${left}px`)
            }
        }
    }
}
