import { FieldBindModel } from "../fields/field-bind-model"
import { SubZoneModel } from "../subzones/subzone-model"

export type ZoneColors = 'darkred' | 'ligthgreen' | 'darkblue' | 'orange' | 'darkgreen' | 'middlered'

export interface ZoneModel {
    id: string
    label: string
    color: ZoneColors
    isVisible: boolean
    elements: SubZoneModel[]
}
