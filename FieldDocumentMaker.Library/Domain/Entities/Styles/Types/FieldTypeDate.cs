using System;

namespace FieldDocumentMaker.Library.Domain.Entities.Styles.Types
{
    public class FieldTypeDate : FieldType
    {
        public override FieldTypeEnum FieldTypeEnum => FieldTypeEnum.Date;

        public DateTime MinValue { get; set; }

        public DateTime MaxValue { get; set; }

    }
}
