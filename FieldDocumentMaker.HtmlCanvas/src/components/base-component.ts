import { Subject, Subscription } from 'rxjs'
import { distinctUntilChanged } from 'rxjs/operators'
import { IComponent } from './component-interface'
import { createElementFromTemplate } from './shared/document-extension'

export class BaseComponent implements IComponent {
    [i: string]: any

    private static nodeTextStrings = /{{\s*([^}]*)}}/g
    private name: string
    private childs: Map<string, IComponent[]> = new Map<string, IComponent[]>()
    private isRendered = false
    private viewStateActions: Map<string, Subject<string>> = new Map<string, Subject<string>>()
    private baseElement: HTMLElement
    protected subscription: Subscription | null = null

    constructor(name: string, template: string) {
        this.name = name
        this.baseElement = createElementFromTemplate(template)
    }

    get Name(): string {
        return this.name
    }

    get HtmlElement(): HTMLElement {
        this.render()
        return this.baseElement
    }

    setInElement(element: HTMLElement): void {
        element.appendChild(this.HtmlElement)
    }

    setInstanceOfElement(parent: HTMLElement, child: Element): void {
        parent.replaceChild(this.HtmlElement, child)
    }


    remove(): void {
        if (this.baseElement) {

            if (this.subscription) {
                this.subscription.unsubscribe()
            }

            this.viewStateActions.forEach(values => {
                values.unsubscribe()
            })

            this.childs.forEach(values => {
                values.forEach(element => {
                    element.remove()
                })
            })
            this.baseElement.remove()
        }
    }

    render(): void {
        if (!this.isRendered) {
            this.compileTemplate()
            this.isRendered = true
        }
    }
    protected setState(func: () => void = () => { }): void {
        func()
        for (const property in this) {
            if (this.hasOwnProperty(property)) {
                const key = '{{' + property + '}}'
                if (this.viewStateActions.has(key)) {
                    this.viewStateActions.get(key)?.next(this[property])
                }
            }
        }
    }

    protected removeLastChild(type: string): void {
        if (this.childs.has(type)) {
            const component = this.childs.get(type)?.pop()
            component?.remove()
        }
    }

    protected setInInnerClass(className: string, element: Element): void {
        this.render()
        this.baseElement.getElementsByClassName(className)![0].append(element)
    }

    protected focus(): void {
        if (this.baseElement) {
            this.baseElement.focus()
        }
    }

    protected onClick(func: (e: MouseEvent) => void): void {
        if (this.baseElement) {
            this.baseElement.addEventListener('click', func)
        }
    }

    protected append(component: IComponent): void {
        this.render()
        const collectionZone = this.baseElement!.getElementsByClassName(component.Name + '-collection')[0] as HTMLElement
        if (collectionZone) {
            if (!this.childs.has(component.Name)) {
                this.childs.set(component.Name, [])
            }
            this.childs.get(component.Name)!.push(component)
            collectionZone.append(component.HtmlElement)
        } else {
            throw new Error(`the ${this.name} type can't append ${component.Name} types`)
        }
    }

    protected insertOrReplace(index: number, component: IComponent): void {
        this.render()
        const collectionZone = this.baseElement!.getElementsByClassName(component.Name + '-collection')[0] as HTMLElement
        if (collectionZone) {
            if (!this.childs.has(component.Name) || index >= this.childs.get(component.Name)!.length) {
                this.append(component)
            } else {
                const beforeComponent = this.childs.get(component.Name)![index]
                this.collectionZone.insertBefore(component.HtmlElement, beforeComponent.HtmlElement)
                beforeComponent.remove()
                this.childs.get(component.Name)![index] = component
            }
        }
    }


    private compileTemplate(): void {
        this.compileElement(this.baseElement)
        this.setState()
    }

    private compileElement(element: Element): void {

        this.compileAttributes(element)

        Array.from(element.children).forEach(child => {
            this.compileElement(child as Element)
        })

        Array.from(element.childNodes).forEach(node => {
            if (node.nodeType === Node.TEXT_NODE && node.textContent) {
                this.createStateActions(node.textContent, result => node.textContent = result)
            }
        })
    }

    private compileAttributes(element: Element): void {
        Array.from(element.attributes).forEach(attr => {
            if (attr.value) {
                this.createStateActions(attr.value, result => attr.value = result)
            }
        })
    }

    private createStateActions(mask: string, func: (result: string) => void): void {
        const match = mask.match(BaseComponent.nodeTextStrings)
        if (match) {
            match.forEach(m => {
                if (!this.viewStateActions.has(m)) {
                    this.viewStateActions.set(m, new Subject<string>())
                }
                if (this[m.replace('{{', '').replace('}}', '')]) {
                    this.viewStateActions.get(m)?.pipe(distinctUntilChanged()).subscribe(_ => {
                        let result: string = mask
                        match.forEach(prop => {
                            const propName = prop.replace('{{', '').replace('}}', '')
                            if (this[propName]) {
                                result = result.replace(prop, this[propName])
                            }
                        })
                        func(result)
                    })
                }
            })
        }
    }
}
