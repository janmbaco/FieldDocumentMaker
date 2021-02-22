import { Store } from '@reduxjs/toolkit'
import { ZoneReducer } from './state/zones/zone-reducer'
import { FieldReducer } from './state/fields/field-reducer'
import { StateManagement } from './state/state-management'
import { LoadingReducer } from './state/loading/loading-reducer'
import { AppState } from './state/app-state'
import { EditorFactory } from './components/editor/editor-factory'
import { ChangeField, LoadFields } from './state/fields/field-actions'
import { LoadZones, ModifyZoneColorAndLabel } from './state/zones/zone-actions'
import { FieldFactory } from './components/field/field-factory'
import { ZoneFactory } from './components/zone/zone-factory'


declare global {
    interface Document {
        store: Store<AppState>
        modifyColorAndLabel: any
        changeText: any
    }
}

const stateManagement = new StateManagement(new LoadingReducer(), new ZoneReducer(), new FieldReducer())

document.store = stateManagement.store
document.modifyColorAndLabel = ModifyZoneColorAndLabel
document.changeText = ChangeField
const editor = new EditorFactory(stateManagement, new ZoneFactory(stateManagement, new FieldFactory(stateManagement))).create(document.body)

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






