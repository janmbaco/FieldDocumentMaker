using FieldDocumentMaker.Library.Domain.Entities.Fields;
using FieldDocumentMaker.WPF.Window.WebBrowser.EditorModels;

namespace FieldDocumentMaker.WPF.Extensions
{
    internal static class BindingFieldExtension
    {
        public static FieldModel ToFieldModel(this BindingField bindingField)
        {
            return new FieldModel { bind = bindingField.Binding.Id, label = bindingField.Binding.Name, style = "", type = bindingField.Style.FieldType.FieldTypeEnum.ToString(), value = bindingField.Value };
        }
    }
}
