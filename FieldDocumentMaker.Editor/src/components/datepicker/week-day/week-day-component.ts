import { DayBaseComponent, DayType } from '../day-base/day-base-component'

export class WeekDayComponent extends DayBaseComponent {

    constructor(name: string, type: DayType) {
        super(type)
        this.Value = name
    }

    set Name(name: string) {
        this.Value = name
    }
}
