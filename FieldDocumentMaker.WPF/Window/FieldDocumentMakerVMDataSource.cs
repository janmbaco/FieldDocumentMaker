using CefSharp;

namespace FieldDocumentMaker.WPF.Window
{
    class FieldDocumentMakerVMDataSource
    {
        private readonly FieldDocumentMakerVM fieldDocumentMakerVM;
        // private readonly ILifeSpanHandler lifeSpanHandler;
        private readonly WebBrowser.WebBrowserManager webBrowserManager;

        public FieldDocumentMakerVMDataSource(FieldDocumentMakerVM fieldDocumentMakerVM, WebBrowser.WebBrowserManager webBrowserManager)
        {
            this.fieldDocumentMakerVM = fieldDocumentMakerVM;
            this.webBrowserManager = webBrowserManager;

            this.fieldDocumentMakerVM.PropertyChanged += OnFieldDocumentMakerVMPropertyChanged;
        }

        private void OnFieldDocumentMakerVMPropertyChanged(object sender, System.ComponentModel.PropertyChangedEventArgs e)
        {
            if(e.PropertyName == "WebBrowser")
            {
                if (this.fieldDocumentMakerVM.WebBrowser != null)
                {
                    //this.fieldDocumentMakerVM.WebBrowser.LifeSpanHandler = lifeSpanHandler;
                    this.webBrowserManager.Initialize(this.fieldDocumentMakerVM.WebBrowser);
                }
                else
                {
                    this.webBrowserManager.TryWebBrowserDispose();
                }
                    
            }
        }
    }
}
