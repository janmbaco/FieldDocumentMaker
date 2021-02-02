using System.Collections.Generic;

namespace FieldDocumentMaker.Library.Domain.Entities
{
    public class Zone
    {
        public string Name { get; set; }

        public string Value { get; set; }

        public List<FieldsSet> FieldsSets {get; set;}
    }
}
