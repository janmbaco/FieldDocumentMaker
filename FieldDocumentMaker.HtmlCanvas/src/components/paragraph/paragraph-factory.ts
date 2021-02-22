import { ParagraphModel } from '../../state/paragraphs/paragraph-model'
import { StateManagement } from '../../state/state-management'
import { IFactory } from '../fatory-interface'
import { FieldFactory } from '../field/field-factory'
import { ParagraphComponent } from './paragraph-component'

export class ParagraphFactory implements IFactory<ParagraphModel, ParagraphComponent> {
    stateManagement: StateManagement
    fieldFactory: FieldFactory

    constructor(stateManagement: StateManagement, fieldFactory: FieldFactory) {
        this.stateManagement = stateManagement
        this.fieldFactory = fieldFactory
    }

    create(paragraphModel: ParagraphModel): ParagraphComponent {
        return new ParagraphComponent(this.stateManagement.getParagraphModelObservable(paragraphModel), this.fieldFactory)
    }

}
