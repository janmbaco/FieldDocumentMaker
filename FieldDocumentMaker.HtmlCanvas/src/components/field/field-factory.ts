import { inject, injectable } from 'tsyringe'
import { FieldBindModel } from '../../state/fields/field-bind-model'
import { IStateManagement } from '../../state/state-management-interface'
import { IComponentFactory } from '../component-fatory-interface'
import { ComboFieldComponent } from './combo-field/combo-field-component'
import { DateFieldComponent } from './date-field/date-field-component'
import { FieldComponent } from './field-component'
import { FloatFieldComponent } from './float-field/float-field-component'
import { ImageFieldComponent } from './image-field/image-field-component'
import { IntegerFieldComponent } from './integer-field/integer-field-component'
import { TextFieldComponent } from './text-field/text-field-component'

@injectable()
export class FieldFactory implements IComponentFactory<FieldBindModel> {

    stateManagement: IStateManagement

    constructor(@inject('stateManagement') stateManagement: IStateManagement) {
        this.stateManagement = stateManagement
    }

    create(model: FieldBindModel): FieldComponent | null {
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