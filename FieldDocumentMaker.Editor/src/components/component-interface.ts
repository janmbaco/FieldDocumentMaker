export interface IComponent {
    IsRendered: boolean
    HtmlElement: HTMLElement
    setInElement(element: HTMLElement): void
    remove(bydom?: boolean): void
}
