namespace FieldDocumentMaker.Library.Domain.Entities.Styles.Types
{
    public class FieldTypeCombo : FieldType
    {
        public override FieldTypeEnum FieldTypeEnum => FieldTypeEnum.Combo;

        public string Class { get; set; }

    }
}
