import { FieldModel } from './fields/field-model'
import { ZoneModel } from './zones/zone-model'

export interface AppState{
    isLoaded: boolean
    zones: ZoneModel[]
    fields: FieldModel[]
}