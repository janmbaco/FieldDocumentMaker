import { Guid } from 'guid-typescript'
import './field-style.css'
import templateView from './field-template.html'

export class Field{

    id: Guid
    view: HTMLSpanElement


    constructor(text: string){
        this.id = Guid.create()
        const template = document.createElement('template') as HTMLTemplateElement
        template.innerHTML = templateView
        this.view = template.content.firstElementChild as HTMLSpanElement
        this.view.innerText = text
    }
}

