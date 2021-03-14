import { IDayComponent as IDayComponent } from './day-interface'
import { DayBaseComponent } from '../day-base/day-base-component'
import { DayModel } from './day-model'

export class DayComponent extends DayBaseComponent implements IDayComponent {

    private day: number | null = null

    dayClick: (day: number) => void = () => { }

    constructor(model: DayModel) {
        super(model.type)
        this.day = model.number
        this.Value = (model.number) ? Math.trunc(model.number).toString() : ''
        this.OnRender.push(() => {
            if (model.isCurrentDay) {
                this.HtmlElement.classList.add('currentDay')
            }
            if (model.isPreSelectedDay) {
                this.HtmlElement.classList.add('preselectedDay')
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
        if (this.IsRendered) {
            if (b) {
                this.HtmlElement.classList.add('currentDay')
            } else {
                this.HtmlElement.classList.remove('currentDay')
            }
        }
    }

    set IsPreSelectedDay(b: boolean) {
        if (this.IsRendered) {
            if (b) {
                this.HtmlElement.classList.add('preselectedDay')
            } else {
                this.HtmlElement.classList.remove('preselectedDay')
            }
        }
    }
}
