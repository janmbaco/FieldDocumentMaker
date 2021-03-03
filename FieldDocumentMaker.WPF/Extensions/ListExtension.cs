using FieldDocumentMaker.Library.Domain.Entities;
using FieldDocumentMaker.Library.Domain.Entities.Fields;
using FieldDocumentMaker.WPF.Window.WebBrowser.EditorModels;
using System.Collections.Generic;
using System.Linq;

namespace FieldDocumentMaker.WPF.Extensions
{
    static class ListExtension
    {
        public static List<FieldModel> ToFieldModels(this List<BindingField> bindingFields) => bindingFields.Select(b => new FieldModel { bind = b.Binding.Id, label = b.Binding.Name, style = "", type = b.Binding.Style.FieldType.FieldTypeEnum.ToString(), value = b.Binding.Value }).ToList();

        public static List<ZoneModel> ToZoneModels(this List<Zone> zones) => zones.Select(z => new ZoneModel { color = "ligthgreen", id = z.Id.ToString(), isVisible = true, label = z.Name, elements = z.SubZones.ToSubZoneModels() }).ToList();

        private static List<SubZoneModel> ToSubZoneModels(this List<SubZone> subZones) => subZones.Select(s => new SubZoneModel { id = s.Id.ToString(), isVisible = true, template = s.Template }).ToList();

    }
}
