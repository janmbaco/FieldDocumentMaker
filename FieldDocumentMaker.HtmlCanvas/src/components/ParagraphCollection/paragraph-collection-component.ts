import './paragraph-collection-style.css'
import templateView from './paragraph-collection-template.html'
import { Autobind } from "../../decorators/autobind";
import { Guid } from 'guid-typescript';

export class ParagraphCollection
{
    private view: HTMLDivElement
    private paragraphs: Paragraph[] = []
}