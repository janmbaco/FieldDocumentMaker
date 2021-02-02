import { ParagraphViewModel } from "./paragraph.viewmodel";
import { Autobind } from "../../decorators/autobind";

export class ParagraphCommands {

    paragraphs: ParagraphViewModel[];

    constructor(paragraphs: ParagraphViewModel[]){
        this.paragraphs = paragraphs
    }

    @Autobind
    onClickAction(){
        this.paragraphs.forEach(p => p.paragraphView.contentEditable = "false");
    }
}