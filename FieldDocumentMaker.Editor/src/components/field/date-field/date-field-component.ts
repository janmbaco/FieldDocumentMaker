import './date-field-style.css'
import { FieldComponent } from '../field-component'
import { Observable } from 'rxjs'
import { DateField, FieldModel } from '../../../state/fields/field-model'
import { IDatePickerComponent } from '../../datepicker/datepicker-interface'

export class DateFieldComponent extends FieldComponent {
    public get Type(): string {
        return 'date'
    }

    date = 0
    maxDate = 0
    minDate = 0

    constructor(fieldObservable: Observable<FieldModel>, valueChanger: (newValue: string) => void, datepicker: IDatePickerComponent) {
        super(fieldObservable, valueChanger)
        this.subscription.push(fieldObservable.subscribe(field => {
            const dateField = field as DateField
            if (dateField) {
                this.date = dateField.date
                this.maxDate = dateField.maxDate
                this.minDate = dateField.minDate
            }

            if (this.IsRendered) {
                this.HtmlElement.classList.add('date-field')
            }
        }))

        this.on('click', 'value', (_, e) => {
            datepicker.showBelow(this)
            datepicker.Date = new Date(this.date)
            datepicker.dateSelected = (date: Date) => {
                this.ValueChanger(date.toDateString())
            }
            e.stopPropagation()
        })

    }
}