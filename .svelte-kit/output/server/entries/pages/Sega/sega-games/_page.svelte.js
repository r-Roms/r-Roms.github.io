import { a as attr } from "../../../../chunks/attributes.js";
import { b as base } from "../../../../chunks/server.js";
import "../../../../chunks/url.js";
import "@sveltejs/kit/internal/server";
import { T as Table, a as Table_header, b as Table_row, c as Table_head, d as Table_body, e as Table_cell } from "../../../../chunks/table-row.js";
function _page($$renderer) {
  $$renderer.push(`<div class="mx-8 mb-8 mt-8 space-y-4 bg-background"><h1 class="scroll-m-20 text-balance text-4xl font-extrabold tracking-tight">SEGA Games</h1> <p class="leading-7 [&amp;:not(:first-child)]:mt-6">Older systems can be found in the <a class="text-primary font-medium underline underline-offset-4 md:text-base hover:bg-primary hover:text-primary-foreground"${attr("href", base + "/Retro & Arcade/retro-games")}>Retro Games page</a>.</p> `);
  Table($$renderer, {
    children: ($$renderer2) => {
      Table_header($$renderer2, {
        children: ($$renderer3) => {
          Table_row($$renderer3, {
            children: ($$renderer4) => {
              Table_head($$renderer4, {
                children: ($$renderer5) => {
                  $$renderer5.push(`<!---->Title`);
                },
                $$slots: { default: true }
              });
              $$renderer4.push(`<!----> `);
              Table_head($$renderer4, {
                children: ($$renderer5) => {
                  $$renderer5.push(`<!---->Minerva (Torrent Based)`);
                },
                $$slots: { default: true }
              });
              $$renderer4.push(`<!----> `);
              Table_head($$renderer4, {
                children: ($$renderer5) => {
                  $$renderer5.push(`<!---->Internet Archive`);
                },
                $$slots: { default: true }
              });
              $$renderer4.push(`<!---->`);
            },
            $$slots: { default: true }
          });
        },
        $$slots: { default: true }
      });
      $$renderer2.push(`<!----> `);
      Table_body($$renderer2, {
        children: ($$renderer3) => {
          Table_row($$renderer3, {
            children: ($$renderer4) => {
              Table_cell($$renderer4, {
                children: ($$renderer5) => {
                  $$renderer5.push(`<!---->Sega - 32X`);
                },
                $$slots: { default: true }
              });
              $$renderer4.push(`<!----> `);
              Table_cell($$renderer4, {
                children: ($$renderer5) => {
                  $$renderer5.push(`<a class="text-primary font-medium underline underline-offset-4 md:text-base hover:bg-primary hover:text-primary-foreground" href="https://minerva-archive.org/browse/No-Intro/Sega%20-%2032X/">Download</a>`);
                },
                $$slots: { default: true }
              });
              $$renderer4.push(`<!----> `);
              Table_cell($$renderer4, {
                children: ($$renderer5) => {
                  $$renderer5.push(`<a class="text-primary font-medium underline underline-offset-4 md:text-base hover:bg-primary hover:text-primary-foreground" href="https://archive.org/download/ni-roms/roms/Sega%20-%2032X.zip/">Download 1</a> / <a class="text-primary font-medium underline underline-offset-4 md:text-base hover:bg-primary hover:text-primary-foreground" href="https://archive.org/download/nointro.32x">Download 2</a>`);
                },
                $$slots: { default: true }
              });
              $$renderer4.push(`<!---->`);
            },
            $$slots: { default: true }
          });
          $$renderer3.push(`<!----> `);
          Table_row($$renderer3, {
            children: ($$renderer4) => {
              Table_cell($$renderer4, {
                children: ($$renderer5) => {
                  $$renderer5.push(`<!---->Sega - Game Gear`);
                },
                $$slots: { default: true }
              });
              $$renderer4.push(`<!----> `);
              Table_cell($$renderer4, {
                children: ($$renderer5) => {
                  $$renderer5.push(`<a class="text-primary font-medium underline underline-offset-4 md:text-base hover:bg-primary hover:text-primary-foreground" href="https://minerva-archive.org/browse/No-Intro/Sega%20-%20Game%20Gear/">Download</a>`);
                },
                $$slots: { default: true }
              });
              $$renderer4.push(`<!----> `);
              Table_cell($$renderer4, {
                children: ($$renderer5) => {
                  $$renderer5.push(`<a class="text-primary font-medium underline underline-offset-4 md:text-base hover:bg-primary hover:text-primary-foreground" href="https://archive.org/download/ni-roms/roms/Sega%20-%20Game%20Gear.zip/">Download 1</a> / <a class="text-primary font-medium underline underline-offset-4 md:text-base hover:bg-primary hover:text-primary-foreground" href="https://archive.org/download/nointro.gg">Download 2</a>`);
                },
                $$slots: { default: true }
              });
              $$renderer4.push(`<!---->`);
            },
            $$slots: { default: true }
          });
          $$renderer3.push(`<!----> `);
          Table_row($$renderer3, {
            children: ($$renderer4) => {
              Table_cell($$renderer4, {
                children: ($$renderer5) => {
                  $$renderer5.push(`<!---->Sega - Master System - Mark III`);
                },
                $$slots: { default: true }
              });
              $$renderer4.push(`<!----> `);
              Table_cell($$renderer4, {
                children: ($$renderer5) => {
                  $$renderer5.push(`<a class="text-primary font-medium underline underline-offset-4 md:text-base hover:bg-primary hover:text-primary-foreground" href="https://minerva-archive.org/browse/No-Intro/Sega%20-%20Master%20System%20-%20Mark%20III/">Download</a>`);
                },
                $$slots: { default: true }
              });
              $$renderer4.push(`<!----> `);
              Table_cell($$renderer4, {
                children: ($$renderer5) => {
                  $$renderer5.push(`<a class="text-primary font-medium underline underline-offset-4 md:text-base hover:bg-primary hover:text-primary-foreground" href="https://archive.org/download/ni-roms/roms/Sega%20-%20Master%20System%20-%20Mark%20III.zip/">Download 1</a> / <a class="text-primary font-medium underline underline-offset-4 md:text-base hover:bg-primary hover:text-primary-foreground" href="https://archive.org/download/nointro.ms-mkiii">Download 2</a>`);
                },
                $$slots: { default: true }
              });
              $$renderer4.push(`<!---->`);
            },
            $$slots: { default: true }
          });
          $$renderer3.push(`<!----> `);
          Table_row($$renderer3, {
            children: ($$renderer4) => {
              Table_cell($$renderer4, {
                children: ($$renderer5) => {
                  $$renderer5.push(`<!---->Sega - Mega Drive - Genesis`);
                },
                $$slots: { default: true }
              });
              $$renderer4.push(`<!----> `);
              Table_cell($$renderer4, {
                children: ($$renderer5) => {
                  $$renderer5.push(`<a class="text-primary font-medium underline underline-offset-4 md:text-base hover:bg-primary hover:text-primary-foreground" href="https://minerva-archive.org/browse/No-Intro/Sega%20-%20Mega%20Drive%20-%20Genesis/">Download</a>`);
                },
                $$slots: { default: true }
              });
              $$renderer4.push(`<!----> `);
              Table_cell($$renderer4, {
                children: ($$renderer5) => {
                  $$renderer5.push(`<a class="text-primary font-medium underline underline-offset-4 md:text-base hover:bg-primary hover:text-primary-foreground" href="https://archive.org/download/ni-roms/roms/Sega%20-%20Mega%20Drive%20-%20Genesis.zip/">Download 1</a> / <a class="text-primary font-medium underline underline-offset-4 md:text-base hover:bg-primary hover:text-primary-foreground" href="https://archive.org/download/nointro.md">Download 2</a>`);
                },
                $$slots: { default: true }
              });
              $$renderer4.push(`<!---->`);
            },
            $$slots: { default: true }
          });
          $$renderer3.push(`<!---->`);
        },
        $$slots: { default: true }
      });
      $$renderer2.push(`<!---->`);
    },
    $$slots: { default: true }
  });
  $$renderer.push(`<!----></div>`);
}
export {
  _page as default
};
