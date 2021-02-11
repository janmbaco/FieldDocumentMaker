using System.Windows;
using System.Windows.Controls;
using System.Windows.Input;

namespace FieldDocumentMaker.WPF
{
    /// <summary>
    /// Lógica de interacción para UserControl1.xaml
    /// </summary>
    public partial class FileDocumentMakerControl : UserControl
    {
        public FileDocumentMakerControl()
        {
            InitializeComponent();
        }

        private void StackPanel_PreviewMouseLeftButtonDown(object sender, MouseButtonEventArgs e)
        {
            DragDrop.DoDragDrop(sender as DependencyObject, "mierda y meado", DragDropEffects.All);
        }
    }
}
