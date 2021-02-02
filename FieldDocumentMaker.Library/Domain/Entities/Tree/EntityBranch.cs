using System.Collections.Generic;
using System.Linq;
using FieldDocumentMaker.Library.Domain.Entities.Tree.Interfaces;

namespace FieldDocumentMaker.Library.Domain.Entities.Tree
{
    public class EntityBranch : EntityBase, IEntityParent, IEntityChild
    {
        public EntityBranch(IEntityParent parent)
        {
            Parent = parent;
            Branches = new List<EntityBranch>();
            Leaves = new List<EntityLeaf>();
        }

        public IEntityParent Parent { get; set; }

        public List<EntityBranch> Branches { get;  }

        public List<EntityLeaf> Leaves { get;  }

        public List<T> GetChildren<T>() where T : class, IEntityChild, new()
        {
            if(typeof(T) == typeof(EntityBranch))
            {
                return this.Branches.Select(b => b as T).ToList();
            }
            
            if (typeof(T) == typeof(EntityLeaf))
            {
                return this.Leaves.Select(b => b as T).ToList();
            }

            return new List<T>();
        }
    }
}
