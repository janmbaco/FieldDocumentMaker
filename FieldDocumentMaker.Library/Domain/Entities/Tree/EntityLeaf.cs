using FieldDocumentMaker.Library.Domain.Entities.Styles;
using FieldDocumentMaker.Library.Domain.Entities.Tree.Interfaces;

namespace FieldDocumentMaker.Library.Domain.Entities.Tree
{
    public class EntityLeaf : EntityBase, IEntityChild
    {
        public EntityLeaf(IEntityParent parent)
        {
            Parent = parent;
        }

        public string Value { get; set; }

        public IEntityParent Parent { get; set; }

        public Style Style { get; set; }
    }
}
