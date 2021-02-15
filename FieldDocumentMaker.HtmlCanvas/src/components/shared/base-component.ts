import { compileTemplate, htmlToElement } from './ng-template'

export class BaseComponent{

    private name: string
    private template: string
    private view: HTMLElement | undefined
    private childs: { [name: string]: BaseComponent[]} = {}
    private parent: BaseComponent | null = null
    private isRendered = false

    constructor(name: string, template: string){
        this.name = name
        this.template = template
    }

    async setParent(parent: HTMLElement): Promise<boolean> {
         await this.render()
         parent.appendChild(this.view!)
         return true
    }

    focus(): void{
        if (this.view) {
            this.view.focus()
        }
    }

    delete(): void{
        if (this.view) {
            if (this.parent?.childs[this.name]){
                const index = this.parent.childs[this.name].findIndex(c => c === this)
                if (index > -1) {
                    this.parent.childs[this.name].splice(index, 1)
                }
            }
            this.view.remove()
        }
    }

    onClick(func: (e: MouseEvent) => void): void{
        if (this.view){
            this.view.addEventListener('click', func)
        }
    }
    
    protected async append(component: BaseComponent): Promise<void>{
        if (!this.isRendered){
            await this.render()
        }
        const collectionZone = this.view!.getElementsByClassName(component.name + '-collection')[0] as HTMLElement
        if (collectionZone){
            if (!this.childs[component.name]){
                this.childs[component.name] = []
            }
            this.childs[component.name].push(component)
            component.parent = this
            if (!component.isRendered){
                await component.render()
            }
            collectionZone.append(component.view!)
        } else {
            throw new Error(`the ${this.name} type can't append ${component.name} types`)
        }
    }


    private async render(): Promise<boolean>{
        const element = htmlToElement(this.template)
        await compileTemplate(element, this)
        this.view = element
        this.isRendered = true
        return true
    }
}
