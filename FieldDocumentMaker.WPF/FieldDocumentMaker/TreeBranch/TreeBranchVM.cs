﻿using System.Collections.Generic;

namespace FieldDocumentMaker.WPF.ViewModel.TreeBranch
{
    public class TreeBranchVM
    {
        public string Value { get; }

        public string PropertyName { get;  }

        public List<TreeBranchVM> Children { get; }

        internal TreeBranchVM(string propertyName, string value, List<TreeBranchVM> children)
        {
            this.PropertyName = propertyName;
            this.Value = value;
            this.Children = children;
        }

    }
}
