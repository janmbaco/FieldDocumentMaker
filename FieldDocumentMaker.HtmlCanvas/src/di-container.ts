import { container, DependencyContainer, Lifecycle } from 'tsyringe'
import { EditorFactory } from './components/editor/editor-factory'
import { IComponentFactory } from './components/component-fatory-interface'
import { FieldFactory } from './components/field/field-factory'
import { ParagraphFactory } from './components/paragraph/paragraph-factory'
import { ZoneFactory } from './components/zone/zone-factory'
import { FieldBindModel } from './state/fields/field-bind-model'
import { FieldModel } from './state/fields/field-model'
import { FieldReducer } from './state/fields/field-reducer'
import { LoadingReducer } from './state/loading/loading-reducer'
import { ParagraphModel } from './state/paragraphs/paragraph-model'
import { IReducer } from './state/reducer-interface'
import { StateManagement } from './state/state-management'
import { IStateManagement } from './state/state-management-interface'
import { ZoneModel } from './state/zones/zone-model'
import { ZoneReducer } from './state/zones/zone-reducer'
import { IEditorFactory } from './components/editor/editor-factory-interface'


export type ContainerItems = 'loadingReducer' | 'fieldReducer' | 'zoneReducer' | 'stateManagement' | 'fieldFactory' | 'paragraphFactory' | 'zoneFactory' | 'editorFactory'

export class DIContainer {


    registerFacade(): void {

        container.register<IReducer<boolean>>('loadingReducer', { useClass: LoadingReducer }, { lifecycle: Lifecycle.Singleton })
        container.register<IReducer<FieldModel[]>>('fieldReducer', { useClass: FieldReducer }, { lifecycle: Lifecycle.Singleton })
        container.register<IReducer<ZoneModel[]>>('zoneReducer', { useClass: ZoneReducer }, { lifecycle: Lifecycle.Singleton })

        container.register<IStateManagement>('stateManagement', { useClass: StateManagement }, { lifecycle: Lifecycle.Singleton })

        container.register<IComponentFactory<FieldBindModel>>('fieldFactory', { useClass: FieldFactory }, { lifecycle: Lifecycle.Singleton })
        container.register<IComponentFactory<ParagraphModel>>('paragraphFactory', { useClass: ParagraphFactory }, { lifecycle: Lifecycle.Singleton })
        container.register<IComponentFactory<ZoneModel>>('zoneFactory', { useClass: ZoneFactory }, { lifecycle: Lifecycle.Singleton })

        container.register<IEditorFactory>('editorFactory', { useClass: EditorFactory }, { lifecycle: Lifecycle.Singleton })
    }

    resolve<T>(item: ContainerItems): T {
        return container.resolve<T>(item)
    }
}
