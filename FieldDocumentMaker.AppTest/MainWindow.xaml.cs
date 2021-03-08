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
                    Email = "yubu@yuhu.es",
                    Telefono = "612 123 456",
                    Direccion = new Direccion
                    {
                        Pais = "España",
                        Provincia = "Murica",
                        CodigoPostal = 30334,
                        Numero = 4,
                        Poblacion = "Las Palas",
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
                    Name = "Información Personal",
                    SubZones = new List<SubZone>()
                    {
                        new SubZone
                        {
                            Id = Guid.NewGuid(),
                            Template = string.Concat("<div style='margin-left:5cm;text-align:left;line-height:auto'><p><h1><field bind='Curriculum.Person.Nombre' style=''></field><field bind='Curriculum.Person.PrimerApellido' style=''></field><field bind='Curriculum.Person.SegundoAPellido' style=''></field></h1>",
                                                     "<field bind='Curriculum.Person.Direccion.Poblacion' style=''></field><br />",
                                                     "<field bind='Curriculum.Person.Direccion.Provincia' style=''></field><br />",
                                                     "<field bind='Curriculum.Person.Telefono' style=''></field> | <field bind='Curriculum.Person.Email' style=''></field></p>",
                                                     "<p style='margin-right:7cm'>Amplia experiencia en análisis, diseño y programación de aplicaciones, especialmente bajo tecnología .Net</p></div>")
                        }
                    }

                }
                , new Zone
                {
                    Id = Guid.NewGuid(),
                    Name = "Competencias",
                    SubZones = new List<SubZone>()
                    {
                        new SubZone
                        {
                            Id = Guid.NewGuid(),
                            Template = "<p>Competencias</p>"
                        },
                          new SubZone
                        {
                            Id = Guid.NewGuid(),
                            Template = "<p>Me dedico al análisis y desarrollo de aplicaciones, profesionalmente, desde 2006. Realizando la mayoría de los proyectos desde cero y estando presente en todo el ciclo de vida del software. El análisis orgánico y el diseño estructural es un mundo que me apasiona.</p>"
                        },
                            new SubZone
                        {
                            Id = Guid.NewGuid(),
                            Template = "<p>Mi principal herramienta es Visual Studio con todo los que conlleva, aunque periféricamente también utilizo Elastic Search para generar índices, Kafka para gestionar colas, bases de datos MySQL, etc...</p>"
                        }
                    }

                }
                 , new Zone
                {
                    Id = Guid.NewGuid(),
                    Name = "Experiencia Profesional",
                    SubZones = new List<SubZone>()
                    {
                        new SubZone
                        {
                            Id = Guid.NewGuid(),
                            Template = "<p>Experiencia Profesional</p>"
                        },
                          new SubZone
                        {
                            Id = Guid.NewGuid(),
                            Template = "<p style='font-weight: bold;'><field bind='Curriculum.ExperienciasLaborales.[0].FechaInicio' style='font-weight: bold;'></field> - <field bind='Curriculum.ExperienciasLaborales.[0].Empresa' style='font-weight: bold;'></field></p>"
                        },
                        new SubZone
                        {
                            Id = Guid.NewGuid(),
                            Template = "<p><field bind='Curriculum.ExperienciasLaborales.[0].Puesto' style=''></field></p>"
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
