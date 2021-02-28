using FieldDocumentMaker.Library.Domain.Entities.Fields;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FieldDocumentMaker.Library.Domain.Services
{
    public class BindingFieldObserver
    {
        public event Action<BindingField> Changed;

        public void Next(BindingField field)
        {
            if(this.Changed != null)
            {
                this.Changed(field);
            }
        }
    }
}
