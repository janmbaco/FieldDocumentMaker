using FieldDocumentMaker.Library.Domain.Entities.Tree;
using FieldDocumentMaker.Library.Domain.Entities.Tree.Interfaces;
using System.Collections.Generic;
using System.Reflection;

namespace FieldDocumentMaker.WPF.ViewModel.TreeBranch
{
    public class TreeBranchVMFactory
    {


        public List<TreeBranchVM> CreateVM(EntityTree entity)
        {
            List<TreeBranchVM> result = new List<TreeBranchVM>();

            foreach (EntityBranch branch in entity.Children)
            {
                result.Add(this.CreateVM(branch));
            }

            return result;
        }

        public TreeBranchVM CreateVM(EntityBranch entity)
        {
            string name = entity.Name;
            List<TreeBranchVM> children = new List<TreeBranchVM>();

            foreach (EntityLeaf branch in entity.Leaves)
            {
                children.Add(this.CreateVM(branch));
            }
            foreach (EntityBranch branch in entity.Branches)
            {
                children.Add(this.CreateVM(branch));
            }

            return new TreeBranchVM(name, null, children);
        }

        public TreeBranchVM CreateVM(EntityLeaf entity)
        {
            return new TreeBranchVM(entity.Name, entity.Value, new List<TreeBranchVM>());

        }

    }
}
