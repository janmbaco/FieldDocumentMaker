(()=>{var e={442:(e,t)=>{"use strict";t.__esModule=!0;var i=function(){function e(t){if(!t)throw new TypeError("Invalid argument; `value` has no value.");this.value=e.EMPTY,t&&e.isGuid(t)&&(this.value=t)}return e.isGuid=function(t){var i=t.toString();return t&&(t instanceof e||e.validator.test(i))},e.create=function(){return new e([e.gen(2),e.gen(1),e.gen(1),e.gen(1),e.gen(3)].join("-"))},e.createEmpty=function(){return new e("emptyguid")},e.parse=function(t){return new e(t)},e.raw=function(){return[e.gen(2),e.gen(1),e.gen(1),e.gen(1),e.gen(3)].join("-")},e.gen=function(e){for(var t="",i=0;i<e;i++)t+=(65536*(1+Math.random())|0).toString(16).substring(1);return t},e.prototype.equals=function(t){return e.isGuid(t)&&this.value===t.toString()},e.prototype.isEmpty=function(){return this.value===e.EMPTY},e.prototype.toString=function(){return this.value},e.prototype.toJSON=function(){return{value:this.value}},e.validator=new RegExp("^[a-z0-9]{8}-[a-z0-9]{4}-[a-z0-9]{4}-[a-z0-9]{4}-[a-z0-9]{12}$","i"),e.EMPTY="00000000-0000-0000-0000-000000000000",e}();t.Guid=i},666:e=>{e.exports='<div class="editor"> <div class="top"> </div> <div class="center"> <div class="left"> </div> <div class="middle"> </div> <div class="right"> </div> </div> <div class="bottom"> </div> </div>'},455:e=>{e.exports='<div class="paragraph"> <div class="top"> </div> <p class="innerParagraph" contenteditable="true"><br></p> <div class="bottom"> </div> </div>'},601:(e,t,i)=>{"use strict";i.r(t)},909:(e,t,i)=>{"use strict";i.r(t)},752:(e,t,i)=>{"use strict";const a=i(654),r=i(299),n=new a.Editor(document.getElementById("container"));n.insertParagraph(new r.Paragraph("Nulla pariatur incididunt laborum sunt occaecat ullamco fugiat labore elit sint.")),n.insertParagraph(new r.Paragraph("Est ut est laborum sint occaecat nostrud labore excepteur. Labore non cillum culpa elit pariatur velit elit esse cillum magna. Laborum nulla ullamco aliqua ullamco pariatur qui aute. Veniam irure consectetur ea voluptate consectetur labore dolor ea cillum velit est ad. Pariatur culpa consectetur consectetur reprehenderit dolor Lorem proident.")),n.insertParagraph(new r.Paragraph("Deserunt voluptate veniam tempor aliqua qui laboris adipisicing. Anim ex magna nostrud amet. Et tempor dolor Lorem aliqua quis occaecat id sit occaecat sit. Incididunt aliquip do id et laboris anim occaecat excepteur cillum et commodo. Nisi do labore et voluptate veniam sit adipisicing quis sunt nulla cillum magna do officia. Incididunt consequat ipsum aliquip elit reprehenderit fugiat minim magna minim in est do laborum.")),n.insertParagraph(new r.Paragraph("Et ipsum aliquip velit commodo labore elit cillum minim velit labore minim est veniam ullamco. Consequat nulla do laborum in enim qui eu Lorem pariatur. Culpa duis magna id ullamco nulla ipsum. Laboris ex ipsum ut excepteur duis aliquip duis id deserunt laborum excepteur id. Eiusmod ut pariatur quis nisi pariatur reprehenderit consequat nisi consectetur consectetur officia ex.")),n.insertParagraph(new r.Paragraph("Duis velit deserunt fugiat officia incididunt qui ut minim. Adipisicing aute minim do cupidatat elit ullamco. Occaecat dolor voluptate quis anim est non labore et quis ipsum exercitation minim culpa culpa. Aute ullamco consectetur consectetur consectetur velit amet excepteur consectetur cillum.")),n.insertParagraph(new r.Paragraph("Cillum enim eiusmod aute exercitation. Commodo irure tempor officia ex mollit incididunt ea consectetur. Officia consequat sit reprehenderit consectetur culpa ut elit Lorem ipsum sunt do officia sunt anim.")),n.insertParagraph(new r.Paragraph("Nostrud dolor non occaecat veniam labore mollit qui cupidatat do non ipsum. Ullamco Lorem tempor dolor consectetur adipisicing tempor dolor eiusmod occaecat aute consequat. Lorem nostrud culpa pariatur ea cupidatat deserunt aliquip sit ex et ea. Occaecat magna laborum id enim laborum tempor consectetur eu occaecat duis. Ipsum velit do cupidatat aliquip esse officia do incididunt nulla eu ea sit velit.")),n.select(0)},654:function(e,t,i){"use strict";var a=this&&this.__decorate||function(e,t,i,a){var r,n=arguments.length,o=n<3?t:null===a?a=Object.getOwnPropertyDescriptor(t,i):a;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(e,t,i,a);else for(var s=e.length-1;s>=0;s--)(r=e[s])&&(o=(n<3?r(o):n>3?r(t,i,o):r(t,i))||o);return n>3&&o&&Object.defineProperty(t,i,o),o},r=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0}),t.Editor=void 0,i(601);const n=r(i(666)),o=i(905),s=i(299);class l{constructor(e){this.paragraphs=[],this.initialPoint={x:0,y:0},this.direction="BOTTOM",this.idParagraphDraggin=null,e.innerHTML=n.default,this.editorView=e.firstElementChild,this.paragraphAreaView=this.editorView.getElementsByClassName("middle")[0],this.editorView.addEventListener("dragover",this.dragOverHandler),this.editorView.addEventListener("dragleave",this.dragLeaveHandler),this.editorView.addEventListener("drop",this.dropHandler)}insertParagraph(e){this.paragraphAreaView.append(e.AsHtmlElement()),this.paragraphs.push(e),e.enter=this.onParagraphEnter,e.dragging=this.onParagrphDraggin,e.focus()}select(e){this.paragraphs[e].focus()}dragOverHandler(e){null!=this.idParagraphDraggin&&e.preventDefault()}dropHandler(e){var t;if(null!=this.idParagraphDraggin){e.preventDefault(),console.log("target: "+(null===(t=e.target)||void 0===t?void 0:t.innerText));const i=this.paragraphs.filter((e=>e.id===this.idParagraphDraggin))[0];e.target===this.editorView?this.editorView.appendChild(i.AsHtmlElement()):this.editorView.insertBefore(i.AsHtmlElement(),e.target.nextElementSibling),this.idParagraphDraggin=null}}dragLeaveHandler(e){}onParagraphEnter(){const e=new s.Paragraph;this.insertParagraph(e)}onParagrphDraggin(e){this.idParagraphDraggin=e}}a([o.Autobind],l.prototype,"dragOverHandler",null),a([o.Autobind],l.prototype,"dropHandler",null),a([o.Autobind],l.prototype,"dragLeaveHandler",null),a([o.Autobind],l.prototype,"onParagraphEnter",null),a([o.Autobind],l.prototype,"onParagrphDraggin",null),t.Editor=l},299:function(e,t,i){"use strict";var a=this&&this.__decorate||function(e,t,i,a){var r,n=arguments.length,o=n<3?t:null===a?a=Object.getOwnPropertyDescriptor(t,i):a;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(e,t,i,a);else for(var s=e.length-1;s>=0;s--)(r=e[s])&&(o=(n<3?r(o):n>3?r(t,i,o):r(t,i))||o);return n>3&&o&&Object.defineProperty(t,i,o),o},r=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0}),t.Paragraph=void 0,i(909);const n=r(i(455)),o=i(905),s=i(442);class l{constructor(e){this.enter=()=>{},this.dragging=()=>{},this.id=s.Guid.create();const t=document.createElement("template");t.innerHTML=n.default,this.view=t.content.firstElementChild,this.top=this.view.getElementsByClassName("top")[0],this.bottom=this.view.getElementsByClassName("bottom")[0],this.innerParagraph=this.view.getElementsByClassName("innerParagraph")[0],this.view.addEventListener("mouseenter",(e=>this.view.classList.add("reborder"))),this.view.addEventListener("mouseleave",(e=>this.view.classList.remove("reborder"))),this.top.addEventListener("mouseenter",(e=>this.togleDraggable(!0))),this.top.addEventListener("mouseleave",(e=>this.togleDraggable(!1))),this.bottom.addEventListener("mouseenter",(e=>this.togleDraggable(!0))),this.bottom.addEventListener("mouseleave",(e=>this.togleDraggable(!1))),this.view.addEventListener("dragstart",this.dragStartHandler),this.view.addEventListener("dragend",this.dragEndHandler),this.innerParagraph.innerText=e||"",this.innerParagraph.addEventListener("keydown",(e=>{console.log(e.key),"Enter"===e.key&&(e.preventDefault(),this.enter())}))}focus(){this.innerParagraph.focus()}AsHtmlElement(){return this.view}togleDraggable(e){this.view.draggable=e}dragStartHandler(e){var t;e.target==this.view&&(this.view.classList.add("dragging"),null===(t=e.dataTransfer)||void 0===t||t.setData("text/plain","#paragraph#"),e.dataTransfer.effectAllowed="move",this.dragging(this.id))}dragEndHandler(e){e.target==this.view&&this.view.classList.remove("dragging")}}a([o.Autobind],l.prototype,"togleDraggable",null),a([o.Autobind],l.prototype,"dragStartHandler",null),a([o.Autobind],l.prototype,"dragEndHandler",null),t.Paragraph=l},905:(e,t)=>{"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.Autobind=void 0,t.Autobind=function(e,t,i){const a=i.value;return{configurable:!0,enumerable:!1,get(){return a.bind(this)}}}}},t={};function i(a){if(t[a])return t[a].exports;var r=t[a]={exports:{}};return e[a].call(r.exports,r,r.exports,i),r.exports}i.r=e=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},i(752)})();