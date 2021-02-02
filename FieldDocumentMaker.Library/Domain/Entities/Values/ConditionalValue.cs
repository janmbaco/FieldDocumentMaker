using FieldDocumentMaker.Library.Domain.Entities.Tree.Interfaces;
using System;

namespace FieldDocumentMaker.Library.Domain.Entities.Values
{
    public class ConditionalValue
    {
        public string Value { get; set; }

        public Func<IEntityParent, bool> Filter { get; set; }
    }
}
