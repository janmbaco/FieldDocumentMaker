using System;

namespace FieldDocumentMaker.Library.Domain.Entities.Tree.Interfaces
{
    public interface IEntityBase
    {
        string Id { get; set; }

        string Name { get; set; }

        Type Type { get; set; }
    }
}
