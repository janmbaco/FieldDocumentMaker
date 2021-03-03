using CefSharp;
using CefSharp.Wpf;
using FieldDocumentMaker.Library.Domain.Services;
using System;
using System.Windows;
using System.Windows.Threading;

namespace FieldDocumentMaker.WPF.Window.WebBrowser
{
    public class BoundObject
    {
        public string Repeat(string str, int n)
        {
            string result = String.Empty;
            for (int i = 0; i < n; i++)
            {
                result += str;
            }
            return result;
        }
    }

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
                var repo = e.ObjectRepository;
                if (e.ObjectName == "editorScriptManager")
                {
                    this.webBrowser.JavascriptObjectRepository.Register("editorScriptManager", editorScriptManager, isAsync: false, options: BindingOptions.DefaultBinder);
                }
            };

            EventHandler<LoadingStateChangedEventArgs> handler = null;

            handler = (sender, args) =>
            {
                if (!args.IsLoading)
                {
                    webBrowser.LoadingStateChanged -= handler;
                    this.webBrowser.ExecuteScriptAsync(Properties.Resources.bundle);
                }
            };

            webBrowser.LoadingStateChanged += handler;
        }



        public void TryWebBrowserDispose()
        {
            if(this.webBrowser != null)
            {
                this.webBrowser.Dispose();
                this.webBrowser = null;
            }
        }

    
    }
}
