using FieldDocumentMaker.Library.Domain.Entities.Fields.interfaces;
using FieldDocumentMaker.Library.Domain.Entities.Styles;
using FieldDocumentMaker.Library.Domain.Entities.Tree;
using System;

namespace FieldDocumentMaker.Library.Domain.Entities.Fields
{
    public class BindingField : IField
    {
        public BindingField(EntityLeaf entityLeaf)
        {
            this.Binding = entityLeaf ?? throw new ArgumentNullException("entityLeaf");
        }

        public string Value => this.Binding.Value;

        public Style Style => this.Binding.Style;

        public EntityLeaf Binding { get; set; }
    }
}
