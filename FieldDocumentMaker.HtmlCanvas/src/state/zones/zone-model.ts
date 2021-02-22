import { FieldModel } from '../fields/field-model'
import { ParagraphModel } from '../paragraphs/paragraph-model'

export type ZoneColors = 'darkred' | 'ligthgreen' | 'darkblue' | 'orange' | 'darkgreen' | 'middlered'

export type ZoneTypes = 'Image' | 'Paragraph'

export interface ZoneModel {
    id: string
    label: string
    color: ZoneColors
    type: ZoneTypes
    isVisible: boolean
    elements: ParagraphModel[] | { bind: string, style: string }[]
}
