import { inject, injectable } from 'tsyringe'
import { IComponentFactory } from '../component-factory-interface'
import { DatepickerComponent } from './datepicker-component'
import { IDatePickerComponent } from './datepicker-interface'
import { DatepickerModel } from './datepicker-model'
import { DayModel } from './day/day-model'
import { WeekDayModel } from './week-day/week-day-model'
@injectable()
export class DatepickerFactory implements IComponentFactory<DatepickerModel> {

    private weekDayFactory: IComponentFactory<WeekDayModel>
    private weekFactory: IComponentFactory<DayModel[]>

    constructor(@inject('weekDayFactory') weekDayFactory: IComponentFactory<WeekDayModel>, @inject('weekFactory') weekFactory: IComponentFactory<DayModel[]>) {
        this.weekDayFactory = weekDayFactory
        this.weekFactory = weekFactory
    }

    create(model: DatepickerModel): IDatePickerComponent | null {
        return new DatepickerComponent(model.weekDays, model.months, model.rightToLeft, this.weekDayFactory, this.weekFactory)
    }
}
