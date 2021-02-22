import './paragraph-style.css'
import view from './paragraph-template.html'
import { BaseComponent } from '../base-component'
import { ParagraphModel } from '../../state/paragraphs/paragraph-model'
import { Observable } from 'rxjs'
import { distinctUntilChanged } from 'rxjs/operators'
import { FieldComponent } from '../field/field-component'
import { FieldFactory } from '../field/field-factory'
import { createElementFromTemplate } from '../shared/document-extension'


export class ParagraphComponent extends BaseComponent {

    private template = ''
    private fields: FieldComponent[] = []
    private fieldFactory: FieldFactory
    private innerClass = 'innerParagraph'
    private ParagraphElement!: HTMLElement

    constructor(paragraphObservable: Observable<ParagraphModel>, fieldFactory: FieldFactory) {
        super('Paragraph', view as string)
        this.fieldFactory = fieldFactory
        this.subscription = paragraphObservable.pipe(distinctUntilChanged()).subscribe(paragraph => {
            if (paragraph.template !== this.template) {
                this.template = paragraph.template
                this.compileInnerHtmlTemplate()
            }
        })
    }

    compileInnerHtmlTemplate(): void {
        this.fields.forEach(f => f.remove())
        this.fields = []
        this.ParagraphElement = createElementFromTemplate(this.template)
        Array.from(this.ParagraphElement.children).forEach(child => {
            if (child.nodeName === 'FIELD') {
                let field: FieldComponent | null = null
                const bind = child.attributes.getNamedItem('bind')
                const style = child.attributes.getNamedItem('style')
                if (bind && style) {
                    field = this.fieldFactory.create({ bind: bind.value, style: style.value })
                    if (field) {
                        this.fields.push(field)
                    }
                }
                if (field) {
                    field.setInstanceOfElement(this.ParagraphElement, child)
                } else {
                    this.ParagraphElement.removeChild(child)
                }
            }
        })
        this.setInInnerClass(this.innerClass, this.ParagraphElement)
    }
}
