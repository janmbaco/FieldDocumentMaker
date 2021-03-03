using FieldDocumentMaker.Library.Domain.Services;
using FieldDocumentMaker.WPF.Window.TreeBranch;
using FieldDocumentMaker.WPF.Window.WebBrowser.Handlers;

namespace FieldDocumentMaker.WPF.Window
{
    public  class FieldDocumentMakerDataContextFactory
    {
        public readonly TreeBranchVMFactory treeBranchVMFactory;

        public FieldDocumentMakerDataContextFactory(TreeBranchVMFactory treeBranchVMFactory)
        {
            this.treeBranchVMFactory = treeBranchVMFactory;
        }

        public FieldDocumentMakerDataContext Create(FieldDocumentMakerService fieldDocumentMakerService)
        {
            var vm = new FieldDocumentMakerVM(treeBranchVMFactory.CreateVM(fieldDocumentMakerService.GetEntityTree()));
            var ctxmenu = new ContextMenuHandler();
            var ed = new WebBrowser.EditorScriptManager(fieldDocumentMakerService);
            var wm = new WebBrowser.WebBrowserManager(ed, ctxmenu);
            var ds = new FieldDocumentMakerVMDataSource(vm, wm);
            return new FieldDocumentMakerDataContext(vm, ds);
        }
    }
}
