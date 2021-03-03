using System.Collections.Generic;
using System.Linq;
using FieldDocumentMaker.Library.Domain.Entities.Tree.Interfaces;

namespace FieldDocumentMaker.Library.Domain.Entities.Tree
{
    public class EntityTree : EntityParentBase, IEntityParent
    {
        public EntityTree() : base(typeof(EntityBranch))
        {
        }
    }
}
