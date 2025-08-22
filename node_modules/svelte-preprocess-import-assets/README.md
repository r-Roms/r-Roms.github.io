# svelte-preprocess-import-assets

Import assets directly in the markup. Supports Svelte 3, 4, and 5.

> NOTE: Svelte 5 support is experimental and may break between versions.

**Convert this:**

```svelte
<h1>Look at this image</h1>
<img src="./assets/cool-image.png" alt="cool image" />
```

**Into this:**

```svelte
<script>
  import ___ASSET___0 from './assets/cool-image.png'
</script>

<h1>Look at this image</h1>
<img src={___ASSET___0} alt="cool image" />
```

## Usage

Install with your package manager:

```bash
npm install --save-dev svelte-preprocess-import-assets
```

Include the preprocessor in your bundler's Svelte plugin `preprocess` option:

```js
import { importAssets } from 'svelte-preprocess-import-assets'

svelte({ preprocess: [importAssets()] })

// or in svelte.config.js
export default {
  preprocess: [importAssets()],
  // ... other svelte options
}
```

## API

The `importAssets()` function receives an optional options object for its first parameter. The object may contain these properties:

### sources

- **Type:** `AssetSource[] | ((defaultSources: AssetSource[]) => AssetSource[])`

  ```ts
  interface AssetSource {
    tag: string
    srcAttributes?: string[]
    srcsetAttributes?: string[]
    filter?: (metadata: FilterMetadata) => boolean
  }

  interface FilterMetadata {
    tag: string
    attribute: string
    value: string
    attributes: Record<string, string>
  }
  ```

- **Default:** See `DEFAULT_SOURCES` in [src/constants.js](./src/constants.js)

  These are the sources to look for when scanning for imports. You can provide an entirely different list of sources, or declare a function to access the default sources and augment it. The supported tags and attributes are based on [html-loader](https://github.com/webpack-contrib/html-loader#sources) (except `icon-uri`). Component name as `tag` is also supported.

  ```js
  {
    sources: (defaultSources) => {
      return [
        ...defaultSources,
        // Also scan `data-src` and `data-srcset` of an img tag
        {
          tag: 'img',
          srcAttributes: ['data-src'],
          srcsetAttributes: ['data-srcset'],
        },
      ]
    },
  }
  ```

### importPrefix

- **Type:** `string`
- **Default:** `___ASSET___`

  The string to be prefixed for asset import names, e.g. `___ASSET___0` and `___ASSET___1`.

### http

- **Type:** `boolean`
- **Default:** `false`

  Whether a URL with http/https protocol should be converted to an import.

### urlFilter

- **Type:** `(url: string) => boolean`

  Whether a URL should be converted into an import.

  ```js
  {
    // Include URLs with specific extensions only
    urlFilter: (url) => /\.(png|jpg|gif|webp)$/.test(url),
  }
  ```

## Recipes

### Ignore an element

```svelte
<!-- svelte-preprocess-import-assets-ignore -->
<img src="./assets/cool-image.png" alt="cool image" />
```

## Attributions

- [svelte-assets-preprocessor](https://github.com/pchynoweth/svelte-assets-preprocessor): Initial motivation to reduce dependencies.

## Sponsors

<p align="center">
  <a href="https://bjornlu.com/sponsors.svg">
    <img src="https://bjornlu.com/sponsors.svg" alt="Sponsors" />
  </a>
</p>

## License

MIT
