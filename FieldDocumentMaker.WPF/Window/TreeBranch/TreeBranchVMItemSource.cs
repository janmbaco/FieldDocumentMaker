using FieldDocumentMaker.Library.Domain.Services;

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
