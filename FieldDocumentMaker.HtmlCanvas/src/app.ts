import 'reflect-metadata'
import { Store } from '@reduxjs/toolkit'
import { AppState } from './state/app-state'
import { LoadFields } from './state/fields/field-actions'
import { LoadZones } from './state/zones/zone-actions'
import { IStateManagement } from './state/state-management-interface'
import { DIContainer } from './di-container'
import { IEditorFactory } from './components/editor/editor-factory-interface'


declare global {
    interface Document {
        store: Store<AppState>
        modifyColorAndLabel: any
        changeText: any
    }
}

class App {
    static main(): void {
        const container = new DIContainer()

        container.registerFacade()

        document.store = container.resolve<IStateManagement>('stateManagement').Store

        const editor = container.resolve<IEditorFactory>('editorFactory').create()

        editor.setInElement(document.body)

    }
}

setTimeout(() => {
    App.main()

    document.store.dispatch(LoadFields(
        [
            {
                label: 'foto',
                value: '',
                maskedValue: 'C:\\image\\foto.png',
                style: '',
                bind: 'foto',
                type: 'Image'
            },
            {
                label: 'texto',
                value: 'esto es texto',
                maskedValue: 'Esto es Texto',
                style: '',
                bind: 'texto1',
                type: 'Text'
            }
        ])
    )


    document.store.dispatch(LoadZones(
        [
            {
                id: '1',
                color: 'orange',
                label: 'Uno',
                isVisible: true,
                elements: [{ bind: 'foto', style: '' }],
                type: 'Image'
            },
            {
                id: '2',
                color: 'darkblue',
                label: 'Dos',
                isVisible: true,
                elements: [{
                    id: '1',
                    template: '<p>Hola mundo: <field bind="texto1" style=""></field> esto es lo posterior a un texto</p>',
                    IsVisible: true

                }],
                type: 'Paragraph'
            },
            {
                id: '3',
                color: 'darkred',
                label: 'tres',
                isVisible: true,
                elements: [{
                    id: '2',
                    template: '<p>otro bonito texto guay <field bind="texto1" style=""></field> por ejemplo</p>',
                    IsVisible: true

                }],
                type: 'Paragraph'
            }
        ]
    ))
})
