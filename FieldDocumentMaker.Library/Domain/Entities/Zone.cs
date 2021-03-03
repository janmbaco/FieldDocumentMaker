using System;
using System.Collections.Generic;

namespace FieldDocumentMaker.Library.Domain.Entities
{
    public class Zone
    {
        public Guid Id { get; set; }

        public string Name { get; set; }

        public string Value { get; set; }

        public List<SubZone> SubZones {get; set;}

    }
}
