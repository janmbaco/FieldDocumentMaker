import './zone-style.css'
import view from './zone-template.html'
import { BaseComponent } from '../base-component'
import { ZoneModel, ZoneColors, ZoneTypes } from '../../state/zones/zone-model'
import { Observable } from 'rxjs'
import { distinctUntilChanged } from 'rxjs/operators'
import { IComponentFactory } from '../component-fatory-interface'

export class ZoneComponent<TModel> extends BaseComponent {

    color!: ZoneColors
    label = ''
    type!: ZoneTypes
    factory: IComponentFactory<TModel>
    elements: TModel[] = []

    constructor(zoneObservable: Observable<ZoneModel>, factory: IComponentFactory<TModel>) {
        super('zone', view as string)
        this.factory = factory
        zoneObservable.pipe(distinctUntilChanged()).subscribe(z => {
            this.setState(() => {
                this.color = z.color
                this.label = z.label
                this.type = z.type
                this.loadElements(z.elements as unknown as TModel[])
            })
        })
    }

    private loadElements(elements: TModel[]): void {
        if (elements && elements !== this.elements) {
            let idx = 0
            elements.forEach(model => {
                const createNew = idx >= this.elements.length
                const mustReplace = !createNew && model !== this.elements[idx]
                if (createNew || mustReplace) {
                    const component = this.factory.create(model)
                    if (component) {
                        this.insertOrReplace(idx, component)
                    }
                }
                idx++
            })
            this.removeOffSetElements(this.type, this.elements.length - elements.length)
            this.elements = elements
        }
    }

    protected removeOffSetElements(type: string, offset: number): void {
        while (offset > 0) {
            this.removeLastChild(type)
            offset--
        }
    }
}