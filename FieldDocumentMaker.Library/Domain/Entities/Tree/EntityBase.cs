using System;

namespace FieldDocumentMaker.Library.Domain.Entities.Tree
{
    public abstract class EntityBase 
    {
 
        public string Id { get; set; }

        public string Name { get; set; }

        public Type Type { get; set; }
    }
}
