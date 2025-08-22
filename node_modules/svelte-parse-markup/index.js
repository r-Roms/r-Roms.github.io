// @ts-check
import { parse as parseSvelte } from 'svelte/compiler'

// https://github.com/sveltejs/svelte/blob/3acee5d2469a86f8b9ba9ae660ef2fb8c4899c80/packages/svelte/src/compiler/preprocess/index.js#L250-L254
const scriptRegex =
  /<script((?:\s+[^=>'"/]+=(?:"[^"]*"|'[^']*'|[^>\s]+)|\s+[^=>'"/]+)*\s*)(?:\/>|>([\S\s]*?)<\/script>)/g
const styleRegex =
  /<style((?:\s+[^=>'"/]+=(?:"[^"]*"|'[^']*'|[^>\s]+)|\s+[^=>'"/]+)*\s*)(?:\/>|>([\S\s]*?)<\/style>)/g
const contextModuleRegex = /context\s*=\s*["']module["']/i

// Use manual types here because TypeScript is unable to infer types for function overloads
/**
 * @param {string} template
 * @param {any} options
 */
export function parse(template, options) {
  const originalTemplate = template

  // text nodes that will be injected into the ast. there maybe be multiple as the regex
  // may catch script tags in `svelte:head` for example. we will handle this below.
  /** @type {import('svelte/compiler').Text[]} */
  const instanceNodes = []
  /** @type {import('svelte/compiler').Text[]} */
  const moduleNodes = []
  /** @type {import('svelte/compiler').Text[]} */
  const cssNodes = []

  // extract instance and module script tags
  template = template.replace(scriptRegex, (match, attrs, content) => {
    if (!content) return match

    const isContextModule = contextModuleRegex.test(attrs)
    // NOTE: the start and end here are relative to the match, we will fix this later
    const start = match.indexOf(content)
    const end = start + content.length
    // pre-construct text node
    /** @type {import('svelte/compiler').Text} */
    const node = {
      type: 'Text',
      start,
      end,
      raw: content,
      data: content,
      parent: null
    }
    if (isContextModule) {
      moduleNodes.push(node)
    } else {
      instanceNodes.push(node)
    }
    // empty content to avoid parsing errors
    return match.replace(content, content.replace(/./g, ' '))
  })

  // extract css style tags
  template = template.replace(styleRegex, (match, attrs, content) => {
    if (!content) return match

    // NOTE: the start and end here are relative to the match, we will fix this later
    const start = match.indexOf(content)
    const end = start + content.length
    // pre-construct text node
    /** @type {import('svelte/compiler').Text} */
    const node = {
      type: 'Text',
      start,
      end,
      raw: content,
      data: content,
      parent: null
    }
    cssNodes.push(node)
    // empty content to avoid parsing errors
    return match.replace(content, content.replace(/./g, ' '))
  })

  // do the actual parsing
  const ast = parseSvelte(template, options)

  // inject instance script text node
  if (ast.instance && instanceNodes.length) {
    for (const node of instanceNodes) {
      // fix relative num to absolute num
      node.start += ast.instance.start
      node.end += ast.instance.start
      if (
        // fast path
        instanceNodes.length === 1 ||
        // compare start-end slice to expected, only nodes that are inside the real instance script
        // will pass this condition
        originalTemplate.slice(node.start, node.end) === node.data
      ) {
        // @ts-expect-error inject text node
        ast.instance.content.body = [node]
      }
    }
  }

  // inject module script text node
  if (ast.module && moduleNodes.length) {
    for (const node of moduleNodes) {
      // fix relative num to absolute num
      node.start += ast.module.start
      node.end += ast.module.start
      if (
        // fast path
        moduleNodes.length === 1 ||
        // compare start-end slice to expected, only nodes that are inside the real module script
        // will pass this condition
        originalTemplate.slice(node.start, node.end) === node.data
      ) {
        // @ts-expect-error inject text node
        ast.module.content.body = [node]
      }
    }
  }

  // inject css text node
  if (ast.css && cssNodes.length) {
    for (const node of cssNodes) {
      // fix relative num to absolute num
      node.start += ast.css.start
      node.end += ast.css.start
      if (
        // fast path
        cssNodes.length === 1 ||
        // compare start-end slice to expected, only nodes that are inside the real css style
        // will pass this condition
        originalTemplate.slice(node.start, node.end) === node.data
      ) {
        // @ts-expect-error inject text node
        ast.css.children = [node]
        // also inject the raw styles
        // NOTE: `ast.css.content` has start and end but it's guaranteed to be the same,
        // so no change needed
        ast.css.content.styles = node.raw
      }
    }
  }

  return ast
}
