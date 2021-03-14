using System.Collections.Generic;
using System.ComponentModel;


namespace FieldDocumentMaker.WPF.Window.TreeBranch
{
    public class TreeBranchVM : INotifyPropertyChanged
    {
        private string value;

        public string Value { 
            get => this.value; 
            set { 
                this.value = value;
                this.PropertyChanged?.Invoke(this, new PropertyChangedEventArgs("Value"));
            } 
        }

        public string Label { get; }

        public List<TreeBranchVMItemSource> Children { get; }



        internal TreeBranchVM(string label, string value, List<TreeBranchVMItemSource> children)
        {
            this.Label = label;
            this.Value = value;
            this.Children = children;
        }

        public event PropertyChangedEventHandler PropertyChanged;
    }
}
