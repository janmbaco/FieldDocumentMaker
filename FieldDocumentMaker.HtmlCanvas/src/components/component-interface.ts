export interface IComponent {
    Name: string
    HtmlElement: HTMLElement
    setInElement(element: HTMLElement): void
    setInstanceOfElement(parent: HTMLElement, child: Element): void
    remove(): void
}