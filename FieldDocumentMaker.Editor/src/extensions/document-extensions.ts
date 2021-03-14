declare global {
    interface Document {
        createElementFromTemplate(html: string): HTMLElement
    }
}
Document.prototype.createElementFromTemplate = (html: string) => {
    const template = document.createElement('template')
    html = html.trim()
    template.innerHTML = html
    return template.content.firstChild as HTMLElement
}
export { }
