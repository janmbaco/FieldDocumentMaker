import view from './day-base-template.html'
import { BaseComponent } from '../../base-component'

export type DayType = 'business-day' | 'holiday'

export abstract class DayBaseComponent extends BaseComponent {

    private type: DayType
    private value: string

    constructor(type: DayType) {
        super(view as string)
        this.type = type
        this.value = ''
    }

    set Type(t: DayType) {
        if (t !== this.type) {
            this.setState(() => this.type = t)
        }
    }

    protected set Value(value: string) {
        if (value !== this.value) {
            this.setState(() => this.value = value)
        }
    }
}
