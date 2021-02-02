using FieldDocumentMaker.AppTest.Models;
using FieldDocumentMaker.Library.Domain.Entities.Styles;
using FieldDocumentMaker.Library.Domain.Entities.Tree;
using FieldDocumentMaker.Library.Domain.Entities.Tree.Interfaces;
using System;
using System.Collections;
using System.Collections.Generic;
using System.ComponentModel;
using System.Linq;
using System.Reflection;
using System.Text;
using System.Threading.Tasks;

namespace FieldDocumentMaker.AppTest.Extensions
{
    public static class CurriculumExtensions
    {

        public static EntityTree ToEntityTree(this Curriculum curriculum)
        {
            var result = new EntityTree();
            result.Id = "Curriculum";
            result.Name = "Curriculum";

            foreach (var item in curriculum.GetType().GetProperties())
            {
                result.Children.Add(GetEntityBranch(item, result, item.GetValue(curriculum)));
            }
                
            return result;
        }

        public static EntityBranch GetEntityBranch(PropertyInfo propertyInfo, IEntityParent parent, object obj)
        {
            return GetEntityBranch(propertyInfo.Name, propertyInfo.GetCustomAttribute<DisplayNameAttribute>().DisplayName, parent, obj);
        }

        public static EntityBranch GetEntityBranch(string id, string name, IEntityParent parent, object obj)
        {
            var result = new EntityBranch(parent);
            result.Id = string.Concat(parent.Id, ".", id);
            result.Name = name;
            result.Type = obj.GetType();

            if (typeof(IEnumerable).IsAssignableFrom(result.Type))
            {
                int index = 0;
                foreach (var item in obj as IEnumerable)
                {
                    Type itemType = item.GetType();
                    if (itemType == typeof(string) || itemType == typeof(int?) || itemType == typeof(DateTime?))
                    {
                        result.Leaves.Add(GetEntityLeaf(string.Format("[{0}]", index), string.Format("{0}[{1}]", result.Name, index), result, item));
                    }
                    else
                    {
                        result.Branches.Add(GetEntityBranch(string.Format("[{0}]", index), string.Format("{0}", itemType.GetCustomAttribute<DisplayNameAttribute>().DisplayName), result, item));
                    }
                    index++;
                }
            }
            else
            {
                foreach (var item in result.Type.GetProperties())
                {
                    object entity = item.GetValue(obj);
                    if (item.PropertyType == typeof(string) || item.PropertyType == typeof(int?) || item.PropertyType == typeof(DateTime?))
                    {
                        result.Leaves.Add(GetEntityLeaf(item, result, entity));
                    }
                    else
                    {
                        result.Branches.Add(GetEntityBranch(item, result, entity));
                    }
                }
            }
            return result;
        }

        public static EntityLeaf GetEntityLeaf(PropertyInfo propertyInfo, IEntityParent parent, object obj)
        {
            return GetEntityLeaf(propertyInfo.Name, propertyInfo.GetCustomAttribute<DisplayNameAttribute>().DisplayName, parent, obj);
        }

        public static EntityLeaf GetEntityLeaf(string id, string name, IEntityParent parent, object obj)
        {
            var result = new EntityLeaf(parent);
            result.Id = string.Concat(parent.Id, ".", id);
            result.Name = name;
            result.Type = obj.GetType();

            if (result.Type == typeof(string))
            {
                result.Value = obj as string;
            }
            else if (result.Type == typeof(int))
            {
                result.Value = string.Format("{0:N0}", obj as int?);
            }
            else if(result.Type == typeof(DateTime))
            {
                result.Value = string.Format("{0:dd/MM/yyyy}", obj as DateTime?);
            }

            return result;

        }

    }
}
