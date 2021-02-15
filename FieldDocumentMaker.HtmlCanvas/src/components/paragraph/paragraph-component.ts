import './paragraph-style.css'
import view from './paragraph-template.html'
import { BaseComponent } from '../shared/base-component'


export class Paragraph extends BaseComponent
{
    constructor(){
        super('paragraph', view as string)
    }
}
