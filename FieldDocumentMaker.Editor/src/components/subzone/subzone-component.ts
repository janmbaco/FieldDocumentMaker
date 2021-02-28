import './subzone-style.css'
import view from './subzone-template.html'
import { BaseComponent } from '../base-component'
import { Observable } from 'rxjs'
import { distinctUntilChanged } from 'rxjs/operators'
import { createElementFromTemplate } from '../shared/document-extension'
import { IComponentFactory } from '../component-fatory-interface'
import { IComponent } from '../component-interface'
import { SubZoneModel } from '../../state/subzones/subzone-model'
import { FieldBindModel } from '../../state/fields/field-bind-model'


export class SubZoneComponent extends BaseComponent {

    private template = ''
    private fieldFactory: IComponentFactory<FieldBindModel>

    constructor(paragraphObservable: Observable<SubZoneModel>, fieldFactory: IComponentFactory<FieldBindModel>) {
        super(view as string)
        this.fieldFactory = fieldFactory

        this.on('keypress', 'content', (h, e) => {
            if (e.key === 'Enter') {
                e.preventDefault()
            }
        })
        this.subscription = paragraphObservable.pipe(distinctUntilChanged()).subscribe(paragraph => {
            if (paragraph.template !== this.template) {
                this.setState(() => {
                    this.template = paragraph.template
                    this.insertInClass('content', this.compileInnerHtmlTemplate())
                })
            }
        })
    }

    compileInnerHtmlTemplate(): HTMLElement {
        const element = createElementFromTemplate(this.template)
        Array.from(element.children).forEach(child => {
            if (child.nodeName === 'FIELD') {
                let field: IComponent | null = null
                const bind = child.attributes.getNamedItem('bind')
                const style = child.attributes.getNamedItem('style')
                if (bind && style) {
                    field = this.fieldFactory.create({ bind: bind.value, style: style.value })
                    if (field) {
                        this.append(field)
                    }
                }
                if (field) {
                    this.append(field)
                    child.replaceWith(field.HtmlElement)
                } else {
                    this.SubZoneElement.removeChild(child)
                }
            }
        })
        return element

    }
}
