import './editor-style.css'
import view from './editor-template.html'
import { BaseComponent } from '../shared/base-component'
import { ImageZone, ZoneColors, ParagraphZone } from '../zone/zone-component'


export class Editor extends BaseComponent {

    zones!: Map<string, Zone>


    constructor(){
        super('editor', view as string)
    }

    async CreateImageZone(label: string, color: ZoneColors): Promise<ImageZone>{
        const zone = new ImageZone(label, color)
        await this.append(zone)
        return zone
    }

    async CreateParagraphZone(label: string, color: ZoneColors): Promise<ParagraphZone>{
        const zone = new ParagraphZone(label, color)
        await this.append(zone)
        return zone
    }
}

export async function EditorBuildOn(parent: HTMLElement): Promise<Editor>{
    const editor = new Editor()
    await editor.setParent(parent)
    return editor
}
