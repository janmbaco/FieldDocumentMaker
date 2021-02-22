import { FieldModel } from '../../state/fields/field-model'
import { ParagraphModel } from '../../state/paragraphs/paragraph-model'
import { StateManagement } from '../../state/state-management'
import { ZoneModel } from '../../state/zones/zone-model'
import { BaseComponent } from '../base-component'
import { IFactory } from '../fatory-interface'
import { FieldComponent } from '../field/field-component'
import { FieldFactory } from '../field/field-factory'
import { ParagraphComponent } from '../paragraph/paragraph-component'
import { ParagraphFactory } from '../paragraph/paragraph-factory'
import { ZoneComponent } from './zone-component'

export class ZoneFactory implements IFactory<ZoneModel, BaseComponent>{

    stateManagement: StateManagement
    fieldFactory: FieldFactory

    constructor(stateManageMent: StateManagement, fielFactory: FieldFactory) {
        this.stateManagement = stateManageMent
        this.fieldFactory = fielFactory
    }

    create(zone: ZoneModel): BaseComponent {
        if (zone.type === 'Image') {
            return new ZoneComponent<FieldModel, FieldComponent>(this.stateManagement.getZoneModelObservable(zone), this.fieldFactory)
        } else {
            return new ZoneComponent<ParagraphModel, ParagraphComponent>(this.stateManagement.getZoneModelObservable(zone), new ParagraphFactory(this.stateManagement, this.fieldFactory))
        }
    }

}
