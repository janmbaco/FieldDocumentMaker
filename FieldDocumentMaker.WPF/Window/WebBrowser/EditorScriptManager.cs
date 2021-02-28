using FieldDocumentMaker.Library.Domain.Services;
using FieldDocumentMaker.WPF.Extensions;
using FieldDocumentMaker.WPF.Window.WebBrowser.EditorModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FieldDocumentMaker.WPF.Window.WebBrowser
{
    class EditorScriptManager
    {
        readonly IFieldDocumentMakerService fieldDocumentMakerService;

        public EditorScriptManager(IFieldDocumentMakerService fieldDocumentMakerService)
        {
            this.fieldDocumentMakerService = fieldDocumentMakerService;
        }

        public string GetFields()
        {
            return Newtonsoft.Json.JsonConvert.SerializeObject(this.fieldDocumentMakerService.GetFields().ToFieldModels());
        }

        public string GetZones()
        {
            return Newtonsoft.Json.JsonConvert.SerializeObject(this.fieldDocumentMakerService.GetZones().ToZoneModels());
        }

        public FieldModel InterceptFieldChange(FieldModel field, string newValue)
        {
            return fieldDocumentMakerService.ChangeValue(field.bind, newValue).ToFieldModel();
        }

    }
}
