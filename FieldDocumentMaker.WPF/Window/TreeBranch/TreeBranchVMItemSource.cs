using FieldDocumentMaker.Library.Domain.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FieldDocumentMaker.WPF.Window.TreeBranch
{
    public class TreeBranchVMItemSource 
    {
        readonly BindingFieldObserver bindingFieldObserver;

        public TreeBranchVM ViewModel { get; private set; }

        public TreeBranchVMItemSource(TreeBranchVM treeBranchVM, BindingFieldObserver bindingFieldObserver)
        {
            this.bindingFieldObserver = bindingFieldObserver;
            this.ViewModel = treeBranchVM;

            if(this.bindingFieldObserver != null)
            {
                this.bindingFieldObserver.Changed += (b) => this.ViewModel.Value = b.Value;
            }
        }
    }
}
