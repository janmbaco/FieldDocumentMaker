import { Autobind } from '../../decorators/autobind';
import { Draggable } from '../../shared/drag-drop';
import { Guid } from 'guid-typescript';

export class ParagraphViewModel implements Draggable{

    paragraphView: HTMLTemplateElement
    onClickAction: () => void
    id: Guid

    // "//@id=`editor-container`/@class=`ql-editor`/p:last()"
    constructor(paragraphView: HTMLTemplateElement, onClickAction: () => void ){
        this.paragraphView = paragraphView;
        this.id = Guid.create()
        this.onClickAction = onClickAction
        this.paragraphView.addEventListener('dragstart', this.dragStartHandler)
        this.paragraphView.addEventListener('dragend', this.dragEndHandler)
        this.paragraphView.addEventListener('click', _ => { 
            onClickAction()
            this.paragraphView.contentEditable = "true"
         }),
        this.paragraphView.addEventListener('focusin', _ => this.paragraphView.contentEditable = "true"),
        this.paragraphView.addEventListener('focusout', _ => this.paragraphView.contentEditable = "false"),
        this.paragraphView.draggable = true
        this.paragraphView.contentEditable = "false"
    }

    @Autobind
    dragStartHandler(event: DragEvent): void {
        this.onClickAction()
        event.dataTransfer!.setData('text/plain', this.id.toString()) // copy data to dragging item
        event.dataTransfer!.effectAllowed = 'move' // we want to move data/item
    }

    @Autobind
    dragEndHandler(_: DragEvent): void {
        event?.preventDefault()
    }
}