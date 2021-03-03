using System.Collections.Generic;

namespace FieldDocumentMaker.Library.Domain.Entities.Tree.Interfaces
{

    public interface IEntityParent : IEntityBase
    {
        List<T> GetChildren<T>() where T : class, IEntityChild;

        List<T> GetAllSubEntities<T>() where T : class, IEntityChild;

        void AddChild<T>(T child) where T : class, IEntityChild;
    }


}
