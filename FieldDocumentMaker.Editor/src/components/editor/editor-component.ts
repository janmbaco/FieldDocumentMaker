import './editor-style.css'
import view from './editor-template.html'
import { BaseComponent } from '../base-component'
import { Observable } from 'rxjs'
import { ZoneModel } from '../../state/zones/zone-model'
import { distinctUntilChanged } from 'rxjs/operators'
import { IComponentFactory } from '../component-fatory-interface'


export class EditorComponent extends BaseComponent {

    constructor(zonesObservable: Observable<ZoneModel[]>, zoneFactory: IComponentFactory<ZoneModel>) {
        super(view as string)
        zonesObservable.pipe(distinctUntilChanged()).subscribe(zones => {
            zones.forEach(zone => this.append(zoneFactory.create(zone)!, "zone-collection"))
        })
    }
}
