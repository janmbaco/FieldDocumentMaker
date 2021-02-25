import { EditorComponent } from "./editor-component";

export interface IEditorFactory {
    create(): EditorComponent
}
