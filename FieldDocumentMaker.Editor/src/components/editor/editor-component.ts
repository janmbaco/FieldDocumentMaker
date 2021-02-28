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
            let idx = 0
            zones.forEach(zone => this.insertOrReplace(idx++, zoneFactory.create(zone)!, 'zone-collection'))
            this.removeOffSetElements(this.Children.length - idx)
        })
    }
}
