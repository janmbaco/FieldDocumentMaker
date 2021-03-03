import { inject, injectable } from 'tsyringe'
import { IStateManagement } from '../../state/state-management-interface'
import { SubZoneModel } from '../../state/subzones/subzone-model'
import { ZoneModel } from '../../state/zones/zone-model'
import { IComponentFactory } from '../component-factory-interface'
import { IComponent } from '../component-interface'
import { ZoneComponent } from './zone-component'

@injectable()
export class ZoneFactory implements IComponentFactory<ZoneModel>{

    private stateManagement: IStateManagement
    private subzoneFactory: IComponentFactory<SubZoneModel>

    constructor(@inject('stateManagement') stateManagement: IStateManagement, @inject('subzoneFactory') subzoneFactory: IComponentFactory<SubZoneModel>) {
        this.stateManagement = stateManagement
        this.subzoneFactory = subzoneFactory
    }

    create(zone: ZoneModel): IComponent {
        return new ZoneComponent(this.stateManagement.getZoneModelObservable(zone), this.subzoneFactory)
    }

}
