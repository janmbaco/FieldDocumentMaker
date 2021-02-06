/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./node_modules/guid-typescript/dist/guid.js":
/*!***************************************************!*\
  !*** ./node_modules/guid-typescript/dist/guid.js ***!
  \***************************************************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";
eval("\r\nexports.__esModule = true;\r\nvar Guid = /** @class */ (function () {\r\n    function Guid(guid) {\r\n        if (!guid) {\r\n            throw new TypeError(\"Invalid argument; `value` has no value.\");\r\n        }\r\n        this.value = Guid.EMPTY;\r\n        if (guid && Guid.isGuid(guid)) {\r\n            this.value = guid;\r\n        }\r\n    }\r\n    Guid.isGuid = function (guid) {\r\n        var value = guid.toString();\r\n        return guid && (guid instanceof Guid || Guid.validator.test(value));\r\n    };\r\n    Guid.create = function () {\r\n        return new Guid([Guid.gen(2), Guid.gen(1), Guid.gen(1), Guid.gen(1), Guid.gen(3)].join(\"-\"));\r\n    };\r\n    Guid.createEmpty = function () {\r\n        return new Guid(\"emptyguid\");\r\n    };\r\n    Guid.parse = function (guid) {\r\n        return new Guid(guid);\r\n    };\r\n    Guid.raw = function () {\r\n        return [Guid.gen(2), Guid.gen(1), Guid.gen(1), Guid.gen(1), Guid.gen(3)].join(\"-\");\r\n    };\r\n    Guid.gen = function (count) {\r\n        var out = \"\";\r\n        for (var i = 0; i < count; i++) {\r\n            // tslint:disable-next-line:no-bitwise\r\n            out += (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);\r\n        }\r\n        return out;\r\n    };\r\n    Guid.prototype.equals = function (other) {\r\n        // Comparing string `value` against provided `guid` will auto-call\r\n        // toString on `guid` for comparison\r\n        return Guid.isGuid(other) && this.value === other.toString();\r\n    };\r\n    Guid.prototype.isEmpty = function () {\r\n        return this.value === Guid.EMPTY;\r\n    };\r\n    Guid.prototype.toString = function () {\r\n        return this.value;\r\n    };\r\n    Guid.prototype.toJSON = function () {\r\n        return {\r\n            value: this.value\r\n        };\r\n    };\r\n    Guid.validator = new RegExp(\"^[a-z0-9]{8}-[a-z0-9]{4}-[a-z0-9]{4}-[a-z0-9]{4}-[a-z0-9]{12}$\", \"i\");\r\n    Guid.EMPTY = \"00000000-0000-0000-0000-000000000000\";\r\n    return Guid;\r\n}());\r\nexports.Guid = Guid;\r\n\n\n//# sourceURL=webpack://field-document-maker.html-canvas/./node_modules/guid-typescript/dist/guid.js?");

/***/ }),

/***/ "./src/components/editor/editor-template.html":
/*!****************************************************!*\
  !*** ./src/components/editor/editor-template.html ***!
  \****************************************************/
/***/ ((module) => {

eval("// Module\nvar code = \"<div class=\\\"editor\\\"> <div class=\\\"top\\\"> </div> <div class=\\\"center\\\"> <div class=\\\"left\\\"> </div> <div class=\\\"middle\\\"> </div> <div class=\\\"right\\\"> </div> </div> <div class=\\\"bottom\\\"> </div> </div>\";\n// Exports\nmodule.exports = code;\n\n//# sourceURL=webpack://field-document-maker.html-canvas/./src/components/editor/editor-template.html?");

/***/ }),

/***/ "./src/components/paragraph/paragraph-template.html":
/*!**********************************************************!*\
  !*** ./src/components/paragraph/paragraph-template.html ***!
  \**********************************************************/
/***/ ((module) => {

eval("// Module\nvar code = \"<div class=\\\"paragraph\\\"> <div class=\\\"top\\\"> </div> <p class=\\\"innerParagraph\\\" contenteditable=\\\"true\\\"><br></p> <div class=\\\"bottom\\\"> </div> </div>\";\n// Exports\nmodule.exports = code;\n\n//# sourceURL=webpack://field-document-maker.html-canvas/./src/components/paragraph/paragraph-template.html?");

/***/ }),

/***/ "./src/components/editor/editor-style.css":
/*!************************************************!*\
  !*** ./src/components/editor/editor-style.css ***!
  \************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n// extracted by mini-css-extract-plugin\n\n\n//# sourceURL=webpack://field-document-maker.html-canvas/./src/components/editor/editor-style.css?");

/***/ }),

/***/ "./src/components/paragraph/paragraph-style.css":
/*!******************************************************!*\
  !*** ./src/components/paragraph/paragraph-style.css ***!
  \******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n// extracted by mini-css-extract-plugin\n\n\n//# sourceURL=webpack://field-document-maker.html-canvas/./src/components/paragraph/paragraph-style.css?");

/***/ }),

/***/ "./src/app.ts":
/*!********************!*\
  !*** ./src/app.ts ***!
  \********************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";
eval("\r\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\r\nconst editor_component_1 = __webpack_require__(/*! ./components/editor/editor-component */ \"./src/components/editor/editor-component.ts\");\r\nconst paragraph_component_1 = __webpack_require__(/*! ./components/paragraph/paragraph-component */ \"./src/components/paragraph/paragraph-component.ts\");\r\nconst editor = new editor_component_1.Editor(document.getElementById(\"container\"));\r\neditor.insertParagraph(new paragraph_component_1.Paragraph(\"Nulla pariatur incididunt laborum sunt occaecat ullamco fugiat labore elit sint.\"));\r\neditor.insertParagraph(new paragraph_component_1.Paragraph(\"Est ut est laborum sint occaecat nostrud labore excepteur. Labore non cillum culpa elit pariatur velit elit esse cillum magna. Laborum nulla ullamco aliqua ullamco pariatur qui aute. Veniam irure consectetur ea voluptate consectetur labore dolor ea cillum velit est ad. Pariatur culpa consectetur consectetur reprehenderit dolor Lorem proident.\"));\r\neditor.insertParagraph(new paragraph_component_1.Paragraph(\"Deserunt voluptate veniam tempor aliqua qui laboris adipisicing. Anim ex magna nostrud amet. Et tempor dolor Lorem aliqua quis occaecat id sit occaecat sit. Incididunt aliquip do id et laboris anim occaecat excepteur cillum et commodo. Nisi do labore et voluptate veniam sit adipisicing quis sunt nulla cillum magna do officia. Incididunt consequat ipsum aliquip elit reprehenderit fugiat minim magna minim in est do laborum.\"));\r\neditor.insertParagraph(new paragraph_component_1.Paragraph(\"Et ipsum aliquip velit commodo labore elit cillum minim velit labore minim est veniam ullamco. Consequat nulla do laborum in enim qui eu Lorem pariatur. Culpa duis magna id ullamco nulla ipsum. Laboris ex ipsum ut excepteur duis aliquip duis id deserunt laborum excepteur id. Eiusmod ut pariatur quis nisi pariatur reprehenderit consequat nisi consectetur consectetur officia ex.\"));\r\neditor.insertParagraph(new paragraph_component_1.Paragraph(\"Duis velit deserunt fugiat officia incididunt qui ut minim. Adipisicing aute minim do cupidatat elit ullamco. Occaecat dolor voluptate quis anim est non labore et quis ipsum exercitation minim culpa culpa. Aute ullamco consectetur consectetur consectetur velit amet excepteur consectetur cillum.\"));\r\neditor.insertParagraph(new paragraph_component_1.Paragraph(\"Cillum enim eiusmod aute exercitation. Commodo irure tempor officia ex mollit incididunt ea consectetur. Officia consequat sit reprehenderit consectetur culpa ut elit Lorem ipsum sunt do officia sunt anim.\"));\r\neditor.insertParagraph(new paragraph_component_1.Paragraph(\"Nostrud dolor non occaecat veniam labore mollit qui cupidatat do non ipsum. Ullamco Lorem tempor dolor consectetur adipisicing tempor dolor eiusmod occaecat aute consequat. Lorem nostrud culpa pariatur ea cupidatat deserunt aliquip sit ex et ea. Occaecat magna laborum id enim laborum tempor consectetur eu occaecat duis. Ipsum velit do cupidatat aliquip esse officia do incididunt nulla eu ea sit velit.\"));\r\neditor.select(0);\r\n\n\n//# sourceURL=webpack://field-document-maker.html-canvas/./src/app.ts?");

/***/ }),

/***/ "./src/components/editor/editor-component.ts":
/*!***************************************************!*\
  !*** ./src/components/editor/editor-component.ts ***!
  \***************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";
eval("\r\nvar __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {\r\n    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;\r\n    if (typeof Reflect === \"object\" && typeof Reflect.decorate === \"function\") r = Reflect.decorate(decorators, target, key, desc);\r\n    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;\r\n    return c > 3 && r && Object.defineProperty(target, key, r), r;\r\n};\r\nvar __importDefault = (this && this.__importDefault) || function (mod) {\r\n    return (mod && mod.__esModule) ? mod : { \"default\": mod };\r\n};\r\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\r\nexports.Editor = void 0;\r\n__webpack_require__(/*! ./editor-style.css */ \"./src/components/editor/editor-style.css\");\r\nconst editor_template_html_1 = __importDefault(__webpack_require__(/*! ./editor-template.html */ \"./src/components/editor/editor-template.html\"));\r\nconst autobind_1 = __webpack_require__(/*! ../../decorators/autobind */ \"./src/decorators/autobind.ts\");\r\nconst paragraph_component_1 = __webpack_require__(/*! ../paragraph/paragraph-component */ \"./src/components/paragraph/paragraph-component.ts\");\r\nclass Editor {\r\n    constructor(parent) {\r\n        this.paragraphs = [];\r\n        this.initialPoint = { x: 0, y: 0 };\r\n        this.direction = 'BOTTOM';\r\n        this.idParagraphDraggin = null;\r\n        parent.innerHTML = editor_template_html_1.default;\r\n        this.editorView = parent.firstElementChild;\r\n        this.paragraphAreaView = this.editorView.getElementsByClassName(\"middle\")[0];\r\n        this.editorView.addEventListener('dragover', this.dragOverHandler);\r\n        this.editorView.addEventListener('dragleave', this.dragLeaveHandler);\r\n        this.editorView.addEventListener('drop', this.dropHandler);\r\n    }\r\n    insertParagraph(paragraph) {\r\n        this.paragraphAreaView.append(paragraph.AsHtmlElement());\r\n        this.paragraphs.push(paragraph);\r\n        paragraph.enter = this.onParagraphEnter;\r\n        paragraph.dragging = this.onParagrphDraggin;\r\n        paragraph.focus();\r\n    }\r\n    select(paragraphNumber) {\r\n        this.paragraphs[paragraphNumber].focus();\r\n    }\r\n    dragOverHandler(event) {\r\n        if (this.idParagraphDraggin != null) {\r\n            event.preventDefault();\r\n        }\r\n    }\r\n    dropHandler(event) {\r\n        var _a;\r\n        if (this.idParagraphDraggin != null) {\r\n            event.preventDefault();\r\n            console.log(\"target: \" + ((_a = event.target) === null || _a === void 0 ? void 0 : _a.innerText));\r\n            const paragraph = this.paragraphs.filter(p => p.id === this.idParagraphDraggin)[0];\r\n            if (event.target === this.editorView) {\r\n                this.editorView.appendChild(paragraph.AsHtmlElement());\r\n            }\r\n            else {\r\n                this.editorView.insertBefore(paragraph.AsHtmlElement(), event.target.nextElementSibling);\r\n            }\r\n            this.idParagraphDraggin = null;\r\n        }\r\n    }\r\n    dragLeaveHandler(_) {\r\n    }\r\n    onParagraphEnter() {\r\n        const paragraph = new paragraph_component_1.Paragraph();\r\n        this.insertParagraph(paragraph);\r\n    }\r\n    onParagrphDraggin(uid) {\r\n        this.idParagraphDraggin = uid;\r\n    }\r\n}\r\n__decorate([\r\n    autobind_1.Autobind\r\n], Editor.prototype, \"dragOverHandler\", null);\r\n__decorate([\r\n    autobind_1.Autobind\r\n], Editor.prototype, \"dropHandler\", null);\r\n__decorate([\r\n    autobind_1.Autobind\r\n], Editor.prototype, \"dragLeaveHandler\", null);\r\n__decorate([\r\n    autobind_1.Autobind\r\n], Editor.prototype, \"onParagraphEnter\", null);\r\n__decorate([\r\n    autobind_1.Autobind\r\n], Editor.prototype, \"onParagrphDraggin\", null);\r\nexports.Editor = Editor;\r\n\n\n//# sourceURL=webpack://field-document-maker.html-canvas/./src/components/editor/editor-component.ts?");

/***/ }),

/***/ "./src/components/paragraph/paragraph-component.ts":
/*!*********************************************************!*\
  !*** ./src/components/paragraph/paragraph-component.ts ***!
  \*********************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";
eval("\r\nvar __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {\r\n    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;\r\n    if (typeof Reflect === \"object\" && typeof Reflect.decorate === \"function\") r = Reflect.decorate(decorators, target, key, desc);\r\n    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;\r\n    return c > 3 && r && Object.defineProperty(target, key, r), r;\r\n};\r\nvar __importDefault = (this && this.__importDefault) || function (mod) {\r\n    return (mod && mod.__esModule) ? mod : { \"default\": mod };\r\n};\r\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\r\nexports.Paragraph = void 0;\r\n__webpack_require__(/*! ./paragraph-style.css */ \"./src/components/paragraph/paragraph-style.css\");\r\nconst paragraph_template_html_1 = __importDefault(__webpack_require__(/*! ./paragraph-template.html */ \"./src/components/paragraph/paragraph-template.html\"));\r\nconst autobind_1 = __webpack_require__(/*! ../../decorators/autobind */ \"./src/decorators/autobind.ts\");\r\nconst guid_typescript_1 = __webpack_require__(/*! guid-typescript */ \"./node_modules/guid-typescript/dist/guid.js\");\r\nclass Paragraph {\r\n    constructor(text) {\r\n        this.enter = () => { };\r\n        this.dragging = () => { };\r\n        this.id = guid_typescript_1.Guid.create();\r\n        const template = document.createElement(\"template\");\r\n        template.innerHTML = paragraph_template_html_1.default;\r\n        this.view = template.content.firstElementChild;\r\n        this.top = this.view.getElementsByClassName(\"top\")[0];\r\n        this.bottom = this.view.getElementsByClassName(\"bottom\")[0];\r\n        this.innerParagraph = this.view.getElementsByClassName(\"innerParagraph\")[0];\r\n        this.view.addEventListener('mouseenter', _ => this.view.classList.add(\"reborder\"));\r\n        this.view.addEventListener('mouseleave', _ => this.view.classList.remove(\"reborder\"));\r\n        this.top.addEventListener('mouseenter', _ => this.togleDraggable(true));\r\n        this.top.addEventListener('mouseleave', _ => this.togleDraggable(false));\r\n        this.bottom.addEventListener('mouseenter', _ => this.togleDraggable(true));\r\n        this.bottom.addEventListener('mouseleave', _ => this.togleDraggable(false));\r\n        this.view.addEventListener('dragstart', this.dragStartHandler);\r\n        this.view.addEventListener('dragend', this.dragEndHandler);\r\n        this.innerParagraph.innerText = text ? text : '';\r\n        this.innerParagraph.addEventListener('keydown', e => {\r\n            console.log(e.key);\r\n            if (e.key === 'Enter') {\r\n                e.preventDefault();\r\n                this.enter();\r\n            }\r\n        });\r\n    }\r\n    focus() {\r\n        this.innerParagraph.focus();\r\n    }\r\n    AsHtmlElement() {\r\n        return this.view;\r\n    }\r\n    togleDraggable(option) {\r\n        this.view.draggable = option;\r\n    }\r\n    dragStartHandler(event) {\r\n        var _a;\r\n        if (event.target == this.view) {\r\n            this.view.classList.add(\"dragging\");\r\n            (_a = event.dataTransfer) === null || _a === void 0 ? void 0 : _a.setData('text/plain', '#paragraph#');\r\n            event.dataTransfer.effectAllowed = 'move';\r\n            this.dragging(this.id);\r\n        }\r\n    }\r\n    dragEndHandler(event) {\r\n        if (event.target == this.view) {\r\n            this.view.classList.remove(\"dragging\");\r\n        }\r\n    }\r\n}\r\n__decorate([\r\n    autobind_1.Autobind\r\n], Paragraph.prototype, \"togleDraggable\", null);\r\n__decorate([\r\n    autobind_1.Autobind\r\n], Paragraph.prototype, \"dragStartHandler\", null);\r\n__decorate([\r\n    autobind_1.Autobind\r\n], Paragraph.prototype, \"dragEndHandler\", null);\r\nexports.Paragraph = Paragraph;\r\n\n\n//# sourceURL=webpack://field-document-maker.html-canvas/./src/components/paragraph/paragraph-component.ts?");

/***/ }),

/***/ "./src/decorators/autobind.ts":
/*!************************************!*\
  !*** ./src/decorators/autobind.ts ***!
  \************************************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";
eval("\r\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\r\nexports.Autobind = void 0;\r\nfunction Autobind(_, _2, descriptor) {\r\n    const originalMethod = descriptor.value;\r\n    const adjDescriptor = {\r\n        configurable: true,\r\n        enumerable: false,\r\n        get() {\r\n            const boundFn = originalMethod.bind(this);\r\n            return boundFn;\r\n        }\r\n    };\r\n    return adjDescriptor;\r\n}\r\nexports.Autobind = Autobind;\r\n\n\n//# sourceURL=webpack://field-document-maker.html-canvas/./src/decorators/autobind.ts?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		if(__webpack_module_cache__[moduleId]) {
/******/ 			return __webpack_module_cache__[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	// startup
/******/ 	// Load entry module
/******/ 	__webpack_require__("./src/app.ts");
/******/ 	// This entry module used 'exports' so it can't be inlined
/******/ })()
;