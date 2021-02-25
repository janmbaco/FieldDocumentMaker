export type FieldTypes = 'Image' | 'Text' | 'Integer' | 'Float' | 'Date' | 'Combo'

export interface FieldModel {
    label: string
    value: string
    maskedValue: string
    style: string
    bind: string
    type: FieldTypes
}
