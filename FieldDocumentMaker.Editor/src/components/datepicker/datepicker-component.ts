import './datepicker-style.css'
import view from './datepicker-template.html'
import { BaseComponent } from '../base-component'
import { IWeekDayComponent } from './week-day/week-day-interface'
import { IWeekComponent } from './week/week-interface'
import { WeekDayModel } from './week-day/week-day-model'
import { DayModel } from './day/day-model'
import { IComponentFactory } from '../component-factory-interface'
import { Autobind } from '../../decorators/autobind'
import { IComponent } from '../component-interface'

export class DatepickerComponent extends BaseComponent {

    private monthAndYear = ''
    private weekDays: IWeekDayComponent[] = []
    private weeks: IWeekComponent[] = []
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
        this.adjustLeftOffScreen(component)
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

    private async adjustLeftOffScreen(component: IComponent): Promise<void> {
        const left = (this.HtmlElement.offsetLeft - 5) + component.HtmlElement.offsetLeft
        if (left < 0) {
            this.HtmlElement.setAttribute('style', `right:${left}px`)
        }
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
        const isCurrentMonth = this.year === this.selectedDate.getFullYear() && this.month === this.selectedDate.getMonth()
        result.push(this.dayModels.map(d => ({ number: null, type: d.type, isCurrentDay: false })))
        let j = 0
        for (let i = 0; i < totalDays; i++) {
            if (currentPosition !== undefined) {
                if (currentPosition === this.firstPosition && i > 0) {
                    result.push(this.dayModels.map(d => ({ number: null, type: d.type, isCurrentDay: false })))
                    j++
                }
                const day = i + 1
                result[j][currentPosition].number = day
                if (isCurrentMonth && day === this.selectedDate.getDate()) {
                    result[j][currentPosition].isCurrentDay = true
                }
            }
            position = position === 6 ? 0 : position + 1
            currentPosition = this.equivalentDayOfWeek.get(position)
        }
        return result

    }

}
