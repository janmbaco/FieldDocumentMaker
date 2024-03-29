﻿using CefSharp.Wpf;
using FieldDocumentMaker.WPF.Window.TreeBranch;
using System.Collections.Generic;
using System.ComponentModel;

namespace FieldDocumentMaker.WPF.Window
{
    public class FieldDocumentMakerVM : INotifyPropertyChanged
    {
        public event PropertyChangedEventHandler PropertyChanged;

        private IWpfWebBrowser webBrowser;

        public List<TreeBranchVMItemSource> TreeBranchItemSource { get; }


        public string Address
        {
            get
            {
                //return string.Format("file:///{0}", Path.Combine(Path.GetDirectoryName(Assembly.GetExecutingAssembly().Location), "inicio.html"));
                return "about:blank";
            }
        }

        public IWpfWebBrowser WebBrowser { 
            get => webBrowser; 
            set { 
                webBrowser = value;
                this.PropertyChanged?.Invoke(this, new PropertyChangedEventArgs("WebBrowser"));
            } 
        }

        internal FieldDocumentMakerVM(List<TreeBranchVMItemSource> treeBranch)
        {
            this.TreeBranchItemSource = treeBranch;
        }

    }
}
