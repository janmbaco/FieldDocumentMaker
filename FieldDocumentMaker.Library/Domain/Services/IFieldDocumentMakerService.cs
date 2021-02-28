using FieldDocumentMaker.Library.Domain.Entities;
using FieldDocumentMaker.Library.Domain.Entities.Fields;
using FieldDocumentMaker.Library.Domain.Entities.Tree;
using System;
using System.Collections.Generic;

namespace FieldDocumentMaker.Library.Domain.Services
{
    public interface IFieldDocumentMakerService
    {
        event Func<string, BindingField, BindingField> InterceptFieldChange;

        BindingFieldObserver GetBindingFieldObserver(string id);

        List<BindingField> GetFields();

        List<Zone> GetZones();

        EntityTree GetEntityTree();

        BindingField ChangeValue(string id, string value);

    }
}
