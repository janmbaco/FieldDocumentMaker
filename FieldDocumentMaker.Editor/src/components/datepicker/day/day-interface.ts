import { IComponent } from '../../component-interface'
import { DayType } from '../day-base/day-base-component'

export interface IDayComponent extends IComponent {
    Number: number | null
    Type: DayType
    IsCurrentDate: boolean

    dayClick: (day: number) => void
}

