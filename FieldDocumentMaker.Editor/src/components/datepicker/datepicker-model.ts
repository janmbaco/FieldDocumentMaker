import { WeekDayModel } from './week-day/week-day-model'

export interface DatepickerModel {
    weekDays: WeekDayModel[]
    months: string[]
    rightToLeft: boolean
}
