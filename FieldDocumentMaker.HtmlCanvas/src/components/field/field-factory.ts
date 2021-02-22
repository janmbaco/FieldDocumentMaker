import { FieldModel } from '../../state/fields/field-model'
import { StateManagement } from '../../state/state-management'
import { IFactory } from '../fatory-interface'
import { ComboFieldComponent } from './combo-field/combo-field-component'
import { DateFieldComponent } from './date-field/date-field-component'
import { FieldComponent } from './field-component'
import { FloatFieldComponent } from './float-field/float-field-component'
import { ImageFieldComponent } from './image-field/image-field-component'
import { IntegerFieldComponent } from './integer-field/integer-field-component'
import { TextFieldComponent } from './text-field/text-field-component'

export class FieldFactory implements IFactory<{ bind: string, style: string }, FieldComponent> {

    stateManagement: StateManagement

    constructor(stateManagement: StateManagement) {
        this.stateManagement = stateManagement
    }

    create(model: { bind: string, style: string }): FieldComponent | null {
        const field = this.stateManagement.getFieldByBind(model.bind)
        if (field) {
            switch (field.type) {
                case 'Combo':
                    return new ComboFieldComponent(this.stateManagement.getFieldModelObservable(field))
                case 'Date':
                    return new DateFieldComponent(this.stateManagement.getFieldModelObservable(field))
                case 'Float':
                    return new FloatFieldComponent(this.stateManagement.getFieldModelObservable(field))
                case 'Image':
                    return new ImageFieldComponent(this.stateManagement.getFieldModelObservable(field))
                case 'Integer':
                    return new IntegerFieldComponent(this.stateManagement.getFieldModelObservable(field))
                case 'Text':
                    return new TextFieldComponent(this.stateManagement.getFieldModelObservable(field))
            }
        }
        return null
    }
}