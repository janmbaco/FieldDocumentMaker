using System.Collections.Generic;
using System.ComponentModel;
using System.Windows;
using System.Windows.Input;


namespace FieldDocumentMaker.WPF.Window.TreeBranch
{
    public class TreeBranchVM : INotifyPropertyChanged
    {
        private string _value;

        public string Value { 
            get => _value; 
            set { 
                _value = value;
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
