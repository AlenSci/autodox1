import {cache, css} from "@emotion/css";
import React from "react";
// import Prism from "prismjs";
// import 'prismjs/components/prism-javascript'

const CodeHighLightLeaf = (props: any) => {

    const {attributes, children, leaf, type} = props;
    if (type == 'code'){
        return (
            <span
                className={css`
            font-family: monospace;
        ${leaf.comment &&
          css`
            color: slategray;
          `} 
        ${(leaf.operator || leaf.url) &&
          css`
            color: #9a6e3a;
          `}
        ${leaf.keyword &&
          css`
            color: #07a;
          `}
        ${(leaf.variable || leaf.regex) &&
          css`
            color: #e90;
          `}
        ${(leaf.number ||
          leaf.boolean ||
          leaf.tag ||
          leaf.constant ||
          leaf.symbol ||
          leaf['attr-name'] ||
          leaf.selector) &&
          css`
            color: #905;
          `}
        ${leaf.punctuation &&
          css`
            color: #999;
          `}
        ${(leaf.string || leaf.char) &&
          css`
            color: #690;
          `}
        ${(leaf.function || leaf['class-name']) &&
          css`
            color: #dd4a68;
          `}
        
      `}

                {...attributes}
            >
      {children}
    </span>
        )

    } else {
        return (
            <span
                {...attributes}
            >
      {children}
    </span>
        )
    }

    };
//
// Prism.languages.python = Prism.languages.extend('python', {})
// Prism.languages.insertBefore('python', 'prolog', {
//   comment: { pattern: /##[^\n]*/, alias: 'comment' },
// })
// Prism.languages.javascript = Prism.languages.extend('javascript', {})
// Prism.languages.insertBefore('javascript', 'prolog', {
//   comment: { pattern: /\/\/[^\n]*/, alias: 'comment' },
// })
// Prism.languages.html = Prism.languages.extend('html', {})
// Prism.languages.insertBefore('html', 'prolog', {
//   comment: { pattern: /<!--[^\n]*-->/, alias: 'comment' },
// })
// Prism.languages.markdown = Prism.languages.extend('markup', {})
// Prism.languages.insertBefore('markdown', 'prolog', {
//   blockquote: { pattern: /^>(?:[\t ]*>)*/m, alias: 'punctuation' },
//   code: [
//     { pattern: /^(?: {4}|\t).+/m, alias: 'keyword' },
//     { pattern: /``.+?``|`[^`\n]+`/, alias: 'keyword' },
//   ],
//   title: [
//     {
//       pattern: /\w+.*(?:\r?\n|\r)(?:==+|--+)/,
//       alias: 'important',
//       inside: { punctuation: /==+$|--+$/ },
//     },
//     {
//       pattern: /(^\s*)#+.+/m,
//       lookbehind: !0,
//       alias: 'important',
//       inside: { punctuation: /^#+|#+$/ },
//     },
//   ],
//   hr: {
//     pattern: /(^\s*)([*-])([\t ]*\2){2,}(?=\s*$)/m,
//     lookbehind: !0,
//     alias: 'punctuation',
//   },
//   list: {
//     pattern: /(^\s*)(?:[*+-]|\d+\.)(?=[\t ].)/m,
//     lookbehind: !0,
//     alias: 'punctuation',
//   },
//   'url-reference': {
//     pattern: /!?\[[^\]]+\]:[\t ]+(?:\S+|<(?:\\.|[^>\\])+>)(?:[\t ]+(?:"(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*'|\((?:\\.|[^)\\])*\)))?/,
//     inside: {
//       variable: { pattern: /^(!?\[)[^\]]+/, lookbehind: !0 },
//       string: /(?:"(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*'|\((?:\\.|[^)\\])*\))$/,
//       punctuation: /^[\[\]!:]|[<>]/,
//     },
//     alias: 'url',
//   },
//   bold: {
//     pattern: /(^|[^\\])(\*\*|__)(?:(?:\r?\n|\r)(?!\r?\n|\r)|.)+?\2/,
//     lookbehind: !0,
//     inside: { punctuation: /^\*\*|^__|\*\*$|__$/ },
//   },
//   italic: {
//     pattern: /(^|[^\\])([*_])(?:(?:\r?\n|\r)(?!\r?\n|\r)|.)+?\2/,
//     lookbehind: !0,
//     inside: { punctuation: /^[*_]|[*_]$/ },
//   },
//   url: {
//     pattern: /!?\[[^\]]+\](?:\([^\s)]+(?:[\t ]+"(?:\\.|[^"\\])*")?\)| ?\[[^\]\n]*\])/,
//     inside: {
//       variable: { pattern: /(!?\[)[^\]]+(?=\]$)/, lookbehind: !0 },
//       string: { pattern: /"(?:\\.|[^"\\])*"(?=\)$)/ },
//     },
//   },
// })
// Prism.languages.markdown.bold.inside.url = Prism.util.clone(
//   Prism.languages.markdown.url
// )
// Prism.languages.markdown.italic.inside.url = Prism.util.clone(
//   Prism.languages.markdown.url
// )
// Prism.languages.markdown.bold.inside.italic = Prism.util.clone(
//   Prism.languages.markdown.italic
// )
// Prism.languages.markdown.italic.inside.bold = Prism.util.clone(Prism.languages.markdown.bold); // prettier-ignore



export default CodeHighLightLeaf