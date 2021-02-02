import 'quill';
import 'parchment';
import { default as DeltaTypescriptClass } from 'quill-delta';
import * as QuillImplementation from 'quill';
import { default as QuillTypescriptClass } from 'quill';

export type QuillType = QuillTypescriptClass;
export const Quill: typeof QuillTypescriptClass = QuillImplementation as any;
export type DeltaType = DeltaTypescriptClass;
export const Delta: typeof DeltaTypescriptClass = DeltaTypescriptClass as any;



