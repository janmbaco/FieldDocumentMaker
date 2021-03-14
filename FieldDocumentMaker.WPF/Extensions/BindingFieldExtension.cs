using FieldDocumentMaker.Library.Domain.Entities.Fields;
using FieldDocumentMaker.WPF.Window.WebBrowser.EditorModels;
using System;

namespace FieldDocumentMaker.WPF.Extensions
{
    internal static class BindingFieldExtension
    {
        public static FieldModel ToFieldModel(this BindingField bindingField) 
        {
            switch (bindingField.Style.FieldType.FieldTypeEnum)
            {
                case Library.Domain.Entities.Styles.Types.FieldTypeEnum.Image:
                    return new ImageField{ @base = new FieldBase { bind = bindingField.Binding.Id, label = bindingField.Binding.Name, style = "", value = bindingField.Value }, type = bindingField.Style.FieldType.FieldTypeEnum.ToString(), url = bindingField.Value};
                case Library.Domain.Entities.Styles.Types.FieldTypeEnum.Text:
                    return new TextField { @base = new FieldBase { bind = bindingField.Binding.Id, label = bindingField.Binding.Name, style = "", value = bindingField.Value }, type = bindingField.Style.FieldType.FieldTypeEnum.ToString(), text = bindingField.Value};
                case Library.Domain.Entities.Styles.Types.FieldTypeEnum.Integer:
                    return new NumberField<int> { @base = new FieldBase { bind = bindingField.Binding.Id, label = bindingField.Binding.Name, style = "", value = bindingField.Value }, type = bindingField.Style.FieldType.FieldTypeEnum.ToString(), number = int.Parse(bindingField.Value.Replace(".","")) };
                case Library.Domain.Entities.Styles.Types.FieldTypeEnum.Float:
                    return new NumberField<float> { @base = new FieldBase { bind = bindingField.Binding.Id, label = bindingField.Binding.Name, style = "", value = bindingField.Value }, type = bindingField.Style.FieldType.FieldTypeEnum.ToString(), number = float.Parse(bindingField.Value)};
                case Library.Domain.Entities.Styles.Types.FieldTypeEnum.Date:
                    return new DateField { @base = new FieldBase { bind = bindingField.Binding.Id, label = bindingField.Binding.Name, style = "", value = bindingField.Value }, type = bindingField.Style.FieldType.FieldTypeEnum.ToString(), date = DateTime.Parse(bindingField.Value) };
                case Library.Domain.Entities.Styles.Types.FieldTypeEnum.Combo:
                    return new ComboField { @base = new FieldBase { bind = bindingField.Binding.Id, label = bindingField.Binding.Name, style = "", value = bindingField.Value }, type = bindingField.Style.FieldType.FieldTypeEnum.ToString(), @class= "no2no" };
                default:
                    return new FieldModel { @base = new FieldBase { bind = bindingField.Binding.Id, label = bindingField.Binding.Name, style = "", value = bindingField.Value }, type = bindingField.Style.FieldType.FieldTypeEnum.ToString(), };
            }
        }
    }
}
