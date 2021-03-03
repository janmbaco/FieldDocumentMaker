using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FieldDocumentMaker.Library.Domain.Entities.Styles.Types
{
    public class FieldTypeText : FieldType
    {
        public override FieldTypeEnum FieldTypeEnum => FieldTypeEnum.Text;
    }
}
