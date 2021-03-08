using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FieldDocumentMaker.AppTest.Models
{
    public class Person
    {
        [DisplayName("Nombre")]
        public string Nombre { get; set; }

        [DisplayName("Primer Apellido")]
        public string PrimerApellido { get; set; }

        [DisplayName("Segundo Apellido")]
        public string SegundoAPellido { get; set; }

        [DisplayName("Dirección")]
        public Direccion Direccion { get; set; }

        [DisplayName("Email")]
        public string Email { get; set; }

        [DisplayName("Teléfono")]
        public string Telefono { get; set; }

    }
}
