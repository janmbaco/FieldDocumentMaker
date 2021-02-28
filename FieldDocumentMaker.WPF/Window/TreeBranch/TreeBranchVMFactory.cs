using FieldDocumentMaker.Library.Domain.Entities.Tree;
using System.Collections.Generic;

namespace FieldDocumentMaker.WPF.Window.TreeBranch
{
    public class TreeBranchVMFactory
    {
        public List<TreeBranchVM> CreateVM(EntityTree entity)
        {
            List<TreeBranchVM> result = new List<TreeBranchVM>();

            foreach (EntityBranch branch in entity.GetChildren<EntityBranch>())
            {
                result.Add(this.CreateVM(branch));
            }

            return result;
        }

        public TreeBranchVM CreateVM(EntityBranch entity)
        {
            string name = entity.Name;
            List<TreeBranchVM> children = new List<TreeBranchVM>();

            foreach (EntityLeaf branch in entity.GetChildren<EntityLeaf>())
            {
                children.Add(this.CreateVM(branch));
            }
            foreach (EntityBranch branch in entity.GetChildren<EntityBranch>())
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
