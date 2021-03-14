interface EditorScriptManager {
    getFields(): string
    getZones(): string
    interceptFieldChange(field: any, newValue: string): any
}

declare var editorScriptManager: EditorScriptManager