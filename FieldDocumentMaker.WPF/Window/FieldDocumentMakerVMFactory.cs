using FieldDocumentMaker.Library.Domain.Entities.Tree;
using FieldDocumentMaker.WPF.ViewModel.TreeBranch;
using System.Collections.Generic;

namespace FieldDocumentMaker.WPF.ViewModel
{
    public  class FieldDocumentMakerVMFactory
    {
        public readonly TreeBranchVMFactory treeBranchVMFactory;

        public FieldDocumentMakerVMFactory(TreeBranchVMFactory treeBranchVMFactory)
        {
            this.treeBranchVMFactory = treeBranchVMFactory;
        }

        public  FieldDocumentMakerVM CreateVM(EntityTree entity)
        {
            return new FieldDocumentMakerVM(treeBranchVMFactory.CreateVM(entity));
        }
    }
}
