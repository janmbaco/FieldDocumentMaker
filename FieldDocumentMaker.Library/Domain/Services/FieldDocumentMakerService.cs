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

        public event Func<string, BindingField, BindingField> InterceptFieldChange;

        public FieldDocumentMakerService(EntityTree entityTree, Document document)
        {
            this.entityTree = entityTree;
            this.document = document;
        }

        public BindingField ChangeValue(BindingField field, string value)
        {
            var result = field;

            if(this.InterceptFieldChange != null)
            {
                result = this.InterceptFieldChange(value, field);
            }
            return result;
        }

        public List<BindingField> GetFields()
        {
            return this.entityTree.GetAllSubEntities<EntityLeaf>().Select(e => new BindingField(e)).ToList();
        }

        public List<Zone> GetZones()
        {
            return document.Zones;
        }

        public EntityTree GetEntityTree()
        {
            return this.entityTree;
        }
    }
}
