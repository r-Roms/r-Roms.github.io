import { PreprocessorGroup } from 'svelte/types/compiler/preprocess'

export interface ImportAssetsOptions {
  sources?: AssetSource[] | ((defaultSources: AssetSource[]) => AssetSource[])
  importPrefix?: string
  http?: boolean
  urlFilter?: (url: string) => boolean
}

export interface AssetSource {
  tag: string
  srcAttributes?: string[]
  srcsetAttributes?: string[]
  filter?: (metadata: FilterMetadata) => boolean
}

export interface FilterMetadata {
  tag: string
  attribute: string
  value: string
  attributes: Record<string, string>
}

export declare function importAssets(
  options?: ImportAssetsOptions,
): PreprocessorGroup
