import { Autobind } from '../../decorators/autobind';
import {  DragTarget } from '../../shared/drag-drop'
import { ParagraphViewModel } from '../paragraphs/paragraph';


export class Editor implements DragTarget{


    editorView: HTMLTemplateElement
    paragraphs: ParagraphViewModel[]
    private initialPoint: { x: number, y: number } = { x: 0, y: 0 }
    private direction: 'TOP' | 'BOTTOM' = 'BOTTOM'

    constructor(editorView: HTMLTemplateElement, paragraphs: ParagraphViewModel[]){
        this.editorView = editorView
        this.paragraphs = paragraphs
        this.editorView.addEventListener('dragover', this.dragOverHandler)
        this.editorView.addEventListener('dragleave', this.dragLeaveHandler)
        this.editorView.addEventListener('drop', this.dropHandler)
    }

    @Autobind
    dragOverHandler(event: DragEvent): void {
        if(event.dataTransfer && event.dataTransfer.types[0] === 'text/plain'){// if we have data attached (plain text)
            event.preventDefault() 
            this.editorView.classList.add("droppable")
            event.dataTransfer.dropEffect = "move"
            if (this.initialPoint.x === 0 && this.initialPoint.y === 0) {
                this.initialPoint = { x:event.clientX, y:event.clientY }
            }
            console.log("y: " + (event.clientY - 31))
            console.log("top: " + ((event.target as HTMLElement).offsetTop + ((event.target as HTMLElement).offsetParent as HTMLElement).offsetTop!))
            
        }
    }

    @Autobind
    dropHandler(event: DragEvent): void {
        this.editorView.classList.remove("droppable")
        const paragraphId = event.dataTransfer!.getData('text/plain')
        event.preventDefault()
        console.log("target: " + (event.target as HTMLElement)?.innerText);
       
        const paragraph = this.paragraphs.filter(p => p.id.toString() === paragraphId)[0];
        if(event.target === this.editorView){
            this.editorView.appendChild(paragraph.paragraphView)
        } else {
            this.editorView.insertBefore(paragraph.paragraphView, (event.target as HTMLElement).nextElementSibling);
        }
    }

    @Autobind
    dragLeaveHandler(_: DragEvent): void {
        this.editorView.classList.remove("droppable")
        
    }

}