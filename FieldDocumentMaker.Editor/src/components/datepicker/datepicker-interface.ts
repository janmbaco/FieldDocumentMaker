import { IComponent } from '../component-interface'

export interface IDatePickerComponent extends IComponent {
    Date: Date
    dateSelected: (date: Date) => void
    showBelow(component: IComponent): void
}
