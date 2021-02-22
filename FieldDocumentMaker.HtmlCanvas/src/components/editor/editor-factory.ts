import { StateManagement } from '../../state/state-management'
import { IFactory } from '../fatory-interface'
import { ZoneFactory } from '../zone/zone-factory'
import { EditorComponent } from './editor-component'

export class EditorFactory implements IFactory<HTMLElement, EditorComponent>{

    stateManagement: StateManagement
    zoneFactory: ZoneFactory
    constructor(stateManagement: StateManagement, zoneFactory: ZoneFactory) {
        this.stateManagement = stateManagement
        this.zoneFactory = zoneFactory
    }
    create(parent: HTMLElement): EditorComponent {
        return new EditorComponent(parent, this.stateManagement.zonesSubject.asObservable(), this.zoneFactory)
    }
}
