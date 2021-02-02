using FieldDocumentMaker.AppTest.Extensions;
using FieldDocumentMaker.AppTest.Models;
using FieldDocumentMaker.Library.Domain.Entities.Tree;
using FieldDocumentMaker.Library.Domain.Entities.Tree.Interfaces;
using FieldDocumentMaker.WPF.ViewModel;
using FieldDocumentMaker.WPF.ViewModel.TreeBranch;
using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Windows;

namespace FieldDocumentMaker.AppTest
{
    /// <summary>
    /// Lógica de interacción para MainWindow.xaml
    /// </summary>
    public partial class MainWindow : Window
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

            FieldDocumentMakerVMFactory facotry = new FieldDocumentMakerVMFactory(new TreeBranchVMFactory());
            var entityTruee = curriculum.ToEntityTree();
            this.Control.DataContext = facotry.CreateVM(entityTruee);
            
        }



    }
}
