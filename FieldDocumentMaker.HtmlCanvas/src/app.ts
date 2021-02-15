import { Editor, EditorBuildOn } from './components/editor/editor-component'

let editor: Editor

EditorBuildOn(document.body).then(e => {
    editor = e

    editor.CreateImageZone('Foto', 'middlered').then(z => {
        z.AddImage('/assets/foto-curriculum.png')
    })
    editor.CreateZone('Encabezados', 'orange')
    editor.CreateZone('foto', 'ligthgreen')
    editor.CreateZone('foto', 'darkgreen')
    editor.CreateZone('foto', 'darkblue')
    editor.CreateZone('foto', 'darkred')



})

