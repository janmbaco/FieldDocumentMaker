import { Editor } from "./components/editor/editor-component";
import { Paragraph } from "./components/paragraph/paragraph-component";


function main(){

    const editor = new Editor(document.getElementById("container") as HTMLElement)
    editor.insertParagraph(new Paragraph("Nulla pariatur incididunt laborum sunt occaecat ullamco fugiat labore elit sint."))
    editor.insertParagraph(new Paragraph("Est ut est laborum sint occaecat nostrud labore excepteur. Labore non cillum culpa elit pariatur velit elit esse cillum magna. Laborum nulla ullamco aliqua ullamco pariatur qui aute. Veniam irure consectetur ea voluptate consectetur labore dolor ea cillum velit est ad. Pariatur culpa consectetur consectetur reprehenderit dolor Lorem proident."))
    editor.insertParagraph(new Paragraph("Deserunt voluptate veniam tempor aliqua qui laboris adipisicing. Anim ex magna nostrud amet. Et tempor dolor Lorem aliqua quis occaecat id sit occaecat sit. Incididunt aliquip do id et laboris anim occaecat excepteur cillum et commodo. Nisi do labore et voluptate veniam sit adipisicing quis sunt nulla cillum magna do officia. Incididunt consequat ipsum aliquip elit reprehenderit fugiat minim magna minim in est do laborum."))
    editor.insertParagraph(new Paragraph("Et ipsum aliquip velit commodo labore elit cillum minim velit labore minim est veniam ullamco. Consequat nulla do laborum in enim qui eu Lorem pariatur. Culpa duis magna id ullamco nulla ipsum. Laboris ex ipsum ut excepteur duis aliquip duis id deserunt laborum excepteur id. Eiusmod ut pariatur quis nisi pariatur reprehenderit consequat nisi consectetur consectetur officia ex."))
    editor.insertParagraph(new Paragraph("Duis velit deserunt fugiat officia incididunt qui ut minim. Adipisicing aute minim do cupidatat elit ullamco. Occaecat dolor voluptate quis anim est non labore et quis ipsum exercitation minim culpa culpa. Aute ullamco consectetur consectetur consectetur velit amet excepteur consectetur cillum."))
    editor.insertParagraph(new Paragraph("Cillum enim eiusmod aute exercitation. Commodo irure tempor officia ex mollit incididunt ea consectetur. Officia consequat sit reprehenderit consectetur culpa ut elit Lorem ipsum sunt do officia sunt anim."))
    editor.insertParagraph(new Paragraph("Nostrud dolor non occaecat veniam labore mollit qui cupidatat do non ipsum. Ullamco Lorem tempor dolor consectetur adipisicing tempor dolor eiusmod occaecat aute consequat. Lorem nostrud culpa pariatur ea cupidatat deserunt aliquip sit ex et ea. Occaecat magna laborum id enim laborum tempor consectetur eu occaecat duis. Ipsum velit do cupidatat aliquip esse officia do incididunt nulla eu ea sit velit."))
    editor.select(0)
}

main()


