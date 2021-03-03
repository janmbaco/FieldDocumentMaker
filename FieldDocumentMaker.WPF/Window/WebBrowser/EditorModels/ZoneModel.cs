using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FieldDocumentMaker.WPF.Window.WebBrowser.EditorModels
{
    class ZoneModel
    {
        public string id { get; set; }
        public string label { get; set; }
        public string color { get; set; }
        public bool isVisible { get; set; }
        public List<SubZoneModel> elements { get; set; }

    }
}
