using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FieldDocumentMaker.Library.Domain.Entities.Styles.Types
{
    public class FieldTypeFloat : FieldType
    {
        public override FieldTypeEnum FieldTypeEnum => FieldTypeEnum.Float;

        public int MinValue { get; set; }

        public int MaxValue { get; set; }
    }
}
