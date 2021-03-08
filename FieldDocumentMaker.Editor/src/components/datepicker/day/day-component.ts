import './day-style.css'
import { IDayComponent as IDayComponent } from './day-interface'
import { DayBaseComponent } from '../day-base/day-base-component'
import { DayModel } from './day-model'

export class DayComponent extends DayBaseComponent implements IDayComponent {

    private isCurrentDay: boolean
    private day: number | null = null

    dayClick: (day: number) => void = () => { }

    constructor(model: DayModel) {
        super(model.type)
        this.Value = (model.number) ? Math.trunc(model.number).toString() : ''
        this.isCurrentDay = model.isCurrentDay
        this.OnRender.push(() => {
            if (this.isCurrentDay) {
                this.HtmlElement.classList.add('currentDay')
            }
        })

        this.on('click', '', (_, e) => {
            if (this.day) {
                this.dayClick(this.day)
            }
        })
    }

    set Number(n: number | null) {
        this.day = n!
        this.Value = (n) ? Math.trunc(n).toString() : ''
    }

    set IsCurrentDate(b: boolean) {
        this.isCurrentDay = b
        if (this.IsRendered) {
            if (b) {
                this.HtmlElement.classList.add('currentDay')
            } else {
                this.HtmlElement.classList.remove('currentDay')
            }
        }
    }
}
