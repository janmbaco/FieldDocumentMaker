using CefSharp.Wpf.HwndHost;
using FieldDocumentMaker.WPF.ViewModel.TreeBranch;
using System.Collections.Generic;
using System.IO;
using System.Reflection;

namespace FieldDocumentMaker.WPF
{
    public class FieldDocumentMakerVM
    {

        public List<TreeBranchVM> TreeBranchVM { get;  }

        public IWpfWebBrowser WebBrowser { get;  set; }
       
        public string Address
        {
            get
            {
                return string.Format("file:///{0}", Path.Combine(Path.GetDirectoryName(Assembly.GetExecutingAssembly().Location), "htmlView/index.html"));
            }
        }

        internal FieldDocumentMakerVM(List<TreeBranchVM> treeBranch)
        {
            this.TreeBranchVM = treeBranch;
        }

    }
}
