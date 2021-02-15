import { Paragraph } from '../paragraph/paragraph-component'
import { BaseComponent } from '../shared/base-component'
import './zone-style.css'
import view from './zone-template.html'


export type ZoneColors = 'darkred' | 'ligthgreen' | 'darkblue' | 'orange' | 'darkgreen' | 'middlered'

export type ZoneTypes = 'Images' | 'Paragraphs'


abstract class Zone extends BaseComponent{

    color: string
    label: string

    constructor(label: string, color: ZoneColors){
        super('zone', view as string)
        this.color = color
        this.label = label
    }
}

export class ImageZone extends Zone{

    private type: ZoneTypes = 'Images'

    async AddImage(urlPath: string): Promise<void> {

    }

}


export class ParagraphZone extends Zone{

    private type: ZoneTypes = 'Paragraphs'


    async AddParagraph(text: string): Promise<void>{

    }

}


