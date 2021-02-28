using System.Collections.Generic;
using System.Linq;
using FieldDocumentMaker.Library.Domain.Entities.Tree.Interfaces;

namespace FieldDocumentMaker.Library.Domain.Entities.Tree
{
    public class EntityBranch : EntityParentBase, IEntityParent, IEntityChild
    {
        public EntityBranch(IEntityParent parent) : base(typeof(EntityBranch), typeof(EntityLeaf))
        {
            Parent = parent;
        }

        public IEntityParent Parent { get; set; }

    }
}
