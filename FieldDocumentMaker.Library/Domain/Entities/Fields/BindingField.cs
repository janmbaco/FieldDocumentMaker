using FieldDocumentMaker.Library.Domain.Entities.Fields.interfaces;
using FieldDocumentMaker.Library.Domain.Entities.Styles;
using FieldDocumentMaker.Library.Domain.Entities.Tree;

namespace FieldDocumentMaker.Library.Domain.Entities.Fields
{
    public class BindingField : IField
    {
        public string Value { get; set; }

        public EntityLeaf Binding { get; set; }

        public Style Style
        {
            get
            {
                return this.Binding.Style;
            }
        }
    }
}
