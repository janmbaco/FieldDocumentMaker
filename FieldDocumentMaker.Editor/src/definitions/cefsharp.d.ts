interface CefSharp {
    bindObjectAsync(...name: string[]): Promise<{ Success: boolean, Count: number, Message: string }>
}

declare var cefSharp: CefSharp;