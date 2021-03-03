import { IComponent } from './component-interface'

export interface IComponentFactory<TModel> {
    create(model: TModel): IComponent | null
}
