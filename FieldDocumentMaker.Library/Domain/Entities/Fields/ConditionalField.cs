using System.Collections.Generic;
using System.Linq;
using FieldDocumentMaker.Library.Domain.Entities.Fields.interfaces;
using FieldDocumentMaker.Library.Domain.Entities.Styles;
using FieldDocumentMaker.Library.Domain.Entities.Tree.Interfaces;
using FieldDocumentMaker.Library.Domain.Entities.Values;

namespace FieldDocumentMaker.Library.Domain.Entities.Fields
{
    public class ConditionalField : IField
    {
        private string value;

        public string Name { get; set; }

        public string Value
        {
            get
            {
                if (this.value == null && this.Parent != null && this.ConditionalValues != null)
                {
                    var conditionalValue = this.ConditionalValues.Where(c => c.Filter(this.Parent)).FirstOrDefault();
                    if (conditionalValue != null)
                    {
                        this.value = conditionalValue.Value;
                    }
                }
                return this.value;
            }
        }


        public Style Style { get; set; }

        public IEntityParent Parent { get; set; }

        public List<ConditionalValue> ConditionalValues { get; set; }
    }
}
