import './paragraph-style.css'
import templateView from './paragraph-template.html'
import { Autobind } from "../../decorators/autobind";
import { Guid } from 'guid-typescript';


export class Paragraph
{
    id: Guid
    private view: HTMLDivElement
    private top: HTMLDivElement
    private bottom: HTMLDivElement
    private innerParagraph: HTMLParagraphElement
    enter: () => void = () => {}
    dragging: (uid: Guid) => void = () => {}

    constructor(text?: string){
        this.id = Guid.create()
        const template = document.createElement("template") as HTMLTemplateElement
        template.innerHTML = templateView
        this.view = template.content.firstElementChild as HTMLDivElement
        this.top = this.view.getElementsByClassName("top")[0] as HTMLDivElement
        this.bottom = this.view.getElementsByClassName("bottom")[0] as HTMLDivElement
        this.innerParagraph = this.view.getElementsByClassName("innerParagraph")[0] as HTMLDivElement

        this.view.addEventListener('mouseenter', _ => this.view.classList.add("reborder"))
        this.view.addEventListener('mouseleave', _ => this.view.classList.remove("reborder"))

        this.top.addEventListener('mouseenter', _ => this.togleDraggable(true))
        this.top.addEventListener('mouseleave', _ => this.togleDraggable(false))

        this.bottom.addEventListener('mouseenter', _ => this.togleDraggable(true))
        this.bottom.addEventListener('mouseleave', _ => this.togleDraggable(false))

        this.view.addEventListener('dragstart', this.dragStartHandler)
        this.view.addEventListener('dragend', this.dragEndHandler)

        this.innerParagraph.innerText = text ? text : ''

        this.innerParagraph.addEventListener('keydown', e => {
            console.log(e.key)
            if(e.key === 'Enter'){
                e.preventDefault()
                this.enter()
            }
        })
    }



    focus(){
        this.innerParagraph.focus();
    }

    AsHtmlElement() :  HTMLElement{
        return this.view
    }

    @Autobind
    private togleDraggable(option: boolean){
        this.view.draggable = option;
    }

    @Autobind
    private dragStartHandler(event: DragEvent): void {
        if(event.target == this.view){
            this.view.classList.add("dragging")
            event.dataTransfer?.setData('text/plain', '#paragraph#')
            event.dataTransfer!.effectAllowed = 'move' 
            this.dragging(this.id)
        }
        
    }

    @Autobind
    private dragEndHandler(event: DragEvent): void {
        if(event.target == this.view){
            this.view.classList.remove("dragging")
        }
    }

}