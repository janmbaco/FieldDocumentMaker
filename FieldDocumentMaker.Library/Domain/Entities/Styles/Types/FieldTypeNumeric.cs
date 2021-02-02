namespace FieldDocumentMaker.Library.Domain.Entities.Styles.Types
{
    public class FieldTypeNumeric : FieldType
    {
        public override FieldTypeEnum FieldTypeEnum => FieldTypeEnum.Numeric;

        public int MinValue { get; set; }

        public int MaxValue { get; set; }
    }
}
