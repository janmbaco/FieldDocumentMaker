namespace FieldDocumentMaker.Library.Domain.Entities.Tree.Interfaces
{
    public interface IEntityChild : IEntityBase
    {

        IEntityParent Parent  { get; set; }
    }
}
