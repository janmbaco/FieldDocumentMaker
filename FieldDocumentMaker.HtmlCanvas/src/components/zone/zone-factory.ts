import { inject, injectable } from 'tsyringe'
import { FieldBindModel } from '../../state/fields/field-bind-model'
import { ParagraphModel } from '../../state/paragraphs/paragraph-model'
import { IStateManagement } from '../../state/state-management-interface'
import { ZoneModel } from '../../state/zones/zone-model'
import { BaseComponent } from '../base-component'
import { IComponentFactory } from '../component-fatory-interface'
import { ZoneComponent } from './zone-component'

@injectable()
export class ZoneFactory implements IComponentFactory<ZoneModel>{

    private stateManagement: IStateManagement
    private fieldFactory: IComponentFactory<FieldBindModel>
    private paragrphFactory: IComponentFactory<ParagraphModel>

    constructor(@inject('stateManagement') stateManagement: IStateManagement, @inject('fieldFactory') fieldFactory: IComponentFactory<FieldBindModel>, @inject('paragraphFactory') paragraphFactory: IComponentFactory<ParagraphModel>) {
        this.stateManagement = stateManagement
        this.fieldFactory = fieldFactory
        this.paragrphFactory = paragraphFactory
    }

    create(zone: ZoneModel): BaseComponent {
        if (zone.type === 'Image') {
            return new ZoneComponent<FieldBindModel>(this.stateManagement.getZoneModelObservable(zone), this.fieldFactory)
        } else {
            return new ZoneComponent<ParagraphModel>(this.stateManagement.getZoneModelObservable(zone), this.paragrphFactory)
        }
    }

}
