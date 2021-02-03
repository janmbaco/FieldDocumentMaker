import '../node_modules/quill/dist/quill.snow.css';
import {  Quill, Delta  } from './shared/quill';
import { Editor } from './components/editor';
import { ParagraphViewModel } from './components/paragraphs/paragraph.viewmodel';
import { getElementsByXPath } from './shared/document.extensions';

const ParagraphArray: ParagraphViewModel[] = [];

 new Quill('#editor-container', {
    modules: {
        toolbar: false,
    },
    theme: 'snow'
});


const editor = getElementsByXPath("//div[@id='editor-container']/div[contains(@class,'ql-editor')]", document)![0] as HTMLElement
if(editor){
    new Editor(editor as HTMLTemplateElement, ParagraphArray)

     getElementsByXPath("//div[@id='editor-container']/div[contains(@class,'ql-editor')]/p", document).forEach(node => {
        const paragraph = node!
        ParagraphArray.push(new ParagraphViewModel(paragraph as HTMLTemplateElement))
     } );
    
}

    

