using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FieldDocumentMaker.AppTest.Models
{
    [DisplayName("Experiencia Laboral")]
    public class ExperienciaLaboral
    {
        [DisplayName("Fecha de Inicio")]
        public DateTime? FechaInicio { get; set; }

        [DisplayName("Fecha de Fin")]
        public DateTime? FechaFin { get; set; }

        [DisplayName("Empresa")]
        public string Empresa { get; set; }

        [DisplayName("Puesto")]
        public string Puesto { get; set; }


    }
}
