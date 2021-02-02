using FieldDocumentMaker.Library.Domain.Entities.Tree;

namespace FieldDocumentMaker.Library.Domain.Entities
{
    public class State
    {
        public Document Document { get; set; }

        public string HtmlView { get; set; }

        public EntityTree Entity { get; set; }

    }
}
