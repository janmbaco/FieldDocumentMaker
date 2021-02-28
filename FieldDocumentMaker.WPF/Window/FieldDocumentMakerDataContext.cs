namespace FieldDocumentMaker.WPF.Window
{
    public class FieldDocumentMakerDataContext
    {
        [System.Diagnostics.CodeAnalysis.SuppressMessage("CodeQuality", "IDE0052:Quitar miembros privados no leídos", Justification = "Mantiene abierto el canal con el datasource")]
        private readonly FieldDocumentMakerVMDataSource dataSource;

        public FieldDocumentMakerVM ViewModel { get; }

        internal FieldDocumentMakerDataContext(FieldDocumentMakerVM viewModel, FieldDocumentMakerVMDataSource dataSource)
        {
            this.ViewModel = viewModel;
            this.dataSource = dataSource;
        }
    }
}
