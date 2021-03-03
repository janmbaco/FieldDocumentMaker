using System;
using System.Collections.Generic;
using FieldDocumentMaker.Library.Domain.Entities.Fields.interfaces;
using FieldDocumentMaker.Library.Domain.Entities.Tree;

namespace FieldDocumentMaker.Library.Domain.Entities
{
    public class SubZone
    {
        public Guid Id { get; set; }

        public string Template { get; set; }

        public EntityBranch Binding { get; set; }

        public List<Type> FilterType { get; set; }

        public List<string> FilterZone { get; set; }

    }
}
