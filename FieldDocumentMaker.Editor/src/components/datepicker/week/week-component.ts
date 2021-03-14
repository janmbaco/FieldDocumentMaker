import view from './week-template.html'
import { BaseComponent } from '../../base-component'
import { IDayComponent } from '../day/day-interface'
import { DayModel } from '../day/day-model'
import { IComponentFactory } from '../../component-factory-interface'
import { Autobind } from '../../../decorators/autobind'


export class WeekComponent extends BaseComponent {

    dayClick: (day: number) => void = () => { }

    constructor(daysModels: DayModel[], factory: IComponentFactory<DayModel>) {
        super(view as string)
        daysModels.forEach(m => {
            const dayComponent = factory.create(m)! as IDayComponent
            dayComponent.dayClick = (d) => this.dayClick(d)
            this.appendChild(dayComponent, 'days-collection')
        })
    }

    set Days(days: DayModel[]) {
        const dayComponents = this.getChildren('days-collection')
        days.zip(dayComponents).map(d => ({ component: d[1] !== [] ? d[1] : undefined, model: d[0] })).forEach(this.setDay)
    }

    @Autobind
    private setDay(zipped: { component: IDayComponent, model: DayModel }): void {
        if (zipped.component) {
            zipped.component.Number = zipped.model.number
            zipped.component.Type = zipped.model.type
            zipped.component.IsCurrentDate = zipped.model.isCurrentDay
            zipped.component.IsPreSelectedDay = zipped.model.isPreSelectedDay
        }
    }
}
