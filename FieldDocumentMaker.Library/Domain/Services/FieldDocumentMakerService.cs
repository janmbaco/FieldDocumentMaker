using FieldDocumentMaker.Library.Domain.Entities;
using FieldDocumentMaker.Library.Domain.Entities.Fields;
using FieldDocumentMaker.Library.Domain.Entities.Tree;
using System;
using System.Collections.Generic;
using System.Linq;

namespace FieldDocumentMaker.Library.Domain.Services
{
    public class FieldDocumentMakerService : IFieldDocumentMakerService
    {
        private readonly EntityTree entityTree;
        private readonly Document document;
        private readonly Dictionary<string, BindingField> fields;
        private readonly Dictionary<string, BindingFieldObserver> Observers;

        public event Func<string, BindingField, BindingField> InterceptFieldChange;

        public FieldDocumentMakerService(EntityTree entityTree, Document document)
        {
            this.entityTree = entityTree;
            this.fields = this.entityTree.GetAllSubEntities<EntityLeaf>().Select(e => new BindingField(e)).ToDictionary(k => k.Binding.Id);
            this.document = document;
            this.Observers = new Dictionary<string, BindingFieldObserver>();
        }

        public BindingField ChangeValue(string id, string value)
        {
            BindingField result = null;
            if (fields.ContainsKey(id))
            {
                var field = this.fields[id];
                if (this.InterceptFieldChange != null)
                {
                    result = this.InterceptFieldChange(value, field);
                }
                else
                {
                    field.Binding.Value = value;
                    result = field;
                }
            }
            if (this.Observers.ContainsKey(result.Binding.Id))
            {
                this.Observers[result.Binding.Id].Next(result);
            }
            return result;
        }

        public List<BindingField> GetFields()
        {
            return this.fields.Select(k => k.Value).ToList();
        }

        public List<Zone> GetZones()
        {
            return document.Zones;
        }

        public EntityTree GetEntityTree()
        {
            return this.entityTree;
        }

        public BindingFieldObserver GetBindingFieldObserver(string id)
        {
            if (!Observers.ContainsKey(id))
            {
                this.Observers.Add(id, new BindingFieldObserver());
            }
            return this.Observers[id];
        }
    }
}
