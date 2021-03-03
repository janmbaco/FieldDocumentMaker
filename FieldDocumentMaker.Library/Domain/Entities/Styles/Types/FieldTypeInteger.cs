namespace FieldDocumentMaker.Library.Domain.Entities.Styles.Types
{
    public class FieldTypeInteger : FieldType
    {
        public override FieldTypeEnum FieldTypeEnum => FieldTypeEnum.Integer;

        public int MinValue { get; set; }

        public int MaxValue { get; set; }
    }
}
