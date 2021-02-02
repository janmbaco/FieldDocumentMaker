import './paragraphs.style.css'
import { Autobind } from '../../decorators/autobind'
import { getElementsByXPath } from '../../shared/document.extensions'
import { QuillType } from '../../shared/quill'
import { ParagraphViewModel } from './paragraph.viewmodel';

export class ParagraphOptions{
  paragraphs : ParagraphViewModel[]
  onClickAction: () => void
  constructor(paragraphs: ParagraphViewModel[], onClickAction: () => void){
    this.paragraphs = paragraphs
    this.onClickAction = onClickAction
  }
}

export class ParagraphQuillModule {

    quill: QuillType
    options: ParagraphOptions

    constructor(quill: QuillType, options: ParagraphOptions) {
        this.quill = quill
        this.options = options
        quill.on("text-change", this.onNewParagraph)
    }

    @Autobind
    onNewParagraph() : void {
        const index = this.quill.getSelection()?.index!
        const text = this.quill.getText(index, 2)!
        if(text === "\n\n"){
            this.options.onClickAction()
            getElementsByXPath("//div[@id='editor-container']/div[contains(@class,'ql-editor')]/p[not(text())]", document).forEach(node => {
              const paragraph = node!  as HTMLTemplateElement
              if(paragraph && !this.options.paragraphs.some(p => p.paragraphView == paragraph)){
                const paragraphVM = new ParagraphViewModel(paragraph, this.options.onClickAction)
                paragraphVM.paragraphView.contentEditable = "true"
                this.options.paragraphs.push(paragraphVM)
              }
            })
        }
      }
}