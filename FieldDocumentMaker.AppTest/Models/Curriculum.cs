using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FieldDocumentMaker.AppTest.Models
{
    public class Curriculum
    {
        [DisplayName("Persona")]
        public Person Person { get; set; }

        [DisplayName("Experiencias Laborales")]
        public List<ExperienciaLaboral> ExperienciasLaborales { get; set; }
    }
}
