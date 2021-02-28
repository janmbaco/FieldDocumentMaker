import { Subject, Subscription } from 'rxjs'
import { distinctUntilChanged } from 'rxjs/operators'
import { IComponent } from './component-interface'
import { createElementFromTemplate } from './shared/document-extension'

export class BaseComponent implements IComponent {
    [i: string]: any

    private static nodeTextStrings = /{{\s*([^}]*)}}/g
    private childs: IComponent[] = []
    private isRendered = false
    private viewStateActions: Map<string, Subject<string>> = new Map<string, Subject<string>>()
    private baseElement: HTMLElement
    protected subscription: Subscription | null = null

    constructor(template: string) {
        this.baseElement = createElementFromTemplate(template)
    }

    get IsRendered(): boolean {
        return this.isRendered
    }

    get HtmlElement(): HTMLElement {
        this.render()
        return this.baseElement
    }

    setInElement(element: HTMLElement): void {
        element.appendChild(this.HtmlElement)
    }

    remove(): void {
        if (this.baseElement) {

            if (this.subscription) {
                this.subscription.unsubscribe()
            }

            this.viewStateActions.forEach(values => {
                values.unsubscribe()
            })

            this.childs.forEach(element => {
                element.remove()
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
        if (this.childs.length > 0) {
            const component = this.childs.pop()
            component?.remove()
        }
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

    protected append(component: IComponent, innerClass: string | null = null): void {
        this.childs.push(component)
        if (innerClass) {
            this.render()
            const collectionZone = this.baseElement!.getElementsByClassName(innerClass)[0] as HTMLElement
            if (collectionZone) {
                collectionZone.append(component.HtmlElement)
            }
        }
    }

    protected insertOrReplace(index: number, component: IComponent, innerClass: string | null = null): void {
        if (index >= this.childs.length) {
            this.append(component, innerClass)
        } else {
            const oldcomponet = this.childs[index]
            if (oldcomponet.IsRendered) {
                oldcomponet.HtmlElement.insertAdjacentElement('afterend', component.HtmlElement)
            }
            oldcomponet.remove()
            this.childs[index] = component
        }
    }

    protected insertAndReplace(component: IComponent, element: Element): void {
        this.append(component)
        this.HtmlElement.replaceChild(component.HtmlElement, element)
    }

    protected insertInClass(className: string, element: HTMLElement) {
        const node = this.baseElement.getElementsByClassName(className)[0]!
        if (node) {
            while (node.firstChild) {
                node.removeChild(node.lastChild!)
            }
            node.appendChild(element)
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
