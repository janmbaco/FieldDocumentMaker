import { Subject, Subscription } from 'rxjs'
import { distinctUntilChanged } from 'rxjs/operators'
import { IComponent } from './component-interface'

export class BaseComponent implements IComponent {
    [i: string]: any

    private static nodeTextStrings = /{{\s*([^}]*)}}/g
    private children: Map<string, IComponent[]> = new Map<string, IComponent[]>()
    private isRendered = false
    private viewStateActions: Map<string, Subject<string>> = new Map<string, Subject<string>>()
    private baseElement: HTMLElement
    private onRender: (() => void)[] = []
    protected subscription: Subscription[] = []

    constructor(template: string) {
        this.baseElement = document.createElementFromTemplate(template)
    }

    get IsRendered(): boolean {
        return this.isRendered
    }

    get HtmlElement(): HTMLElement {
        this.render()
        return this.baseElement
    }

    get OnRender(): (() => void)[] {
        return this.onRender
    }

    setInElement(element: HTMLElement): void {
        element.appendChild(this.HtmlElement)
    }

    remove(): void {
        if (this.baseElement) {

            if (this.subscription) {
                this.subscription.forEach(s => s.unsubscribe())
            }

            this.viewStateActions.forEach(values => {
                values.unsubscribe()
            })

            this.children.forEach(element => {
                element.forEach(e => e.remove())
            })
            Array.from(this.children.keys()).forEach(k => this.children.delete(k))

            this.baseElement.remove()
        }
    }


    protected appendChild(component: IComponent, innerClass: string = 'none'): void {

        this.render()
        if (!this.children.has(innerClass)) {
            this.children.set(innerClass, [])
        }
        this.children.get(innerClass)?.push(component)

        const collectionZone = this.getElement(innerClass)
        if (collectionZone) {
            collectionZone.append(component.HtmlElement)
        }
    }

    protected removeChild(child: IComponent, className: string = 'none'): void {
        if (this.children.has(className)) {
            const i = this.children.get(className)!.indexOf(child)
            if (i > -1) {
                this.children.get(className)!.splice(i, 1)

            }
        }
        child.remove()
    }

    protected getChildren(className: string = 'none'): IComponent[] {
        let result: IComponent[] = []
        if (this.children.has(className)) {
            result = this.children.get(className)!
        }
        return result
    }

    protected removeLastChild(className: string = 'none'): void {
        if (this.children.get(className)!.length > 0) {
            const component = this.children.get(className)!.pop()
            component?.remove()
        }
    }

    protected clearChildren(className: string = 'none'): void {
        if (this.children.has(className)) {
            this.children.get(className)!.forEach(c => c.remove())
            this.children.delete(className)
        }
    }

    render(): void {
        if (!this.isRendered) {
            this.compileTemplate()
            this.isRendered = true
            this.onRender.forEach(f => f())
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


    protected focus(className: string): void {
        const element = this.getElement(className)
        if (element) {
            element.focus()
        }
    }

    protected on<K extends keyof HTMLElementEventMap>(type: K, className: string, func: (elemnet: HTMLElement, e: HTMLElementEventMap[K]) => void): void {
        let element: HTMLElement
        if (className === '') {
            element = this.baseElement
        } else {
            element = this.getElement(className)!
        }
        if (element) {
            element.addEventListener(type, (e) => func(element, e))
        }
    }

    protected insertInClass(className: string, element: HTMLElement): void {
        const node = this.getElement(className)
        if (node) {
            while (node.firstChild) {
                node.removeChild(node.lastChild!)
            }
            node.appendChild(element)
        }
    }

    private getElement(className: string): HTMLElement | undefined {
        if (this.baseElement) {
            return this.baseElement.classList.contains(className) ? this.baseElement : this.baseElement.getElementsByClassName(className)[0] as HTMLElement
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
                const property = m.replace('{{', '').replace('}}', '')
                if (this.hasOwnProperty(property)) {
                    this.viewStateActions.get(m)?.pipe(distinctUntilChanged()).subscribe(_ => {
                        let result: string = mask
                        match.forEach(prop => {
                            const propName = prop.replace('{{', '').replace('}}', '')
                            if (this.hasOwnProperty(propName)) {
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
