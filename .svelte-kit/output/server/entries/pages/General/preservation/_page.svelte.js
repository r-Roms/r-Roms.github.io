import "clsx";
import { T as Table, a as Table_header, b as Table_row, c as Table_head, d as Table_body, e as Table_cell } from "../../../../chunks/table-row.js";
function _page($$payload) {
  $$payload.out.push(`<div class="mx-8 mb-8 mt-8 space-y-4 bg-background"><h1 class="scroll-m-20 text-balance text-4xl font-extrabold tracking-tight">Preservation Databases</h1> <p class="leading-7 [&amp;:not(:first-child)]:mt-6">Many online groups serve to aggregate accurate information related to
        Video Games, ROM files, BIOS files, media, and more. This is done to
        ensure users can verify files for emulation and provide various types
        of metadata and media for presentation.</p> <div class="my-6 w-full overflow-y-auto">`);
  Table($$payload, {
    children: ($$payload2) => {
      Table_header($$payload2, {
        children: ($$payload3) => {
          Table_row($$payload3, {
            children: ($$payload4) => {
              Table_head($$payload4, {
                children: ($$payload5) => {
                  $$payload5.out.push(`<!---->Database`);
                },
                $$slots: { default: true }
              });
              $$payload4.out.push(`<!----> `);
              Table_head($$payload4, {
                children: ($$payload5) => {
                  $$payload5.out.push(`<!---->Purpose`);
                },
                $$slots: { default: true }
              });
              $$payload4.out.push(`<!---->`);
            },
            $$slots: { default: true }
          });
        },
        $$slots: { default: true }
      });
      $$payload2.out.push(`<!----> `);
      Table_body($$payload2, {
        children: ($$payload3) => {
          Table_row($$payload3, {
            children: ($$payload4) => {
              Table_cell($$payload4, {
                children: ($$payload5) => {
                  $$payload5.out.push(`<a href="https://no-intro.org" class="text-primary font-medium underline underline-offset-4 md:text-base hover:bg-primary hover:text-primary-foreground">No-Intro</a>`);
                },
                $$slots: { default: true }
              });
              $$payload4.out.push(`<!----> `);
              Table_cell($$payload4, {
                children: ($$payload5) => {
                  $$payload5.out.push(`<!---->Catalogs accurate file hashes for flash media`);
                },
                $$slots: { default: true }
              });
              $$payload4.out.push(`<!---->`);
            },
            $$slots: { default: true }
          });
          $$payload3.out.push(`<!----> `);
          Table_row($$payload3, {
            children: ($$payload4) => {
              Table_cell($$payload4, {
                children: ($$payload5) => {
                  $$payload5.out.push(`<a href="http://redump.org" class="text-primary font-medium underline underline-offset-4 md:text-base hover:bg-primary hover:text-primary-foreground">Redump</a>`);
                },
                $$slots: { default: true }
              });
              $$payload4.out.push(`<!----> `);
              Table_cell($$payload4, {
                children: ($$payload5) => {
                  $$payload5.out.push(`<!---->Catalogs accurate file hashes for optical media`);
                },
                $$slots: { default: true }
              });
              $$payload4.out.push(`<!---->`);
            },
            $$slots: { default: true }
          });
          $$payload3.out.push(`<!----> `);
          Table_row($$payload3, {
            children: ($$payload4) => {
              Table_cell($$payload4, {
                children: ($$payload5) => {
                  $$payload5.out.push(`<a href="https://www.tosecdev.org" class="text-primary font-medium underline underline-offset-4 md:text-base hover:bg-primary hover:text-primary-foreground">TOSEC</a>`);
                },
                $$slots: { default: true }
              });
              $$payload4.out.push(`<!----> `);
              Table_cell($$payload4, {
                children: ($$payload5) => {
                  $$payload5.out.push(`<!---->Catalogs accurate file hashes for flash media (TOSEC)
                        , optical media (TOSEC-ISO)
                        , and auxiliary resources (TOSEC-PIX)`);
                },
                $$slots: { default: true }
              });
              $$payload4.out.push(`<!---->`);
            },
            $$slots: { default: true }
          });
          $$payload3.out.push(`<!----> `);
          Table_row($$payload3, {
            children: ($$payload4) => {
              Table_cell($$payload4, {
                children: ($$payload5) => {
                  $$payload5.out.push(`<a href="https://hasheous.org" class="text-primary font-medium underline underline-offset-4 md:text-base hover:bg-primary hover:text-primary-foreground">Hasheous</a>`);
                },
                $$slots: { default: true }
              });
              $$payload4.out.push(`<!----> `);
              Table_cell($$payload4, {
                children: ($$payload5) => {
                  $$payload5.out.push(`<!---->Catalogs ROM hashes and matches those hashes with metadata providers`);
                },
                $$slots: { default: true }
              });
              $$payload4.out.push(`<!---->`);
            },
            $$slots: { default: true }
          });
          $$payload3.out.push(`<!----> `);
          Table_row($$payload3, {
            children: ($$payload4) => {
              Table_cell($$payload4, {
                children: ($$payload5) => {
                  $$payload5.out.push(`<a href="https://www.igdb.com" class="text-primary font-medium underline underline-offset-4 md:text-base hover:bg-primary hover:text-primary-foreground">IGDB</a>`);
                },
                $$slots: { default: true }
              });
              $$payload4.out.push(`<!----> `);
              Table_cell($$payload4, {
                children: ($$payload5) => {
                  $$payload5.out.push(`<!---->Metadata and media for games`);
                },
                $$slots: { default: true }
              });
              $$payload4.out.push(`<!---->`);
            },
            $$slots: { default: true }
          });
          $$payload3.out.push(`<!----> `);
          Table_row($$payload3, {
            children: ($$payload4) => {
              Table_cell($$payload4, {
                children: ($$payload5) => {
                  $$payload5.out.push(`<a href="https://www.screenscraper.fr" class="text-primary font-medium underline underline-offset-4 md:text-base hover:bg-primary hover:text-primary-foreground">Screenscraper</a>`);
                },
                $$slots: { default: true }
              });
              $$payload4.out.push(`<!----> `);
              Table_cell($$payload4, {
                children: ($$payload5) => {
                  $$payload5.out.push(`<!---->Visual (Image &amp; Video) media`);
                },
                $$slots: { default: true }
              });
              $$payload4.out.push(`<!---->`);
            },
            $$slots: { default: true }
          });
          $$payload3.out.push(`<!----> `);
          Table_row($$payload3, {
            children: ($$payload4) => {
              Table_cell($$payload4, {
                children: ($$payload5) => {
                  $$payload5.out.push(`<a href="https://retroachievements.org" class="text-primary font-medium underline underline-offset-4 md:text-base hover:bg-primary hover:text-primary-foreground">RetroAchievements</a>`);
                },
                $$slots: { default: true }
              });
              $$payload4.out.push(`<!----> `);
              Table_cell($$payload4, {
                children: ($$payload5) => {
                  $$payload5.out.push(`<!---->Retro game achievements`);
                },
                $$slots: { default: true }
              });
              $$payload4.out.push(`<!---->`);
            },
            $$slots: { default: true }
          });
          $$payload3.out.push(`<!----> `);
          Table_row($$payload3, {
            children: ($$payload4) => {
              Table_cell($$payload4, {
                children: ($$payload5) => {
                  $$payload5.out.push(`<a href="https://www.steamgriddb.com" class="text-primary font-medium underline underline-offset-4 md:text-base hover:bg-primary hover:text-primary-foreground">SteamGridDB</a>`);
                },
                $$slots: { default: true }
              });
              $$payload4.out.push(`<!----> `);
              Table_cell($$payload4, {
                children: ($$payload5) => {
                  $$payload5.out.push(`<!---->Images for front-end presentation`);
                },
                $$slots: { default: true }
              });
              $$payload4.out.push(`<!---->`);
            },
            $$slots: { default: true }
          });
          $$payload3.out.push(`<!----> `);
          Table_row($$payload3, {
            children: ($$payload4) => {
              Table_cell($$payload4, {
                children: ($$payload5) => {
                  $$payload5.out.push(`<a href="https://howlongtobeat.com" class="text-primary font-medium underline underline-offset-4 md:text-base hover:bg-primary hover:text-primary-foreground">HowLongToBeat</a>`);
                },
                $$slots: { default: true }
              });
              $$payload4.out.push(`<!----> `);
              Table_cell($$payload4, {
                children: ($$payload5) => {
                  $$payload5.out.push(`<!---->Game &amp; playtime tracking`);
                },
                $$slots: { default: true }
              });
              $$payload4.out.push(`<!---->`);
            },
            $$slots: { default: true }
          });
          $$payload3.out.push(`<!---->`);
        },
        $$slots: { default: true }
      });
      $$payload2.out.push(`<!---->`);
    },
    $$slots: { default: true }
  });
  $$payload.out.push(`<!----></div></div>`);
}
export {
  _page as default
};
