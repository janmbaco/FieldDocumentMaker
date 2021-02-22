import { BaseComponent } from './base-component'

export interface IFactory<TModel, TComponent extends BaseComponent> {
    create(model: TModel): TComponent | null
}
