import '../node_modules/quill/dist/quill.snow.css';
import { ParagraphQuillModule, ParagraphOptions } from './components/paragraphs/paragraph.module';
import { Editor } from './components/editor';
import { ParagraphViewModel } from './components/paragraphs/paragraph.viewmodel';
import { getElementsByXPath } from './shared/document.extensions';
import { ParagraphCommands } from './components/paragraphs/paragraph.command';

const ParagraphArray: ParagraphViewModel[] = [];
const ParagraphsActions: ParagraphCommands = new ParagraphCommands(ParagraphArray);

Quill.register('modules/paragraph', ParagraphQuillModule)

const quill = new Quill('#editor-container', {
    modules: {
        toolbar: false,
        paragraph: new ParagraphOptions(ParagraphArray, ParagraphsActions.onClickAction)
    },
    theme: 'snow'
});

const editor = getElementsByXPath("//div[@id='editor-container']/div[contains(@class,'ql-editor')]", document)![0] as HTMLElement
if(editor){
    new Editor(editor as HTMLTemplateElement, ParagraphArray)

     getElementsByXPath("//div[@id='editor-container']/div[contains(@class,'ql-editor')]/p", document).forEach(node => {
        const paragraph = node!
        ParagraphArray.push(new ParagraphViewModel(paragraph as HTMLTemplateElement, ParagraphsActions.onClickAction))
     } );
    
}

    

