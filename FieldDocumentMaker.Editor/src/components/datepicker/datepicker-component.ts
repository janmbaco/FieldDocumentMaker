import './datepicker-style.css'
import view from './datepicker-template.html'
import { BaseComponent } from '../base-component'
import { IWeekComponent } from './week/week-interface'
import { WeekDayModel } from './week-day/week-day-model'
import { DayModel } from './day/day-model'
import { IComponentFactory } from '../component-factory-interface'
import { Autobind } from '../../decorators/autobind'
import { IComponent } from '../component-interface'
import { IDatePickerComponent } from './datepicker-interface'

export class DatepickerComponent extends BaseComponent implements IDatePickerComponent {

    private monthAndYear = ''
    private weekFactory: IComponentFactory<DayModel[]>
    private monthLabels: string[]
    private daysOfWeek = ['Domingo', 'Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sabado']
    private equivalentDayOfWeek: Map<number, number>
    private month = 0
    private year = 0
    private selectedDate: Date = new Date()
    private isSelectedDate = false
    private firstPosition = 0
    private dayModels: WeekDayModel[]


    dateSelected: (date: Date) => void = (date: Date) => { }


    constructor(weekDayModels: WeekDayModel[], monthLabels: string[], rightToLeft: boolean, weekDayFactory: IComponentFactory<WeekDayModel>, weekFactory: IComponentFactory<DayModel[]>) {
        super(view as string)
        this.weekFactory = weekFactory
        this.firstPosition = rightToLeft ? weekDayModels.length - 1 : 0
        this.dayModels = rightToLeft ? weekDayModels.reverse() : weekDayModels
        this.monthLabels = monthLabels
        this.equivalentDayOfWeek = new Map<number, number>(this.dayModels.map((d, i) => [this.daysOfWeek.indexOf(d.dayOfWeek)!, i]))
        this.dayModels.forEach(m => this.appendChild(weekDayFactory.create(m)!, 'week-days-collection'))
        this.Date = this.selectedDate
        this.on('click', '', (_, e) => {
            if (!this.isSelectedDate) {
                e.stopPropagation()
            }
        })
        this.on('click', 'month-before', (_, e) => {
            this.year = this.month > 0 ? this.year : this.year - 1
            this.month = this.month === 0 ? 11 : this.month - 1
            this.buildCalendar()
            e.stopPropagation()
        })

        this.on('click', 'month-after', (_, e) => {
            this.year = this.month < 11 ? this.year : this.year + 1
            this.month = this.month === 11 ? 0 : this.month + 1
            this.buildCalendar()
            e.stopPropagation()
        })
    }

    showBelow(component: IComponent): void {
        const listener = () => {
            if (this.HtmlElement.parentElement === component.HtmlElement) {
                component.HtmlElement.removeChild(this.HtmlElement)
            }
            document.removeEventListener('click', listener)
        }
        this.HtmlElement.removeAttribute('style')
        component.HtmlElement.append(this.HtmlElement)
        this.adjustPosition(component)
        document.addEventListener('click', listener)
    }

    set Date(date: Date) {
        this.isSelectedDate = false
        this.selectedDate = date
        this.year = date.getFullYear()
        this.month = date.getMonth()
        this.buildCalendar()
    }

    private buildCalendar(): void {

        this.setState(() => this.monthAndYear = `${this.monthLabels[this.month]} - ${this.year}`)
        this.loadDays(this.getMonthArray())
    }

    private async adjustPosition(component: IComponent): Promise<void> {
        const top = component.HtmlElement.clientHeight
        let left = this.HtmlElement.clientWidth / 2 - component.HtmlElement.clientWidth / 2
        if (left > component.HtmlElement.offsetLeft) {
            left = component.HtmlElement.offsetLeft - 5
        }
        const offsetRight = component.HtmlElement.offsetLeft - left + this.HtmlElement.clientWidth
        if (offsetRight > document.documentElement.clientWidth) {
            left += offsetRight - (document.documentElement.clientWidth - 10)
        }
        this.HtmlElement.setAttribute('style', `top:${top};left:-${left}px`)
    }

    private loadDays(weeks: DayModel[][]): void {
        const weekComponents = this.getChildren('weeks-collection')
        weeks.zip(weekComponents).map(w => ({ component: w[1] !== [] ? w[1] : undefined, model: w[0] })).forEach(this.buildWeek)
    }

    @Autobind
    private buildWeek(zipped: { component: IWeekComponent, model: DayModel[] }): void {
        if (zipped.component && zipped.model) {
            zipped.component.Days = zipped.model
        } else if (zipped.model) {
            const weekComponent = this.weekFactory.create(zipped.model)! as IWeekComponent
            weekComponent.dayClick = this.onDayClik
            this.appendChild(weekComponent, 'weeks-collection')
        } else {
            this.removeChild(zipped.component, 'weeks-collection')
        }
    }

    @Autobind
    private onDayClik(day: number): void {
        this.isSelectedDate = true
        this.dateSelected(new Date(this.year, this.month, day))
    }

    private getMonthArray(): DayModel[][] {
        const result: DayModel[][] = []
        const totalDays = new Date(this.year, this.month + 1, 0).getDate()
        let position = new Date(this.year, this.month, 1).getDay()
        let currentPosition = this.equivalentDayOfWeek.get(position)
        const ispreSelectedMonth = this.year === this.selectedDate.getFullYear() && this.month === this.selectedDate.getMonth()
        const today = new Date()
        const isCurrentMonth = this.year === today.getFullYear() && this.month === today.getMonth()
        let j = -1
        let day = 0
        let initialWeek = true
        while (++day <= totalDays) {
            if (currentPosition !== undefined) {
                if (initialWeek || currentPosition === this.firstPosition) {
                    result.push(this.dayModels.map(d => ({ number: null, type: d.type, isCurrentDay: false, isPreSelectedDay: false })))
                    initialWeek = false
                    j++
                }
                result[j][currentPosition].number = day
                if (ispreSelectedMonth && day === this.selectedDate.getDate()) {
                    result[j][currentPosition].isPreSelectedDay = true
                }
                if (isCurrentMonth && day === today.getDate()) {
                    result[j][currentPosition].isCurrentDay = true
                }
            }
            position = position === 6 ? 0 : position + 1
            currentPosition = this.equivalentDayOfWeek.get(position)
        }
        return result

    }

}
