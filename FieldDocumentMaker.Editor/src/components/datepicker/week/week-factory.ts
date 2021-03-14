import { inject, injectable } from 'tsyringe'
import { IComponentFactory } from '../../component-factory-interface'
import { DayModel } from '../day/day-model'
import { WeekComponent } from './week-component'
import { IWeekComponent } from './week-interface'

@injectable()
export class WeekFactory implements IComponentFactory<DayModel[]> {

    private dayFactory: IComponentFactory<DayModel>

    constructor(@inject('dayFactory') dayFactory: IComponentFactory<DayModel>) {
        this.dayFactory = dayFactory
    }

    create(model: DayModel[]): IWeekComponent | null {
        return new WeekComponent(model, this.dayFactory)
    }
}
