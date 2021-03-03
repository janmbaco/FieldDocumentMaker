import { IComponent } from '../component-interface'
export interface IEditorFactory {
    create(): IComponent
}
