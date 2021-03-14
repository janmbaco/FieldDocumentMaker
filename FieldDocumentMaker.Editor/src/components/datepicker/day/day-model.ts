import { DayType } from '../day-base/day-base-component'

export interface DayModel {
    number: number | null
    type: DayType
    isCurrentDay: boolean
    isPreSelectedDay: boolean
}
