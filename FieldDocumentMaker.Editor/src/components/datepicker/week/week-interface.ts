import { IComponent } from '../../component-interface'
import { DayModel } from '../day/day-model'

export interface IWeekComponent extends IComponent {
    Days: DayModel[]

    dayClick: (day: number) => void
}
