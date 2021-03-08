using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FieldDocumentMaker.WPF.Window.WebBrowser.EditorModels
{
    class FieldBase
    {
        public string label { get; set; }

        public string value { get; set; }

        public string style { get; set; }

        public string bind { get; set; }

    }

    class FieldModel 
    {
        public FieldBase @base { get; set; }

        public string type { get; set; }
    }

    class TextField : FieldModel
    {
        public string text { get; set; }
    }

    class NumberField<T> : FieldModel
    {
        public T number { get; set; }
        public T maxValue { get; set; }
        public T minValue { get; set; }
    }

    class DateField : FieldModel
    {
        public DateTime date { get; set; }
        public DateTime maxDate { get; set; }
        public DateTime minDate { get; set; }
    }

    class ComboField : FieldModel
    {
        public string @class { get; set; }
    }

    class ImageField : FieldModel
    {
        public string url { get; set; }
        public int with { get; set; }
        public int height { get; set; }
    }
}
