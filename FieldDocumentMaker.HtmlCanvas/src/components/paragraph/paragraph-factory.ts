import { inject, injectable } from 'tsyringe'
import { FieldBindModel } from '../../state/fields/field-bind-model'
import { ParagraphModel } from '../../state/paragraphs/paragraph-model'
import { IStateManagement } from '../../state/state-management-interface'
import { IComponentFactory } from '../component-fatory-interface'
import { ParagraphComponent } from './paragraph-component'

@injectable()
export class ParagraphFactory implements IComponentFactory<ParagraphModel> {
    stateManagement: IStateManagement
    fieldFactory: IComponentFactory<FieldBindModel>

    constructor(@inject('stateManagement') stateManagement: IStateManagement, @inject('fieldFactory') fieldFactory: IComponentFactory<FieldBindModel>) {
        this.stateManagement = stateManagement
        this.fieldFactory = fieldFactory
    }

    create(paragraphModel: ParagraphModel): ParagraphComponent {
        return new ParagraphComponent(this.stateManagement.getParagraphModelObservable(paragraphModel), this.fieldFactory)
    }

}
