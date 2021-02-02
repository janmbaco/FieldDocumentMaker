using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FieldDocumentMaker.AppTest.Models
{
    [DisplayName("Dirección")]
    public class Direccion
    {
        [DisplayName("País")]
        public string Pais { get; set; }

        [DisplayName("Provincia")]
        public string Provincia { get; set; }

        [DisplayName("Ciudad")]
        public string Ciudad { get; set; }

        [DisplayName("Codigo Postal")]
        public int? CodigoPostal { get; set; }

        [DisplayName("Vía")]
        public string Via { get; set; }

        [DisplayName("Número")]
        public int? Numero { get; set; }

    }
}
