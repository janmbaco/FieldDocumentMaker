export type FieldTypes = 'Image' | 'Text' | 'Integer' | 'Float' | 'Date' | 'Combo'

export interface FieldBind {
    style: string
    bind: string
}

export interface FieldBase extends FieldBind {
    label: string
    value: string
}

export interface FieldModel {
    base: FieldBase
    type: FieldTypes
}

export interface TextField extends FieldModel {
    text: string
}

export interface NumberField extends FieldModel {
    number: number
    maxValue: number
    minValue: number
}

export interface DateField extends FieldModel {
    date: number
    maxDate: number
    minDate: number
}

export interface ComboField extends FieldModel {
    class: string
}

export interface ImageField extends FieldModel {
    url: string
    width: number
    height: number
}

