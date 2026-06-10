<script lang="ts">
  import type { LinkSystem } from "$lib/types.js";

  let { systems = [] }: { systems: LinkSystem[] } = $props();

  let viewMode = $state<"grid" | "list">("grid");

  $effect(() => {
    const mq = window.matchMedia("(max-width: 640px)");
    viewMode = mq.matches ? "list" : "grid";
    const handler = (e: MediaQueryListEvent) => {
      viewMode = e.matches ? "list" : "grid";
    };
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  });
  let query = $state("");

  let filtered = $derived(
    (query.trim()
      ? systems.filter((s) =>
          s.name.toLowerCase().includes(query.toLowerCase().trim())
        )
      : systems
    ).sort((a, b) => a.name.localeCompare(b.name))
  );
</script>

<div class="browser">
  <div class="toolbar">
    <div class="search-wrap">
      <svg class="search-icon" viewBox="0 0 16 16" fill="none" aria-hidden="true">
        <circle cx="6.5" cy="6.5" r="4" stroke="currentColor" stroke-width="1.5" />
        <path d="M10 10l3 3" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
      </svg>
      <input
        type="search"
        placeholder="Search…"
        bind:value={query}
        aria-label="Search systems"
      />
      {#if query}
        <button class="clear" onclick={() => (query = "")} aria-label="Clear search">
          <svg viewBox="0 0 16 16" fill="none" aria-hidden="true">
            <path d="M4 4l8 8M12 4l-8 8" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
          </svg>
        </button>
      {/if}
    </div>
    <div class="toggle" role="group" aria-label="View mode">
      <button
        class:active={viewMode === "grid"}
        onclick={() => (viewMode = "grid")}
        aria-pressed={viewMode === "grid"}
        title="Grid view"
      >
        <svg viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
          <rect x="1" y="1" width="6" height="6" rx="1" />
          <rect x="9" y="1" width="6" height="6" rx="1" />
          <rect x="1" y="9" width="6" height="6" rx="1" />
          <rect x="9" y="9" width="6" height="6" rx="1" />
        </svg>
      </button>
      <button
        class:active={viewMode === "list"}
        onclick={() => (viewMode = "list")}
        aria-pressed={viewMode === "list"}
        title="List view"
      >
        <svg viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
          <rect x="1" y="2" width="14" height="2.5" rx="1" />
          <rect x="1" y="6.75" width="14" height="2.5" rx="1" />
          <rect x="1" y="11.5" width="14" height="2.5" rx="1" />
        </svg>
      </button>
    </div>
  </div>

  {#if viewMode === "grid"}
    <ul class="grid" role="list">
      {#each filtered as system}
        <li>
          <a href={system.url} class="card">
            <div class="img-wrap">
              <img src={system.image} alt={system.name} loading="lazy" />
            </div>
            <span class="name">{system.name}</span>
          </a>
        </li>
      {/each}
      {#if filtered.length === 0}
        <li class="empty">No systems match "{query}"</li>
      {/if}
    </ul>
  {:else}
    <ul class="list" role="list">
      {#each filtered as system}
        <li>
          <a href={system.url} class="row">
            <img src={system.image} alt="" class="thumb" loading="lazy" />
            <span>{system.name}</span>
          </a>
        </li>
      {/each}
      {#if filtered.length === 0}
        <li class="empty">No systems match "{query}"</li>
      {/if}
    </ul>
  {/if}
</div>

<style>
  .browser {
    font-family: var(--font-sans);
    color: var(--foreground);
    background: var(--background);
    padding: 1.25rem;
    border-radius: var(--radius);
  }

  /* ── Toolbar ── */
  .toolbar {
    display: flex;
    align-items: center;
    gap: 0.6rem;
    margin-bottom: 1.25rem;
    flex-wrap: wrap;
  }

  /* ── Search ── */
  .search-wrap {
    flex: 1;
    min-width: 120px;
    position: relative;
    display: flex;
    align-items: center;
  }

  .search-icon {
    position: absolute;
    left: 0.55rem;
    width: 13px;
    height: 13px;
    color: var(--muted-foreground);
    pointer-events: none;
    flex-shrink: 0;
  }

  .search-wrap input {
    width: 100%;
    background: var(--card);
    border: 1px solid var(--input);
    border-radius: calc(var(--radius) - 2px);
    color: var(--foreground);
    font-family: var(--font-sans);
    font-size: 0.8rem;
    padding: 0.35rem 2rem 0.35rem 1.8rem;
    outline: none;
    transition: border-color 0.15s;
  }

  .search-wrap input::placeholder {
    color: var(--muted-foreground);
  }

  .search-wrap input:focus {
    border-color: var(--ring);
  }

  /* hide browser's native clear button */
  .search-wrap input::-webkit-search-cancel-button {
    display: none;
  }

  .clear {
    position: absolute;
    right: 0.4rem;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 18px;
    height: 18px;
    background: transparent;
    border: none;
    color: var(--muted-foreground);
    cursor: pointer;
    padding: 0;
    transition: color 0.15s;
  }

  .clear svg {
    width: 10px;
    height: 10px;
  }
  .clear:hover {
    color: var(--foreground);
  }

  /* ── Empty state ── */
  .empty {
    grid-column: 1 / -1;
    padding: 2rem 1rem;
    text-align: center;
    color: var(--muted-foreground);
    font-size: 0.8rem;
  }

  .toggle {
    display: flex;
    gap: 2px;
    background: var(--card);
    border: 1px solid var(--border);
    border-radius: calc(var(--radius) - 2px);
    padding: 3px;
  }

  .toggle button {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 30px;
    height: 26px;
    background: transparent;
    border: none;
    border-radius: 4px;
    color: var(--muted-foreground);
    cursor: pointer;
    transition: color 0.15s, background 0.15s;
  }

  .toggle button svg {
    width: 14px;
    height: 14px;
  }

  .toggle button:hover {
    color: var(--foreground);
  }

  .toggle button.active {
    background: var(--primary);
    color: var(--primary-foreground);
  }

  /* ── Shared reset ── */
  ul {
    list-style: none;
    margin: 0;
    padding: 0;
  }

  /* ── Grid ── */
  .grid {
    display: grid;
    gap: .5rem;
    grid-template-columns: repeat(auto-fill, minmax(min(140px, 100%), 1fr));
  }

  .card {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 0 0 .75rem 0;
    background: var(--card);
    border: 1px solid var(--border);
    border-radius: calc(var(--radius) - 2px);
    text-decoration: none;
    color: var(--foreground);
    transition: border-color 0.15s, transform 0.15s;
    height: 100%;
  }

  .card:hover {
    border-color: var(--primary);
    background: color-mix(in srgb, var(--primary) 8%, var(--card));
    transform: translateY(-2px);
  }

  .img-wrap {
    width: 100%;
    overflow: hidden;
    border-radius: var(--radius) var(--radius) 0 0;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .img-wrap img {
    width: 100%;
    height: 100%;
    object-fit: contain;
    transition: transform 0.2s;
  }

  .card:hover .img-wrap img {
    transform: scale(1.1);
  }

  .name {
    font-size: .8rem;
    text-align: center;
    color: var(--muted-foreground);
    transition: color 0.15s;
    min-height: 2.4rem;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .card:hover .name {
    color: var(--primary);
  }

  /* ── List ── */
  .list {
    display: flex;
    flex-direction: column;
    gap: .5rem;
  }

  .row {
    display: flex;
    align-items: stretch;
    gap: 1rem;
    padding: 0 1rem 0 0;
    background: var(--card);
    border: 1px solid var(--border);
    border-radius: calc(var(--radius) - 2px);
    text-decoration: none;
    color: var(--foreground);
    font-size: 1rem;
    min-height: 48px;
    transition: border-color 0.15s, background 0.15s;
  }

  .row:hover {
    border-color: var(--primary);
    background: color-mix(in srgb, var(--primary) 8%, var(--card));
    transform: translateY(-2px);
  }

  .thumb {
    width: 64px;
    height: auto;
    align-self: stretch;
    object-fit: contain;
    border-radius: calc(var(--radius) - 2px) 0 0 calc(var(--radius) - 2px);
    flex-shrink: 0;
    padding-left: 0.5rem;
  }

  .row:hover .thumb {
    transform: scale(1.1);
  }

  .row span {
    flex: 1;
    display: flex;
    align-items: center;
    padding-left: 0.5rem;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
</style>
