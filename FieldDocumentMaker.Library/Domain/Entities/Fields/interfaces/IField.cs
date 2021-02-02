using FieldDocumentMaker.Library.Domain.Entities.Styles;

namespace FieldDocumentMaker.Library.Domain.Entities.Fields.interfaces
{
    public interface IField
    {
        string Value { get;  }

        Style Style { get;  }
    }
}
