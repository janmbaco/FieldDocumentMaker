import { inject, injectable } from 'tsyringe'
import { IStateManagement } from '../../state/state-management-interface'
import { ZoneModel } from '../../state/zones/zone-model'
import { IComponentFactory } from '../component-factory-interface'
import { IComponent } from '../component-interface'
import { EditorComponent } from './editor-component'
import { IEditorFactory } from './editor-factory-interface'

@injectable()
export class EditorFactory implements IEditorFactory {

    stateManagement: IStateManagement
    zoneFactory: IComponentFactory<ZoneModel>
    constructor(@inject('stateManagement') stateManagement: IStateManagement, @inject('zoneFactory') zoneFactory: IComponentFactory<ZoneModel>) {
        this.stateManagement = stateManagement
        this.zoneFactory = zoneFactory
    }
    create(): IComponent {
        return new EditorComponent(this.stateManagement.getZonesObservable(), this.zoneFactory)
    }
}
