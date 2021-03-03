import { configureStore, Store } from '@reduxjs/toolkit'
import { BehaviorSubject, Observable, Subject } from 'rxjs'
import { inject, injectable } from 'tsyringe'
import { Autobind } from '../decorators/autobind'
import { AppState } from './app-state'
import { ChangeFieldValue } from './fields/field-actions'
import { FieldModel } from './fields/field-model'
import { ToogleLoaded } from './loading/loading-actions'
import { IReducer } from './reducer-interface'
import { IStateManagement } from './state-management-interface'
import { SubZoneModel } from './subzones/subzone-model'
import { ZoneModel } from './zones/zone-model'

@injectable()
export class StateManagement implements IStateManagement {

    private zonesSubject = new Subject<ZoneModel[]>()
    private zoneSubjects: Map<string, BehaviorSubject<ZoneModel>>
    private subzoneSubjects: Map<string, BehaviorSubject<SubZoneModel>>
    private filedSubjects: Map<string, BehaviorSubject<FieldModel>>
    private store: Store<AppState>
    private initialized = false

    constructor(@inject('loadingReducer') loadingReducer: IReducer<boolean>, @inject('zoneReducer') zoneReducer: IReducer<ZoneModel[]>, @inject('fieldReducer') fieldReducer: IReducer<FieldModel[]>) {
        this.zoneSubjects = new Map<string, BehaviorSubject<ZoneModel>>()
        this.subzoneSubjects = new Map<string, BehaviorSubject<SubZoneModel>>()
        this.filedSubjects = new Map<string, BehaviorSubject<FieldModel>>()
        this.store = configureStore({
            reducer: {
                isLoaded: loadingReducer.reducer,
                zones: zoneReducer.reducer,
                fields: fieldReducer.reducer
            }
        })
        this.store.subscribe(this.onChangeState)
    }

    @Autobind
    private onChangeState(): void {
        const state = this.store.getState()

        if (state.fields.length > 0 && state.zones.length > 0) {
            if (!state.isLoaded) {
                this.store.dispatch(ToogleLoaded(true))
            }
        } else if (state.isLoaded) {
            this.store.dispatch(ToogleLoaded(false))
        }

        if (state.isLoaded) {

            state.fields.forEach(field => {
                if (!this.filedSubjects.has(field.bind)) {
                    this.filedSubjects.set(field.bind, new BehaviorSubject<FieldModel>(field))
                } else {
                    this.filedSubjects.get(field.bind)?.next(field)
                }
            })

            this.filedSubjects.forEach((subject, bind) => {
                if (!state.fields.some(f => f.bind === bind)) {
                    subject.complete()
                }
            })

            state.zones.forEach(zone => {
                if (!this.zoneSubjects.has(zone.id)) {
                    this.zoneSubjects.set(zone.id, new BehaviorSubject<ZoneModel>(zone))
                } else {
                    this.zoneSubjects.get(zone.id)?.next(zone)
                }
                const paragraphs = zone.elements as SubZoneModel[]
                if (paragraphs) {
                    paragraphs.forEach(paragraph => {
                        if (!this.subzoneSubjects.has(paragraph.id)) {
                            this.subzoneSubjects.set(paragraph.id, new BehaviorSubject<SubZoneModel>(paragraph))
                        } else {
                            this.subzoneSubjects.get(paragraph.id)?.next(paragraph)
                        }
                    })
                }
            })

            if (!this.initialized) {
                this.zonesSubject.next(state.zones)
                this.initialized = true
            }
        }
    }

    getZonesObservable(): Observable<ZoneModel[]> {
        return this.zonesSubject.asObservable()
    }

    getZoneModelObservable(z: ZoneModel): Observable<ZoneModel> {
        return this.zoneSubjects.get(z.id)?.asObservable()!
    }

    getFieldModelObservable(f: FieldModel): Observable<FieldModel> {
        return this.filedSubjects.get(f.bind)?.asObservable()!
    }

    getSubZoneModelObservable(p: SubZoneModel): Observable<SubZoneModel> {
        return this.subzoneSubjects.get(p.id)?.asObservable()!
    }

    getFieldByBind(bind: string): FieldModel | null {
        const fields = this.store.getState().fields
        const idx = fields.findIndex(f => f.bind === bind)
        if (idx === -1) {
            return null
        } else {
            return fields[idx]
        }
    }

    getChangeFieldValueExecute(field: FieldModel): (newValue: string) => void {
        return (newValue: string) => {
            this.store.dispatch(ChangeFieldValue({ field, newValue }))
        }
    }

    get Store(): Store<AppState> {
        return this.store
    }

}
