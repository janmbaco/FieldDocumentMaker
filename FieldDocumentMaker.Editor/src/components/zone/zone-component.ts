import './zone-style.css'
import view from './zone-template.html'
import { BaseComponent } from '../base-component'
import { ZoneModel, ZoneColors } from '../../state/zones/zone-model'
import { Observable } from 'rxjs'
import { distinctUntilChanged } from 'rxjs/operators'
import { IComponentFactory } from '../component-factory-interface'
import { SubZoneModel } from '../../state/subzones/subzone-model'

export class ZoneComponent extends BaseComponent {

    private color!: ZoneColors
    private label = ''
    private factory: IComponentFactory<SubZoneModel>
    private elements: SubZoneModel[] = []

    constructor(zoneObservable: Observable<ZoneModel>, factory: IComponentFactory<SubZoneModel>) {
        super(view as string)
        this.factory = factory
        zoneObservable.pipe(distinctUntilChanged()).subscribe(z => {
            this.setState(() => {
                this.color = z.color
                this.label = z.label
                this.loadElements(z.elements)
            })
        })
    }

    private loadElements(elements: SubZoneModel[]): void {
        if (elements && elements !== this.elements) {
            this.clearChildren('subzone-collection')
            elements.forEach(model => {
                const component = this.factory.create(model)
                if (component) {
                    this.appendChild(component, 'subzone-collection')
                }
            })
            this.elements = elements
        }
    }


}
