import { DayType } from "../day-base/day-base-component";

export type WeekDays = 'Lunes' | 'Martes' | 'Miercoles' | 'Jueves' | 'Viernes' | 'Sabado' | 'Domingo'

export interface WeekDayModel {
    name: string
    type: DayType
    dayOfWeek: WeekDays
}
