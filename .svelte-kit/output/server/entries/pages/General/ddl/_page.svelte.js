import "clsx";
import "../../../../chunks/url.js";
import "@sveltejs/kit/internal/server";
import { T as Table, a as Table_header, b as Table_row, c as Table_head, d as Table_body, e as Table_cell } from "../../../../chunks/table-row.js";
function _page($$renderer) {
  $$renderer.push(`<div class="mx-8 mb-8 mt-8 space-y-4 bg-background"><h1 class="scroll-m-20 text-balance text-4xl font-extrabold tracking-tight">Direct Downloads</h1> <p class="leading-7 [&amp;:not(:first-child)]:mt-6">This page provides general resources related to downloading files direct from websites.</p> <h2 class="mt-10 scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0">Sites</h2> <div class="my-6 w-full overflow-y-auto">`);
  Table($$renderer, {
    children: ($$renderer2) => {
      Table_header($$renderer2, {
        children: ($$renderer3) => {
          Table_row($$renderer3, {
            children: ($$renderer4) => {
              Table_head($$renderer4, {
                children: ($$renderer5) => {
                  $$renderer5.push(`<!---->Name`);
                },
                $$slots: { default: true }
              });
              $$renderer4.push(`<!----> `);
              Table_head($$renderer4, {
                children: ($$renderer5) => {
                  $$renderer5.push(`<!---->Notes`);
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
                  $$renderer5.push(`<a href="https://fmhy.net/gaming#rom-sites" class="text-primary font-medium underline underline-offset-4 md:text-base hover:bg-primary hover:text-primary-foreground">FMHY</a>`);
                },
                $$slots: { default: true }
              });
              $$renderer4.push(`<!----> `);
              Table_cell($$renderer4, {
                children: ($$renderer5) => {
                  $$renderer5.push(`<!---->A large collection of sites related to acquiring free media of all types.`);
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
                  $$renderer5.push(`<a href="https://vimm.net" class="text-primary font-medium underline underline-offset-4 md:text-base hover:bg-primary hover:text-primary-foreground">Vimm's Lair</a>`);
                },
                $$slots: { default: true }
              });
              $$renderer4.push(`<!----> `);
              Table_cell($$renderer4, {
                children: ($$renderer5) => {
                  $$renderer5.push(`<!---->Provides files up to the 3DS/PS3. Restricted to one download at a time.`);
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
                  $$renderer5.push(`<a href="https://archive.org" class="text-primary font-medium underline underline-offset-4 md:text-base hover:bg-primary hover:text-primary-foreground">Internet Archive</a>`);
                },
                $$slots: { default: true }
              });
              $$renderer4.push(`<!----> `);
              Table_cell($$renderer4, {
                children: ($$renderer5) => {
                  $$renderer5.push(`<!---->High-risk and traffic content is prevented from being
                        accessed without an account to minimize takedowns and
                        abuse. These items are shown with a lock icon beside
                        the file name in the item's file listing. Accounts
                        are free to create.`);
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
                  $$renderer5.push(`<a href="https://edgeemu.net" class="text-primary font-medium underline underline-offset-4 md:text-base hover:bg-primary hover:text-primary-foreground">Edge Emulation</a>`);
                },
                $$slots: { default: true }
              });
              $$renderer4.push(`<!----> `);
              Table_cell($$renderer4, {});
              $$renderer4.push(`<!---->`);
            },
            $$slots: { default: true }
          });
          $$renderer3.push(`<!----> `);
          Table_row($$renderer3, {
            children: ($$renderer4) => {
              Table_cell($$renderer4, {
                children: ($$renderer5) => {
                  $$renderer5.push(`<a href="https://romheaven.com" class="text-primary font-medium underline underline-offset-4 md:text-base hover:bg-primary hover:text-primary-foreground">RomHeaven</a>`);
                },
                $$slots: { default: true }
              });
              $$renderer4.push(`<!----> `);
              Table_cell($$renderer4, {});
              $$renderer4.push(`<!---->`);
            },
            $$slots: { default: true }
          });
          $$renderer3.push(`<!----> `);
          Table_row($$renderer3, {
            children: ($$renderer4) => {
              Table_cell($$renderer4, {
                children: ($$renderer5) => {
                  $$renderer5.push(`<a href="https://startgame.world" class="text-primary font-medium underline underline-offset-4 md:text-base hover:bg-primary hover:text-primary-foreground">StartGame</a>`);
                },
                $$slots: { default: true }
              });
              $$renderer4.push(`<!----> `);
              Table_cell($$renderer4, {});
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
  $$renderer.push(`<!----></div> <h2 class="mt-10 scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0">Download Managers</h2> <p class="leading-7 [&amp;:not(:first-child)]:mt-6">Download Managers are dedicated downloading programs separate from
        using a browser directly. They offer many potential benefits over
        downloading in a browser, such as faster downloads using multiple
        connections, resumable downloads, link grabbing, bulk downloads,
        artificial speed limits, post-download actions, and more.</p> <div class="my-6 w-full overflow-y-auto">`);
  Table($$renderer, {
    children: ($$renderer2) => {
      Table_header($$renderer2, {
        children: ($$renderer3) => {
          Table_row($$renderer3, {
            children: ($$renderer4) => {
              Table_head($$renderer4, {
                children: ($$renderer5) => {
                  $$renderer5.push(`<!---->Name`);
                },
                $$slots: { default: true }
              });
              $$renderer4.push(`<!----> `);
              Table_head($$renderer4, {
                children: ($$renderer5) => {
                  $$renderer5.push(`<!---->Notes`);
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
                  $$renderer5.push(`<a href="https://abdownloadmanager.com" class="text-primary font-medium underline underline-offset-4 md:text-base hover:bg-primary hover:text-primary-foreground">AB Download Manager</a>`);
                },
                $$slots: { default: true }
              });
              $$renderer4.push(`<!----> `);
              Table_cell($$renderer4, {});
              $$renderer4.push(`<!---->`);
            },
            $$slots: { default: true }
          });
          $$renderer3.push(`<!----> `);
          Table_row($$renderer3, {
            children: ($$renderer4) => {
              Table_cell($$renderer4, {
                children: ($$renderer5) => {
                  $$renderer5.push(`<a href="https://jdownloader.org/jdownloader2" class="text-primary font-medium underline underline-offset-4 md:text-base hover:bg-primary hover:text-primary-foreground">JDownloader2</a>`);
                },
                $$slots: { default: true }
              });
              $$renderer4.push(`<!----> `);
              Table_cell($$renderer4, {});
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
  $$renderer.push(`<!----></div></div>`);
}
export {
  _page as default
};
