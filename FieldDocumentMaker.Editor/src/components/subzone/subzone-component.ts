import './subzone-style.css'
import view from './subzone-template.html'
import { BaseComponent } from '../base-component'
import { Observable } from 'rxjs'
import { distinctUntilChanged } from 'rxjs/operators'
import { IComponentFactory } from '../component-factory-interface'
import { IComponent } from '../component-interface'
import { SubZoneModel } from '../../state/subzones/subzone-model'
import { FieldBind } from '../../state/fields/field-model'


export class SubZoneComponent extends BaseComponent {

    private template = ''
    private fieldFactory: IComponentFactory<FieldBind>

    constructor(subZoneObservable: Observable<SubZoneModel>, fieldFactory: IComponentFactory<FieldBind>) {
        super(view as string)
        this.fieldFactory = fieldFactory

        this.on('keypress', 'content', (h, e) => {
            if (e.key === 'Enter') {
                e.preventDefault()
            }
        })

        this.subscription.push(subZoneObservable.pipe(distinctUntilChanged()).subscribe(paragraph => {
            if (paragraph.template !== this.template) {
                this.setState(() => {
                    this.template = paragraph.template
                    this.insertInClass('content', this.compileInnerHtmlTemplate())
                })
            }
        }))
    }

    compileInnerHtmlTemplate(): HTMLElement {
        const element = document.createElementFromTemplate(this.template)
        this.compileInnerElement(element)
        return element
    }

    compileInnerElement(element: Element): void {
        Array.from(element.children).forEach(child => {
            if (child.nodeName === 'FIELD') {
                let field: IComponent | null = null
                const bind = child.attributes.getNamedItem('bind')
                const style = child.attributes.getNamedItem('style')
                if (bind && style) {
                    field = this.fieldFactory.create({ bind: bind.value, style: style.value })
                    if (field) {
                        this.appendChild(field)
                    }
                }
                if (field) {
                    this.appendChild(field)
                    child.replaceWith(field.HtmlElement)
                } else {
                    element.removeChild(child)
                }
            } else {
                this.compileInnerElement(child)
            }
        })
    }
}
