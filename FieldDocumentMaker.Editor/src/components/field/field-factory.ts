import { inject, injectable } from 'tsyringe'
import { FieldBind } from '../../state/fields/field-model'
import { IStateManagement } from '../../state/state-management-interface'
import { IComponentFactory } from '../component-factory-interface'
import { IComponent } from '../component-interface'
import { IDatePickerComponent } from '../datepicker/datepicker-interface'
import { ComboFieldComponent } from './combo-field/combo-field-component'
import { DateFieldComponent } from './date-field/date-field-component'
import { FloatFieldComponent } from './float-field/float-field-component'
import { ImageFieldComponent } from './image-field/image-field-component'
import { IntegerFieldComponent } from './integer-field/integer-field-component'
import { TextFieldComponent } from './text-field/text-field-component'

@injectable()
export class FieldFactory implements IComponentFactory<FieldBind> {

    stateManagement: IStateManagement
    datepicker: IDatePickerComponent

    constructor(@inject('stateManagement') stateManagement: IStateManagement, @inject('datepicker') datepicker: IDatePickerComponent) {
        this.stateManagement = stateManagement
        this.datepicker = datepicker
    }

    create(model: FieldBind): IComponent | null {
        const field = this.stateManagement.getFieldByBind(model.bind)
        if (field) {
            switch (field.type) {
                case 'Combo':
                    return new ComboFieldComponent(this.stateManagement.getFieldModelObservable(field), this.stateManagement.getChangeFieldValueExecute(field))
                case 'Date':
                    return new DateFieldComponent(this.stateManagement.getFieldModelObservable(field), this.stateManagement.getChangeFieldValueExecute(field), this.datepicker)
                case 'Float':
                    return new FloatFieldComponent(this.stateManagement.getFieldModelObservable(field), this.stateManagement.getChangeFieldValueExecute(field))
                case 'Image':
                    return new ImageFieldComponent(this.stateManagement.getFieldModelObservable(field), this.stateManagement.getChangeFieldValueExecute(field))
                case 'Integer':
                    return new IntegerFieldComponent(this.stateManagement.getFieldModelObservable(field), this.stateManagement.getChangeFieldValueExecute(field))
                case 'Text':
                    return new TextFieldComponent(this.stateManagement.getFieldModelObservable(field), this.stateManagement.getChangeFieldValueExecute(field))
            }
        }
        return null
    }
}
