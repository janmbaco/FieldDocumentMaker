using System.Collections.Generic;
using System.Linq;
using FieldDocumentMaker.Library.Domain.Entities.Tree.Interfaces;

namespace FieldDocumentMaker.Library.Domain.Entities.Tree
{
    public class EntityTree : EntityBase, IEntityParent
    {
        public EntityTree()
        {
            Children = new List<EntityBranch>();
        }

        public List<EntityBranch> Children { get;  }

        public List<T> GetChildren<T>() where T : class, IEntityChild, new()
        {
            if(typeof(T) == typeof(EntityBranch))
            {
                return this.Children.Select(b => b as T).ToList();
            }

            return new List<T>();
        }
    }
}
