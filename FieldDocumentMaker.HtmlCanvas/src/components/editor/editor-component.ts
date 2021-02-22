import './editor-style.css'
import view from './editor-template.html'
import { BaseComponent } from '../base-component'
import { Observable } from 'rxjs'
import { ZoneModel } from '../../state/zones/zone-model'
import { distinctUntilChanged } from 'rxjs/operators'
import { ZoneFactory } from '../zone/zone-factory'


export class EditorComponent extends BaseComponent {

    constructor(parent: HTMLElement, zonesObservable: Observable<ZoneModel[]>, zoneFactory: ZoneFactory) {
        super('editor', view as string)
        parent.innerText = 'loading...'
        zonesObservable.pipe(distinctUntilChanged()).subscribe(zones => {
            zones.forEach(zone => this.append(zoneFactory.create(zone)))
            parent.innerText = ''
            this.setInElement(parent)
        })
    }
}
