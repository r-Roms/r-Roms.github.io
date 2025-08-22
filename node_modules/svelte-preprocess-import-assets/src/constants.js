export const IGNORE_FLAG = 'svelte-preprocess-import-assets-ignore'

export const DEFAULT_ASSET_PREFIX = '___ASSET___'

export const ALLOWED_REL = [
  'stylesheet',
  'icon',
  'shortcut icon',
  'mask-icon',
  'apple-touch-icon',
  'apple-touch-icon-precomposed',
  'apple-touch-startup-image',
  'manifest',
  'prefetch',
  'preload',
]

export const ALLOWED_ITEMPROP = [
  'image',
  'logo',
  'screenshot',
  'thumbnailurl',
  'contenturl',
  'downloadurl',
  'duringmedia',
  'embedurl',
  'installurl',
  'layoutimage',
]

export const ALLOWED_META_NAME = [
  'msapplication-tileimage',
  'msapplication-square70x70logo',
  'msapplication-square150x150logo',
  'msapplication-wide310x150logo',
  'msapplication-square310x310logo',
  'msapplication-config',
  'twitter:image',
]

export const ALLOWED_META_PROPERTY = [
  'og:image',
  'og:image:url',
  'og:image:secure_url',
  'og:audio',
  'og:audio:secure_url',
  'og:video',
  'og:video:secure_url',
  'vk:image',
]

/** @type {import('.').AssetSource[]} */
export const DEFAULT_SOURCES = [
  {
    tag: 'audio',
    srcAttributes: ['src'],
  },
  {
    tag: 'embed',
    srcAttributes: ['src'],
  },
  {
    tag: 'img',
    srcAttributes: ['src'],
    srcsetAttributes: ['srcset'],
  },
  {
    tag: 'input',
    srcAttributes: ['src'],
  },
  {
    tag: 'object',
    srcAttributes: ['src'],
  },
  {
    tag: 'source',
    srcAttributes: ['src'],
    srcsetAttributes: ['srcset'],
  },
  {
    tag: 'track',
    srcAttributes: ['src'],
  },
  {
    tag: 'video',
    srcAttributes: ['poster', 'src'],
  },
  {
    tag: 'image',
    srcAttributes: ['href', 'xlink:href'],
  },
  {
    tag: 'use',
    srcAttributes: ['href', 'xlink:href'],
  },
  {
    tag: 'link',
    srcAttributes: ['href'],
    srcsetAttributes: ['imagesrcset'],
    filter({ attribute, attributes }) {
      if (
        attributes.rel &&
        ALLOWED_REL.includes(attributes.rel.trim().toLowerCase())
      ) {
        return true
      }

      if (
        attribute !== 'imagesrcset' &&
        attributes.itemprop &&
        ALLOWED_ITEMPROP.includes(attributes.itemprop.trim().toLowerCase())
      ) {
        return true
      }

      return false
    },
  },
  {
    tag: 'meta',
    srcAttributes: ['content'],
    filter({ attributes }) {
      if (
        attributes.name &&
        ALLOWED_META_NAME.includes(attributes.name.trim().toLowerCase())
      ) {
        return true
      }

      if (
        attributes.property &&
        ALLOWED_META_PROPERTY.includes(attributes.property.trim().toLowerCase())
      ) {
        return true
      }

      if (
        attributes.itemprop &&
        ALLOWED_ITEMPROP.includes(attributes.itemprop.trim().toLowerCase())
      ) {
        return true
      }

      return false
    },
  },
]
