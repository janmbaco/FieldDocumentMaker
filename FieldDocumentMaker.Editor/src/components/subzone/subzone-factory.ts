import { inject, injectable } from 'tsyringe'
import { FieldBindModel } from '../../state/fields/field-bind-model'
import { IStateManagement } from '../../state/state-management-interface'
import { SubZoneModel } from '../../state/subzones/subzone-model'
import { IComponentFactory } from '../component-fatory-interface'
import { SubZoneComponent } from './subzone-component'

@injectable()
export class SubZoneFactory implements IComponentFactory<SubZoneModel> {
    stateManagement: IStateManagement
    fieldFactory: IComponentFactory<FieldBindModel>

    constructor(@inject('stateManagement') stateManagement: IStateManagement, @inject('fieldFactory') fieldFactory: IComponentFactory<FieldBindModel>) {
        this.stateManagement = stateManagement
        this.fieldFactory = fieldFactory
    }

    create(SubZoneModel: SubZoneModel): SubZoneComponent {
        return new SubZoneComponent(this.stateManagement.getSubZoneModelObservable(SubZoneModel), this.fieldFactory)
    }

}
