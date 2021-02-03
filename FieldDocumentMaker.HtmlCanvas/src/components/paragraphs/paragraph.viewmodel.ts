import './paragraphs.style.css'
import { Autobind } from '../../decorators/autobind';
import { Draggable } from '../../shared/drag-drop';
import { Guid } from 'guid-typescript';
import Quill from 'quill';

export class ParagraphViewModel implements Draggable{

    paragraphView: HTMLTemplateElement
    id: Guid

    constructor(paragraphView: HTMLTemplateElement) {
        this.paragraphView = paragraphView;
        const child = document.createElement("img");
        child.classList.add("movible")
        child.textContent = " "
        child.contentEditable = "false"
        this.paragraphView.appendChild(child);
        this.id = Guid.create()
        this.paragraphView.addEventListener('dragstart', this.dragStartHandler)
        this.paragraphView.addEventListener('dragend', this.dragEndHandler)
        this.paragraphView.draggable = true
        this.paragraphView.contentEditable = "true"
    }

    @Autobind
    dragStartHandler(event: DragEvent): void {
        event.dataTransfer!.setData('text/plain', this.id.toString()) // copy data to dragging item
        event.dataTransfer!.effectAllowed = 'move' // we want to move data/item
    }

    @Autobind
    dragEndHandler(_: DragEvent): void {
        event?.preventDefault()
    }
}