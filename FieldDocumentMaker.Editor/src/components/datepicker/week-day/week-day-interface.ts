import { IComponent } from '../../component-interface'
import { DayType } from '../day-base/day-base-component'

export interface IWeekDayComponent extends IComponent {
    Name: string
    Type: DayType
}
