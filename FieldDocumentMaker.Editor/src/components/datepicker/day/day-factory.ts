
import { IComponentFactory } from '../../component-factory-interface'
import { DayComponent } from './day-component'
import { IDayComponent } from './day-interface'
import { DayModel } from './day-model'

export class DayFactory implements IComponentFactory<DayModel> {

    create(model: DayModel): IDayComponent | null {
        return new DayComponent(model)
    }
}
