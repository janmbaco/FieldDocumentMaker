import { inject, injectable } from 'tsyringe'
import { FieldBind } from '../../state/fields/field-model'
import { IStateManagement } from '../../state/state-management-interface'
import { SubZoneModel } from '../../state/subzones/subzone-model'
import { IComponentFactory } from '../component-factory-interface'
import { IComponent } from '../component-interface'
import { SubZoneComponent } from './subzone-component'

@injectable()
export class SubZoneFactory implements IComponentFactory<SubZoneModel> {
    stateManagement: IStateManagement
    fieldFactory: IComponentFactory<FieldBind>

    constructor(@inject('stateManagement') stateManagement: IStateManagement, @inject('fieldFactory') fieldFactory: IComponentFactory<FieldBind>) {
        this.stateManagement = stateManagement
        this.fieldFactory = fieldFactory
    }

    create(SubZoneModel: SubZoneModel): IComponent {
        return new SubZoneComponent(this.stateManagement.getSubZoneModelObservable(SubZoneModel), this.fieldFactory)
    }

}
