import './editor-style.css'
import view from './editor-template.html'
import { Autobind } from '../../decorators/autobind';
import { Paragraph } from '../paragraph/paragraph-component';
import { Guid } from 'guid-typescript';


export class Editor {


    editorView: HTMLElement
    paragraphAreaView: HTMLElement
    private paragraphs: Paragraph[] = []
    private initialPoint: { x: number, y: number } = { x: 0, y: 0 }
    private direction: 'TOP' | 'BOTTOM' = 'BOTTOM'
    private idParagraphDraggin: Guid | null = null


    constructor(parent: HTMLElement){
        parent.innerHTML = view;
        this.editorView = parent.firstElementChild! as HTMLElement
        this.paragraphAreaView = this.editorView.getElementsByClassName("middle")[0] as HTMLElement
        this.editorView.addEventListener('dragover', this.dragOverHandler)
        this.editorView.addEventListener('dragleave', this.dragLeaveHandler)
        this.editorView.addEventListener('drop', this.dropHandler)
    }

    insertParagraph(paragraph: Paragraph){
        this.paragraphAreaView.append(paragraph.AsHtmlElement())
        this.paragraphs.push(paragraph)
        paragraph.enter = this.onParagraphEnter
        paragraph.dragging = this.onParagrphDraggin
        paragraph.focus()
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
    onParagraphEnter(){
        const paragraph = new Paragraph()
        this.insertParagraph(paragraph)
    }

    @Autobind
    onParagrphDraggin(uid: Guid){
        this.idParagraphDraggin = uid
    }



}