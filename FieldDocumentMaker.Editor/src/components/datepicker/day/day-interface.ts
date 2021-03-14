import { IComponent } from '../../component-interface'
import { DayType } from '../day-base/day-base-component'

export interface IDayComponent extends IComponent {
    Number: number | null
    Type: DayType
    IsCurrentDate: boolean
    IsPreSelectedDay: boolean

    dayClick: (day: number) => void
}

