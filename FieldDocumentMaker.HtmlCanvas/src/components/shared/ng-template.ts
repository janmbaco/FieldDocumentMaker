import { isObservable, NEVER } from 'rxjs'

export type Evaluator = (code: string) => Promise<any>

interface Params {
  templates: Map<string, HTMLElement>
}


export function createEvaluator(context: { [variable: string]: any }): Evaluator {
  const entries = []
  for (const property in context) {
      if (context.hasOwnProperty(property)){
        entries.push([property, context[property]])
      }
  }
  const params = entries.map(e => e[0])
  const fun = new Function('code', ...params, `return eval(code)`)
  const args = entries.map(e => e[1])
  return async (code: string) => {
    let result = fun.call(undefined, code, ...args)
    if (isObservable(result)) {
      result = await result.toPromise()
    }
    return result
  }
}

// can change current context because directives can introduce new variables
// return new Evaluator or undefined if no element compilation is required
export async function applyAttributes(element: Element, context: any, evaluator: Evaluator): Promise<Evaluator>  {
  let advClasses = ''
  for (let k = 0; k < element.attributes.length; ++k) {
    const attr = element.attributes[k]
    const attrName = attr.nodeName
    const value = attr.value
    let remove = true
    if (attrName === '*ngif') {
      let expression = value
      let variable: string | undefined
      const match = expression.match(/(.*)\s+as\s+(\w+)\s*$/)
      if (match) {
        expression = match[1]
        variable = match[2]
      }
      const expressionValue = await evaluator(expression)
      if (expressionValue) {
        if (variable) {
          context[variable] = expressionValue
          evaluator = createEvaluator(context)
        }
      } else {
        element.remove()
      }
    } else if (attrName === '*ngfor') {
      const parser = /(let|var)\s*(\w*)\s*of\s*(.*)/.exec(value)
      if (parser && parser.length === 4) {
        const varName = parser[2]
        const arrExpression = parser[3]
        const array = await evaluator(arrExpression)
        const nextSibling = element.nextSibling
        element.removeAttribute(attrName)
        const elements = [element]
        if (array && array.length > 0) {
          for (let j = 1; j < array.length; ++j) {
            const forElement = element.cloneNode(true) as Element
            const parent = element.parentElement as HTMLElement
            if (parent) {
                parent.insertBefore(forElement, nextSibling)
            }
            elements.push(forElement)
          }
          const promises = elements.map((e, index) =>
            compileTemplate(e, { ...context, [varName]: array[index] })
          )
          await Promise.all(promises)
        } else {
          element.remove()
        }
      }
    } else if (attrName.startsWith('[') && attrName.endsWith(']')) {
      const newName = attrName.slice(1, -1)
      const parts = newName.split('.')
      if (parts.length === 2 && parts[0] === 'class') {
        const newValue = await evaluator(value)
        if (newValue) {
          advClasses += ' ' + parts[1]
        }
      } else if (parts.length === 2 && parts[0] === 'style') {
        if (element instanceof HTMLElement) {
          const s = parts[1]; (element.style as any)[parts[1]] = value
        }
      } else if (parts.length === 3 && parts[0] === 'style') {
        if (element instanceof HTMLElement) {
          const newValue = await evaluator(value); (element.style as any)[parts[1]] = newValue + parts[2]
        }
      } else {
        const newValue = await evaluator(value)
        element.setAttribute(newName, newValue.toString())
      }
    } else {
      remove = false
    }
    if (remove) {
      element.removeAttribute(attrName)
      k--
    }
  }
  if (advClasses) {
    const classAttr = element.attributes.getNamedItem('class')
    if (classAttr) {
      classAttr.value += advClasses
    } else {
      element.setAttribute('class', advClasses.trim())
    }
  }
  return evaluator
}


export async function compileElement(element: Element, context: any, params: Params): Promise<boolean> {
  let evaluator: Evaluator | undefined = createEvaluator(context)

  if (element.nodeName === 'NG-CONTAINER') {
    const templateAttr = element.attributes.getNamedItem('*ngtemplateoutlet')
    if (templateAttr) {
      const templateNode = params.templates.get('#' + templateAttr.value)
      if (templateNode) {
        if (templateNode.children.length === 0) {
          const newElement = document.createElement('span')
          const parent = element.parentElement as HTMLElement
          if (parent) {
            parent.insertBefore(newElement, element)
          }
          newElement.innerHTML = templateNode.innerHTML
          await compileElement(newElement, context, params)
        }
        // tslint:disable-next-line: prefer-for-of
        for (let i = 0; i < templateNode.children.length; ++i) {
          const clone = templateNode.children[i].cloneNode(true) as Element
          const parent = element.parentElement as HTMLElement
          if (parent) {
            parent.insertBefore(clone, element)
          }
          await compileElement(clone, context, params)
        }
      }
      element.remove()
    } else {
      evaluator = await applyAttributes(element, context, evaluator)
      // tslint:disable-next-line: prefer-for-of
      for (let i = 0; i < element.children.length; ++i) {
          const clone = element.children[i].cloneNode(true) as Element
          const parent = element.parentElement as HTMLElement
          if (parent) {
            parent.insertBefore(clone, element)
          }
          await compileElement(clone, context, params)
        }
      element.remove()
    }
    return true
  }

  evaluator = await applyAttributes(element, context, evaluator)
  if (evaluator) {
    for (let i = element.children.length - 1; i >= 0; --i) {
      await compileElement(element.children.item(i) as Element, context, params)
    }

    for (let i = element.childNodes.length - 1; i >= 0; --i) {
      const node = element.childNodes[i]
      if (node.nodeType === Node.TEXT_NODE) {
        const exprReg = /{{\s*([^}]*)}}/
        while (true) {
            if (node.textContent){
                const match = node.textContent.match(exprReg)
                if (match) {
                  let replace = await evaluator(match[1])
                  if (replace === undefined || replace === null) {
                    replace = ''
                  }
                  node.textContent = node.textContent!.replace(exprReg, replace)
                } else {
                  break
                }
            }
        }
      }
    }
  }
  return true
}


export async function compileTemplate(element: Element, context?: { [variable: string]: any }): Promise<boolean> {
  const templates = element.querySelectorAll('ng-template')
  const templateMap = new Map<string, HTMLElement>()
  // tslint:disable-next-line: prefer-for-of
  for (let i = 0; i < templates.length; ++i) {
    const attributes = templates[i].attributes
    // tslint:disable-next-line: prefer-for-of
    for (let j = 0; j < attributes.length; ++j) {
      if (attributes[j].nodeName.startsWith('#')) {
        templateMap.set(attributes[j].nodeName, templates[i] as HTMLElement)
        break
      }
    }
  }
  const params: Params = {
    templates: templateMap
  }
  const result = await compileElement(element, context || {}, params)
  // tslint:disable-next-line: prefer-for-of
  for (let i = 0; i < templates.length; ++i) {
    templates[i].remove()
  }
  return result
}

export function htmlToElement(html: string): HTMLElement {
  const template = document.createElement('template')
  html = html.trim() // Never return a text node of whitespace as the result
  template.innerHTML = html
  return template.content.firstChild as HTMLElement
}
