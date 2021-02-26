import { Store } from '@reduxjs/toolkit'
import { Observable } from 'rxjs'
import { AppState } from './app-state'
import { FieldModel } from './fields/field-model'
import { ParagraphModel } from './paragraphs/paragraph-model'
import { ZoneModel } from './zones/zone-model'

export interface IStateManagement {
    Store: Store<AppState>
    getZonesObservable(): Observable<ZoneModel[]>
    getZoneModelObservable(z: ZoneModel): Observable<ZoneModel>
    getFieldModelObservable(f: FieldModel): Observable<FieldModel>
    getParagraphModelObservable(p: ParagraphModel): Observable<ParagraphModel>
    getFieldByBind(bind: string): FieldModel | null
}
