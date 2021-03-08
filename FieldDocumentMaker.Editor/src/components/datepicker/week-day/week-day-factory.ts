import { IComponentFactory } from '../../component-factory-interface'
import { DayType } from '../day-base/day-base-component'
import { WeekDayComponent } from './week-day-component'
import { IWeekDayComponent } from './week-day-interface'
import { WeekDayModel } from './week-day-model'

export class WeekDayFactory implements IComponentFactory<WeekDayModel> {

    create(model: WeekDayModel): IWeekDayComponent | null {
        return new WeekDayComponent(model.name, model.type)
    }
}