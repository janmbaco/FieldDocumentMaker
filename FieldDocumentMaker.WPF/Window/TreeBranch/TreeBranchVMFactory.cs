using FieldDocumentMaker.Library.Domain.Entities.Tree;
using FieldDocumentMaker.Library.Domain.Services;
using System.Collections.Generic;

namespace FieldDocumentMaker.WPF.Window.TreeBranch
{
    public class TreeBranchVMFactory
    {
        readonly IFieldDocumentMakerService fieldDocumentMakerService;

        public TreeBranchVMFactory(IFieldDocumentMakerService fieldDocumentMakerService)
        {
            this.fieldDocumentMakerService = fieldDocumentMakerService;
        }

        public List<TreeBranchVMItemSource> CreateVM(EntityTree entity)
        {
            List<TreeBranchVMItemSource> result = new List<TreeBranchVMItemSource>();

            foreach (EntityBranch branch in entity.GetChildren<EntityBranch>())
            {
                result.Add(this.CreateVM(branch));
            }

            return result;
        }

        public TreeBranchVMItemSource CreateVM(EntityBranch entity)
        {
            string name = entity.Name;
            List<TreeBranchVMItemSource> children = new List<TreeBranchVMItemSource>();

            foreach (EntityLeaf branch in entity.GetChildren<EntityLeaf>())
            {
                children.Add(this.CreateVM(branch));
            }
            foreach (EntityBranch branch in entity.GetChildren<EntityBranch>())
            {
                children.Add(this.CreateVM(branch));
            }


            return new TreeBranchVMItemSource(new TreeBranchVM(name, null, children), null);
        }

        public TreeBranchVMItemSource CreateVM(EntityLeaf entity)
        {
            return new TreeBranchVMItemSource(new TreeBranchVM(entity.Name, entity.Value, new List<TreeBranchVMItemSource>()), fieldDocumentMakerService.GetBindingFieldObserver(entity.Id));

        }

    }
}
