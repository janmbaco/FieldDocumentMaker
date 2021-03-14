using CefSharp;
using CefSharp.Wpf;
using FieldDocumentMaker.Library.Domain.Services;
using System;
using System.Diagnostics;
using System.Threading.Tasks;
using System.Windows;
using System.Windows.Threading;

namespace FieldDocumentMaker.WPF.Window.WebBrowser
{
    class WebBrowserManager
    {
        IWebBrowser webBrowser;

        readonly EditorScriptManager editorScriptManager;
        readonly IContextMenuHandler contextMenuHandler;

        public WebBrowserManager(EditorScriptManager editorScriptManager, IContextMenuHandler contextMenuHandler)
        {
            this.editorScriptManager = editorScriptManager;
            this.contextMenuHandler = contextMenuHandler;
        }


        public void Initialize(IWebBrowser webBrowser)
        {
            this.webBrowser = webBrowser;
            CefSharpSettings.WcfEnabled = true;
            Dispatcher.CurrentDispatcher.BeginInvoke((Action)(() => this.webBrowser.MenuHandler = this.contextMenuHandler), DispatcherPriority.Input);

            this.webBrowser.JavascriptObjectRepository.ResolveObject += (sender, e) =>
            {
                if (e.ObjectName == "editorScriptManager")
                {
                    this.webBrowser.JavascriptObjectRepository.Register("editorScriptManager", editorScriptManager,  false,  BindingOptions.DefaultBinder);
                }
            };
           
            this.webBrowser.ExecuteScriptAsyncWhenPageLoaded(Properties.Resources.bundle);
            
        }

        public void TryWebBrowserDispose()
        {
            if (this.webBrowser != null)
            {
                this.webBrowser.Dispose();
                this.webBrowser = null;
            }
        }

    
    }
}
