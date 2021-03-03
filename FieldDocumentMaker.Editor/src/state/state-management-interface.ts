import { Store } from '@reduxjs/toolkit'
import { Observable } from 'rxjs'
import { AppState } from './app-state'
import { FieldModel } from './fields/field-model'
import { SubZoneModel } from './subzones/subzone-model'
import { ZoneModel } from './zones/zone-model'

export interface IStateManagement {
    Store: Store<AppState>
    getZonesObservable(): Observable<ZoneModel[]>
    getZoneModelObservable(z: ZoneModel): Observable<ZoneModel>
    getFieldModelObservable(f: FieldModel): Observable<FieldModel>
    getSubZoneModelObservable(s: SubZoneModel): Observable<SubZoneModel>
    getFieldByBind(bind: string): FieldModel | null
    getChangeFieldValueExecute(field: FieldModel): (newValue: string) => void
}
