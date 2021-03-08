import { container, DependencyContainer, Lifecycle } from 'tsyringe'
import { EditorFactory } from './components/editor/editor-factory'
import { IComponentFactory } from './components/component-factory-interface'
import { FieldFactory } from './components/field/field-factory'
import { SubZoneFactory } from './components/subzone/subzone-factory'
import { ZoneFactory } from './components/zone/zone-factory'
import { FieldBind, FieldModel } from './state/fields/field-model'
import { FieldReducer } from './state/fields/field-reducer'
import { LoadingReducer } from './state/loading/loading-reducer'
import { IReducer } from './state/reducer-interface'
import { StateManagement } from './state/state-management'
import { IStateManagement } from './state/state-management-interface'
import { ZoneModel } from './state/zones/zone-model'
import { ZoneReducer } from './state/zones/zone-reducer'
import { IEditorFactory } from './components/editor/editor-factory-interface'
import { SubZoneModel } from './state/subzones/subzone-model'
import { WeekDayModel } from './components/datepicker/week-day/week-day-model'
import { WeekDayFactory } from './components/datepicker/week-day/week-day-factory'
import { DayModel } from './components/datepicker/day/day-model'
import { DayFactory } from './components/datepicker/day/day-factory'
import { WeekFactory } from './components/datepicker/week/week-factory'
import { DatepickerModel } from './components/datepicker/datepicker-model'
import { DatepickerFactory } from './components/datepicker/datepicker-factory'
import { IDatePickerComponent } from './components/datepicker/datepicker-interface'


export type ContainerItems = 'loadingReducer' | 'fieldReducer' | 'zoneReducer' | 'stateManagement' | 'fieldFactory' | 'subzoneFactory' | 'zoneFactory' | 'editorFactory'



export class DIContainer {

    registerFacade(): void {

        container.register<IReducer<boolean>>('loadingReducer', { useClass: LoadingReducer }, { lifecycle: Lifecycle.Singleton })
        container.register<IReducer<FieldModel[]>>('fieldReducer', { useClass: FieldReducer }, { lifecycle: Lifecycle.Singleton })
        container.register<IReducer<ZoneModel[]>>('zoneReducer', { useClass: ZoneReducer }, { lifecycle: Lifecycle.Singleton })

        container.register<IStateManagement>('stateManagement', { useClass: StateManagement }, { lifecycle: Lifecycle.Singleton })

        container.register<IComponentFactory<WeekDayModel>>('weekDayFactory', { useClass: WeekDayFactory }, { lifecycle: Lifecycle.Singleton })
        container.register<IComponentFactory<DayModel>>('dayFactory', { useClass: DayFactory }, { lifecycle: Lifecycle.Singleton })
        container.register<IComponentFactory<DayModel[]>>('weekFactory', { useClass: WeekFactory }, { lifecycle: Lifecycle.Singleton })
        container.register<IComponentFactory<DatepickerModel>>('datepickerFactory', { useClass: DatepickerFactory }, { lifecycle: Lifecycle.Singleton })

        container.register<IComponentFactory<FieldBind>>('fieldFactory', { useClass: FieldFactory }, { lifecycle: Lifecycle.Singleton })
        container.register<IComponentFactory<SubZoneModel>>('subzoneFactory', { useClass: SubZoneFactory }, { lifecycle: Lifecycle.Singleton })
        container.register<IComponentFactory<ZoneModel>>('zoneFactory', { useClass: ZoneFactory }, { lifecycle: Lifecycle.Singleton })

        container.register<IDatePickerComponent>('datepicker', { useValue: this.datepickerComponentResolver() })

        container.register<IEditorFactory>('editorFactory', { useClass: EditorFactory }, { lifecycle: Lifecycle.Singleton })

    }

    resolve<T>(item: ContainerItems): T {
        return container.resolve<T>(item)
    }

    private datepickerComponentResolver(): IDatePickerComponent {
        const factory = container.resolve<IComponentFactory<DatepickerModel>>('datepickerFactory')
        return factory.create({
            months: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
            weekDays: [
                { dayOfWeek: 'Lunes', type: 'business-day', name: 'Lun' },
                { dayOfWeek: 'Martes', type: 'business-day', name: 'Mar' },
                { dayOfWeek: 'Miercoles', type: 'business-day', name: 'Mié' },
                { dayOfWeek: 'Jueves', type: 'business-day', name: 'Jue' },
                { dayOfWeek: 'Viernes', type: 'business-day', name: 'Vie' },
                { dayOfWeek: 'Sabado', type: 'holiday', name: 'Sáb' },
                { dayOfWeek: 'Domingo', type: 'holiday', name: 'Dom' }
            ],
            rightToLeft: false
        }) as IDatePickerComponent
    }
}
