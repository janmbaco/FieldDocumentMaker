using FieldDocumentMaker.Library.Domain.Entities.Tree.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FieldDocumentMaker.Library.Domain.Entities.Tree
{
    public abstract class EntityParentBase : EntityBase
    {
        protected Dictionary<Type, List<IEntityChild>> Children { get; private set; }

        protected EntityParentBase(params  Type[] type)
        {
            Children = new Dictionary<Type, List<IEntityChild>>();
            foreach (Type item in type)
            {
                Children.Add(item, new List<IEntityChild>());
            }
        }

        public List<T> GetChildren<T>() where T : class, IEntityChild
        {
            if (this.Children.ContainsKey(typeof(T)))
            {
                return this.Children[typeof(T)].Select(i => i as T).ToList();
            }

            return new List<T>();
        }

        public List<T> GetAllSubEntities<T>() where T : class, IEntityChild
        {
            var result = new List<T>();
           
            foreach(Type t in this.Children.Keys)
            {
                if(t == typeof(T))
                {
                    result.AddRange(this.Children[t].Select(i => i as T));
                }

                if(typeof(IEntityParent).IsAssignableFrom(t))
                {
                    result.AddRange(this.Children[t].SelectMany(c => ((IEntityParent)c).GetAllSubEntities<T>()));
                }

            }
            return result;
        }

        public void AddChild<T>(T child) where T : class, IEntityChild
        {
            if (this.Children.ContainsKey(typeof(T)))
            {
                this.Children[typeof(T)].Add(child);
            }
        }
    }
}
