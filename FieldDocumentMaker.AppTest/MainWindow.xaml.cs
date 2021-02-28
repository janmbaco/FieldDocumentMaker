using FieldDocumentMaker.AppTest.Extensions;
using FieldDocumentMaker.AppTest.Models;
using FieldDocumentMaker.Library.Domain.Entities;
using FieldDocumentMaker.Library.Domain.Entities.Tree;
using FieldDocumentMaker.Library.Domain.Entities.Tree.Interfaces;
using FieldDocumentMaker.Library.Domain.Services;
using FieldDocumentMaker.WPF.Window;
using FieldDocumentMaker.WPF.Window.TreeBranch;
using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Windows;
using System.Windows.Controls.Ribbon;

namespace FieldDocumentMaker.AppTest
{
    /// <summary>
    /// Lógica de interacción para MainWindow.xaml
    /// </summary>
    public partial class MainWindow : RibbonWindow
    {
        public MainWindow()
        {
            InitializeComponent();

            Curriculum curriculum = new Curriculum
            {
                Person = new Person
                {
                    Nombre = "José",
                    PrimerApellido = "nose",
                    SegundoAPellido = "nose",
                    Direccion = new Direccion
                    {
                        Pais = "España",
                        Provincia = "Murica",
                        CodigoPostal = 30334,
                        Numero = 4,
                        Ciudad = "Las Palas",
                        Via = "C/ Cementerio",
                    }
                },

                ExperienciasLaborales = new List<ExperienciaLaboral>
                {
                    new ExperienciaLaboral
                    {
                        Empresa = "La que sea",
                        Puesto = "El que sea",
                        FechaFin = new DateTime(2020,12,12),
                        FechaInicio = new DateTime(2020,10,10)
                    }
                }
            };


            var entityTree = curriculum.ToEntityTree();
            var document = new Document { Zones = new List<Zone>() {
                new Zone
                {
                    Id = Guid.NewGuid(),
                    Name = "Hola mundo!",
                    SubZones = new List<SubZone>()
                    {
                        new SubZone
                        {
                            Id = Guid.NewGuid(),
                            Template = "<p>Hola <field bind='Curriculum.Person.Nombre' style=''></field>!<p>"
                        }
                    }

                }
                , new Zone
                {
                    Id = Guid.NewGuid(),
                    Name = "otra zone",
                    SubZones = new List<SubZone>()
                    {
                        new SubZone
                        {
                            Id = Guid.NewGuid(),
                            Template = "<p>repito el campo <field bind='Curriculum.Person.Nombre' style=''></field>  y añado apellidos <field bind='Curriculum.Person.PrimerApellido' style=''></field><field bind='Curriculum.Person.SegundoAPellido' style=''></field><p>"
                        }
                    }

                }
            }
            };
            var service = new FieldDocumentMakerService(entityTree, document);
            FieldDocumentMakerDataContextFactory factory = new FieldDocumentMakerDataContextFactory(new TreeBranchVMFactory(service));
            this.Control.DataContext = factory.Create(service);
            
        }



    }
}
