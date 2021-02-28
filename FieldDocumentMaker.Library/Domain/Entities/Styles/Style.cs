using FieldDocumentMaker.Library.Domain.Entities.Styles.Types;

namespace FieldDocumentMaker.Library.Domain.Entities.Styles
{
    public class Style
    {
        public FieldType FieldType { get; set; }

        public bool  Bold { get; set; }
        
        public bool Italic { get; set; }

        public bool Underline { get; set; }

    }
}
