import { BoxProps } from "props/box";
import { DashBaseProps } from "props/dash";
import { StylesApiProps } from "props/styles";
import React, { Suspense } from "react";

// eslint-disable-next-line no-inline-comments
const LazyRichTextEditor = React.lazy(() => import(/* webpackChunkName: "RichTextEditor" */ './fragments/RichTextEditor'));

/** Supported extensions (add more as needed). */
type Extension = "StarterKit" | "Underline" | "Underline" | "Link" | "Superscript" | "SubScript" | "Highlight" | "TextAlign" | "Table" | "TableCell" | "TableRow" | "TableHeader";

/** Supported controls (add more as needed). */
type Control = "Bold" | "Italic" | "Underline" | "Strikethrough" | "ClearFormatting" | "Highlight" | "Code" | "H1" | "H2" | "H3" | "H4" | "Blockquote" | "Hr" | "BulletList" | "OrderedList" | "Subscript" | "Superscript" | "Link" | "Unlink" | "AlignLeft" | "AlignCenter" | "AlignJustify" | "AlignRight" | "Undo" | "Redo";

/** Toolbar property definition. */
type Toolbar = {
  sticky?: boolean;
  controlsGroups?: Control[][];
}

export interface Props extends BoxProps, StylesApiProps, DashBaseProps {
    /** JSON object (ProseMirror) representation of the editor content. Affected by debounce. */
    json?: object;

    /** HTML string representation of the editor content. Affected by debounce. */
    html?: string;

    /** Currently selected text. Affected by debounce. */
    selected_text?: string;

    /** If True, changes will be sent back to Dash only when losing focus. If False, data will be sent on every change. If a number, data will be sent when the value has been stable for that number of milliseconds. */
    debounce?: boolean | number;

    /** An integer that represents the number of times that this element has lost focus. */
    n_blur?: number;

    /** Variant of the editor. */
    variant?: 'default' | 'subtle';

    /** Extensions to be loaded by the editor. */
    extensions?: Extension[];

    /** Toolbar property definition. */
    toolbar?: Toolbar;

}

/** RichTextEditor */
const RichTextEditor = (props: Props) => {
    return (
      <Suspense fallback={null}>
        <LazyRichTextEditor {...props} />
      </Suspense>
    );
}

export default RichTextEditor;
