interface Document {
    getElementsByXPath(xpath: string , parent: Node): (Node | null)[]
}

Document.prototype.getElementsByXPath = (xpath: string , parent: Node): (Node | null)[] =>
{
    const results = []
    const query = document.evaluate(xpath, parent || document,
        null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null)
    for (let i = 0, length = query.snapshotLength; i < length; ++i) {
        results.push(query.snapshotItem(i))
    }
    return results
}