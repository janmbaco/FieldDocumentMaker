import './editor-style.css'
import view from './editor-template.html'
import { Autobind } from '../../decorators/autobind';
import { Paragraph } from '../paragraph/paragraph-component';
import { Guid } from 'guid-typescript';
import { ParagraphCollection } from '../ParagraphCollection/paragraph-collection-component';


export class Editor {


    editorView: HTMLElement
    paragraphs: ParagraphCollection


    constructor(parent: HTMLElement){
        parent.innerHTML = view;
        this.editorView = parent.firstElementChild! as HTMLElement
        this.editorView.addEventListener('dragover', this.dragOverHandler)
        this.editorView.addEventListener('dragleave', this.dragLeaveHandler)
        this.editorView.addEventListener('drop', this.dropHandler)
    }

    insertParagraph(paragraph: Paragraph){
        this.paragraphAreaView.append(paragraph.AsHtmlElement())
        this.paragraphs.push(paragraph)
        this.bindEvents(paragraph);
        paragraph.focus()
    }

    private bindEvents(paragraph: Paragraph) {
        paragraph.enter = this.onParagraphEnter;
        paragraph.dragging = this.onParagrphDraggin;
    }

    select(paragraphNumber: number) {
        this.paragraphs[paragraphNumber].focus()
    }

    @Autobind
    dragOverHandler(event: DragEvent): void {
        if(this.idParagraphDraggin != null){
            event.preventDefault()
        }
    }

    @Autobind
    dropHandler(event: DragEvent) {
        if(this.idParagraphDraggin != null){
            event.preventDefault()
            console.log("target: " + (event.target as HTMLElement)?.innerText);
           
            const paragraph = this.paragraphs.filter(p => p.id=== this.idParagraphDraggin)[0];
            
            if(event.target === this.editorView){
                this.editorView.appendChild(paragraph.AsHtmlElement())
            } else {
                this.editorView.insertBefore(paragraph.AsHtmlElement(), (event.target as HTMLElement).nextElementSibling);
            }
           this.idParagraphDraggin = null
        }
    }

    @Autobind
    dragLeaveHandler(_: DragEvent): void {
        
    }

    @Autobind
    onParagraphEnter(uid: Guid){
        
        const paragraph = new Paragraph()
        this.bindEvents(paragraph)
        this.paragraphs.push(paragraph)
        const p = this.paragraphs.filter(p => p.id === uid)[0]
        const sel = window.getSelection()
        const anteriorText =  p.getText().slice(0, sel?.anchorOffset)
        const posteriorText = p.getText().slice(sel?.anchorOffset)
        p.insertText(anteriorText)
        paragraph.insertText(posteriorText)
        this.paragraphAreaView.insertBefore(paragraph.AsHtmlElement().insertAdjacentElement, p.AsHtmlElement().nextElementSibling)
        paragraph.focus()

    }

    @Autobind
    onParagrphDraggin(uid: Guid){
        this.idParagraphDraggin = uid
    }



}