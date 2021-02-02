using System.Collections.Generic;

namespace FieldDocumentMaker.WPF.ViewModel.TreeBranch
{
    public class TreeBranchVM
    {
        public string Value { get; }

        public List<TreeBranchVM> Children { get; }

        internal TreeBranchVM(string value, List<TreeBranchVM> children)
        {
            this.Value = value;
            this.Children = children;
        }

    }
}
