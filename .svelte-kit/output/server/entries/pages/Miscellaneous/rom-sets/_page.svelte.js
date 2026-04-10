import "clsx";
import { T as Table, a as Table_header, b as Table_row, c as Table_head, d as Table_body, e as Table_cell } from "../../../../chunks/table-row.js";
function _page($$payload) {
  $$payload.out.push(`<div class="mx-8 mb-8 mt-8 space-y-4 bg-background"><h1 class="scroll-m-20 text-balance text-4xl font-extrabold tracking-tight">ROM Sets</h1> <p class="leading-7 [&amp;:not(:first-child)]:mt-6">ROM sets are large, sorted, verified collections of ROMs, typically
        provided as a single archive file that you will need to extract prior
        to use. The ROM sets here are provided in no particular order.</p> <div class="my-6 w-full overflow-y-auto">`);
  Table($$payload, {
    children: ($$payload2) => {
      Table_header($$payload2, {
        children: ($$payload3) => {
          Table_row($$payload3, {
            children: ($$payload4) => {
              Table_head($$payload4, {
                children: ($$payload5) => {
                  $$payload5.out.push(`<!---->Title`);
                },
                $$slots: { default: true }
              });
              $$payload4.out.push(`<!----> `);
              Table_head($$payload4, {
                children: ($$payload5) => {
                  $$payload5.out.push(`<!---->Links`);
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
                  $$payload5.out.push(`<!---->No-Intro - ROM Sets`);
                },
                $$slots: { default: true }
              });
              $$payload4.out.push(`<!----> `);
              Table_cell($$payload4, {
                children: ($$payload5) => {
                  $$payload5.out.push(`<a class="text-primary font-medium underline underline-offset-4 md:text-base hover:bg-primary hover:text-primary-foreground" href="https://archive.org/download/ni-roms/roms/">Internet Archive</a>`);
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
                  $$payload5.out.push(`<!---->The Unofficial Redump Hoard`);
                },
                $$slots: { default: true }
              });
              $$payload4.out.push(`<!----> `);
              Table_cell($$payload4, {
                children: ($$payload5) => {
                  $$payload5.out.push(`<a class="text-primary font-medium underline underline-offset-4 md:text-base hover:bg-primary hover:text-primary-foreground" href="https://archive.org/details/redump">Internet Archive</a>`);
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
                  $$payload5.out.push(`<!---->CVLT OF MIRRORS`);
                },
                $$slots: { default: true }
              });
              $$payload4.out.push(`<!----> `);
              Table_cell($$payload4, {
                children: ($$payload5) => {
                  $$payload5.out.push(`<a class="text-primary font-medium underline underline-offset-4 md:text-base hover:bg-primary hover:text-primary-foreground" href="https://archive.org/details/@cvlt_of_mirrors">Internet Archive</a>`);
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
                  $$payload5.out.push(`<!---->TOSEC`);
                },
                $$slots: { default: true }
              });
              $$payload4.out.push(`<!----> `);
              Table_cell($$payload4, {
                children: ($$payload5) => {
                  $$payload5.out.push(`<a class="text-primary font-medium underline underline-offset-4 md:text-base hover:bg-primary hover:text-primary-foreground" href="https://archive.org/download/tosec-main">Internet Archive</a>`);
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
                  $$payload5.out.push(`<!---->[TOSEC-ISO] 3DO`);
                },
                $$slots: { default: true }
              });
              $$payload4.out.push(`<!----> `);
              Table_cell($$payload4, {
                children: ($$payload5) => {
                  $$payload5.out.push(`<a class="text-primary font-medium underline underline-offset-4 md:text-base hover:bg-primary hover:text-primary-foreground" href="https://archive.org/download/tosec-iso-3do">Internet Archive</a>`);
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
                  $$payload5.out.push(`<!---->[TOSEC-ISO] Acorn`);
                },
                $$slots: { default: true }
              });
              $$payload4.out.push(`<!----> `);
              Table_cell($$payload4, {
                children: ($$payload5) => {
                  $$payload5.out.push(`<a class="text-primary font-medium underline underline-offset-4 md:text-base hover:bg-primary hover:text-primary-foreground" href="https://archive.org/download/tosec-iso-acorn">Internet Archive</a>`);
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
                  $$payload5.out.push(`<!---->[TOSEC-ISO] American Laser Games`);
                },
                $$slots: { default: true }
              });
              $$payload4.out.push(`<!----> `);
              Table_cell($$payload4, {
                children: ($$payload5) => {
                  $$payload5.out.push(`<a class="text-primary font-medium underline underline-offset-4 md:text-base hover:bg-primary hover:text-primary-foreground" href="https://archive.org/download/tosec-iso-american-laser-games">Internet Archive</a>`);
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
                  $$payload5.out.push(`<!---->[TOSEC-ISO] Apple`);
                },
                $$slots: { default: true }
              });
              $$payload4.out.push(`<!----> `);
              Table_cell($$payload4, {
                children: ($$payload5) => {
                  $$payload5.out.push(`<a class="text-primary font-medium underline underline-offset-4 md:text-base hover:bg-primary hover:text-primary-foreground" href="https://archive.org/download/tosec-iso-apple">Internet Archive</a>`);
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
                  $$payload5.out.push(`<!---->[TOSEC-ISO] Atari`);
                },
                $$slots: { default: true }
              });
              $$payload4.out.push(`<!----> `);
              Table_cell($$payload4, {
                children: ($$payload5) => {
                  $$payload5.out.push(`<a class="text-primary font-medium underline underline-offset-4 md:text-base hover:bg-primary hover:text-primary-foreground" href="https://archive.org/download/tosec-iso-atari">Internet Archive</a>`);
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
                  $$payload5.out.push(`<!---->[TOSEC-ISO] Bandai`);
                },
                $$slots: { default: true }
              });
              $$payload4.out.push(`<!----> `);
              Table_cell($$payload4, {
                children: ($$payload5) => {
                  $$payload5.out.push(`<a class="text-primary font-medium underline underline-offset-4 md:text-base hover:bg-primary hover:text-primary-foreground" href="https://archive.org/download/tosec-iso-bandai">Internet Archive</a>`);
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
                  $$payload5.out.push(`<!---->[TOSEC-ISO] Capcom`);
                },
                $$slots: { default: true }
              });
              $$payload4.out.push(`<!----> `);
              Table_cell($$payload4, {
                children: ($$payload5) => {
                  $$payload5.out.push(`<a class="text-primary font-medium underline underline-offset-4 md:text-base hover:bg-primary hover:text-primary-foreground" href="https://archive.org/download/tosec-iso-capcom">Internet Archive</a>`);
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
                  $$payload5.out.push(`<!---->[TOSEC-ISO] Commodore`);
                },
                $$slots: { default: true }
              });
              $$payload4.out.push(`<!----> `);
              Table_cell($$payload4, {
                children: ($$payload5) => {
                  $$payload5.out.push(`<a class="text-primary font-medium underline underline-offset-4 md:text-base hover:bg-primary hover:text-primary-foreground" href="https://archive.org/download/tosec-iso-commodore">Internet Archive</a>`);
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
                  $$payload5.out.push(`<!---->[TOSEC-ISO] Fujitsu`);
                },
                $$slots: { default: true }
              });
              $$payload4.out.push(`<!----> `);
              Table_cell($$payload4, {
                children: ($$payload5) => {
                  $$payload5.out.push(`<a class="text-primary font-medium underline underline-offset-4 md:text-base hover:bg-primary hover:text-primary-foreground" href="https://archive.org/download/tosec-iso-fujitsu">Internet Archive</a>`);
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
                  $$payload5.out.push(`<!---->[TOSEC-ISO] IBM`);
                },
                $$slots: { default: true }
              });
              $$payload4.out.push(`<!----> `);
              Table_cell($$payload4, {
                children: ($$payload5) => {
                  $$payload5.out.push(`<a class="text-primary font-medium underline underline-offset-4 md:text-base hover:bg-primary hover:text-primary-foreground" href="https://archive.org/download/tosec-iso-ibm">Internet Archive</a>`);
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
                  $$payload5.out.push(`<!---->[TOSEC-ISO] Incredible Technologies`);
                },
                $$slots: { default: true }
              });
              $$payload4.out.push(`<!----> `);
              Table_cell($$payload4, {
                children: ($$payload5) => {
                  $$payload5.out.push(`<a class="text-primary font-medium underline underline-offset-4 md:text-base hover:bg-primary hover:text-primary-foreground" href="https://archive.org/download/tosec-iso-incredible-technologies">Internet Archive</a>`);
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
                  $$payload5.out.push(`<!---->[TOSEC-ISO] Konami`);
                },
                $$slots: { default: true }
              });
              $$payload4.out.push(`<!----> `);
              Table_cell($$payload4, {
                children: ($$payload5) => {
                  $$payload5.out.push(`<a class="text-primary font-medium underline underline-offset-4 md:text-base hover:bg-primary hover:text-primary-foreground" href="https://archive.org/download/tosec-iso-konami">Internet Archive</a>`);
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
                  $$payload5.out.push(`<!---->[TOSEC-ISO] Mattel`);
                },
                $$slots: { default: true }
              });
              $$payload4.out.push(`<!----> `);
              Table_cell($$payload4, {
                children: ($$payload5) => {
                  $$payload5.out.push(`<a class="text-primary font-medium underline underline-offset-4 md:text-base hover:bg-primary hover:text-primary-foreground" href="https://archive.org/download/tosec-iso-mattel">Internet Archive</a>`);
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
                  $$payload5.out.push(`<!---->[TOSEC-ISO] Memorex`);
                },
                $$slots: { default: true }
              });
              $$payload4.out.push(`<!----> `);
              Table_cell($$payload4, {
                children: ($$payload5) => {
                  $$payload5.out.push(`<a class="text-primary font-medium underline underline-offset-4 md:text-base hover:bg-primary hover:text-primary-foreground" href="https://archive.org/download/tosec-iso-memorex">Internet Archive</a>`);
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
                  $$payload5.out.push(`<!---->[TOSEC-ISO] Microsoft`);
                },
                $$slots: { default: true }
              });
              $$payload4.out.push(`<!----> `);
              Table_cell($$payload4, {
                children: ($$payload5) => {
                  $$payload5.out.push(`<a class="text-primary font-medium underline underline-offset-4 md:text-base hover:bg-primary hover:text-primary-foreground" href="https://archive.org/download/tosec-iso-microsoft">Internet Archive</a>`);
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
                  $$payload5.out.push(`<!---->[TOSEC-ISO] Multi-format`);
                },
                $$slots: { default: true }
              });
              $$payload4.out.push(`<!----> `);
              Table_cell($$payload4, {
                children: ($$payload5) => {
                  $$payload5.out.push(`<a class="text-primary font-medium underline underline-offset-4 md:text-base hover:bg-primary hover:text-primary-foreground" href="https://archive.org/download/tosec-iso-multi-format">Internet Archive</a>`);
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
                  $$payload5.out.push(`<!---->[TOSEC-ISO] Namco-Sega-Nintendo`);
                },
                $$slots: { default: true }
              });
              $$payload4.out.push(`<!----> `);
              Table_cell($$payload4, {
                children: ($$payload5) => {
                  $$payload5.out.push(`<a class="text-primary font-medium underline underline-offset-4 md:text-base hover:bg-primary hover:text-primary-foreground" href="https://archive.org/download/tosec-iso-namco-sega-nintendo">Internet Archive</a>`);
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
                  $$payload5.out.push(`<!---->[TOSEC-ISO] NEC`);
                },
                $$slots: { default: true }
              });
              $$payload4.out.push(`<!----> `);
              Table_cell($$payload4, {
                children: ($$payload5) => {
                  $$payload5.out.push(`<a class="text-primary font-medium underline underline-offset-4 md:text-base hover:bg-primary hover:text-primary-foreground" href="https://archive.org/download/tosec-iso-nec">Internet Archive</a>`);
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
                  $$payload5.out.push(`<!---->[TOSEC-ISO] Nintendo`);
                },
                $$slots: { default: true }
              });
              $$payload4.out.push(`<!----> `);
              Table_cell($$payload4, {
                children: ($$payload5) => {
                  $$payload5.out.push(`<a class="text-primary font-medium underline underline-offset-4 md:text-base hover:bg-primary hover:text-primary-foreground" href="https://archive.org/download/tosec-iso-nintendo_">Internet Archive</a>`);
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
                  $$payload5.out.push(`<!---->[TOSEC-ISO] Philips`);
                },
                $$slots: { default: true }
              });
              $$payload4.out.push(`<!----> `);
              Table_cell($$payload4, {
                children: ($$payload5) => {
                  $$payload5.out.push(`<a class="text-primary font-medium underline underline-offset-4 md:text-base hover:bg-primary hover:text-primary-foreground" href="https://archive.org/download/tosec-iso-philips">Internet Archive</a>`);
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
                  $$payload5.out.push(`<!---->[TOSEC-ISO] Sega Part 1`);
                },
                $$slots: { default: true }
              });
              $$payload4.out.push(`<!----> `);
              Table_cell($$payload4, {
                children: ($$payload5) => {
                  $$payload5.out.push(`<a class="text-primary font-medium underline underline-offset-4 md:text-base hover:bg-primary hover:text-primary-foreground" href="https://archive.org/download/tosec-iso-sega">Internet Archive</a>`);
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
                  $$payload5.out.push(`<!---->[TOSEC-ISO] Sega Part 2`);
                },
                $$slots: { default: true }
              });
              $$payload4.out.push(`<!----> `);
              Table_cell($$payload4, {
                children: ($$payload5) => {
                  $$payload5.out.push(`<a class="text-primary font-medium underline underline-offset-4 md:text-base hover:bg-primary hover:text-primary-foreground" href="https://archive.org/download/tosec-iso-sega-part2">Internet Archive</a>`);
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
                  $$payload5.out.push(`<!---->[TOSEC-ISO] Sinclair`);
                },
                $$slots: { default: true }
              });
              $$payload4.out.push(`<!----> `);
              Table_cell($$payload4, {
                children: ($$payload5) => {
                  $$payload5.out.push(`<a class="text-primary font-medium underline underline-offset-4 md:text-base hover:bg-primary hover:text-primary-foreground" href="https://archive.org/download/tosec-iso-sinclair">Internet Archive</a>`);
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
                  $$payload5.out.push(`<!---->[TOSEC-ISO] SNK`);
                },
                $$slots: { default: true }
              });
              $$payload4.out.push(`<!----> `);
              Table_cell($$payload4, {
                children: ($$payload5) => {
                  $$payload5.out.push(`<a class="text-primary font-medium underline underline-offset-4 md:text-base hover:bg-primary hover:text-primary-foreground" href="https://archive.org/download/tosec-iso-snk">Internet Archive</a>`);
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
                  $$payload5.out.push(`<!---->[TOSEC-ISO] Sony`);
                },
                $$slots: { default: true }
              });
              $$payload4.out.push(`<!----> `);
              Table_cell($$payload4, {
                children: ($$payload5) => {
                  $$payload5.out.push(`<a class="text-primary font-medium underline underline-offset-4 md:text-base hover:bg-primary hover:text-primary-foreground" href="https://archive.org/download/tosec-iso-sony">Internet Archive</a>`);
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
                  $$payload5.out.push(`<!---->[TOSEC-ISO] Tomy`);
                },
                $$slots: { default: true }
              });
              $$payload4.out.push(`<!----> `);
              Table_cell($$payload4, {
                children: ($$payload5) => {
                  $$payload5.out.push(`<a class="text-primary font-medium underline underline-offset-4 md:text-base hover:bg-primary hover:text-primary-foreground" href="https://archive.org/download/tosec-iso-tomy">Internet Archive</a>`);
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
                  $$payload5.out.push(`<!---->[TOSEC-ISO] VM Labs`);
                },
                $$slots: { default: true }
              });
              $$payload4.out.push(`<!----> `);
              Table_cell($$payload4, {
                children: ($$payload5) => {
                  $$payload5.out.push(`<a class="text-primary font-medium underline underline-offset-4 md:text-base hover:bg-primary hover:text-primary-foreground" href="https://archive.org/download/tosec-iso-vm-labs">Internet Archive</a>`);
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
                  $$payload5.out.push(`<!---->[TOSEC-ISO] VTech`);
                },
                $$slots: { default: true }
              });
              $$payload4.out.push(`<!----> `);
              Table_cell($$payload4, {
                children: ($$payload5) => {
                  $$payload5.out.push(`<a class="text-primary font-medium underline underline-offset-4 md:text-base hover:bg-primary hover:text-primary-foreground" href="https://archive.org/download/tosec-iso-vtech">Internet Archive</a>`);
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
                  $$payload5.out.push(`<!---->[TOSEC-ISO] ZAPiT Games`);
                },
                $$slots: { default: true }
              });
              $$payload4.out.push(`<!----> `);
              Table_cell($$payload4, {
                children: ($$payload5) => {
                  $$payload5.out.push(`<a class="text-primary font-medium underline underline-offset-4 md:text-base hover:bg-primary hover:text-primary-foreground" href="https://archive.org/download/tosec-iso-zapit-games">Internet Archive</a>`);
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
                  $$payload5.out.push(`<!---->Hardware Target Game Database (HTGDB) Gamepacks`);
                },
                $$slots: { default: true }
              });
              $$payload4.out.push(`<!----> `);
              Table_cell($$payload4, {
                children: ($$payload5) => {
                  $$payload5.out.push(`<a class="text-primary font-medium underline underline-offset-4 md:text-base hover:bg-primary hover:text-primary-foreground" href="https://archive.org/download/htgdb-gamepacks">Internet Archive</a>`);
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
                  $$payload5.out.push(`<!---->English Translation ROMs Collection`);
                },
                $$slots: { default: true }
              });
              $$payload4.out.push(`<!----> `);
              Table_cell($$payload4, {
                children: ($$payload5) => {
                  $$payload5.out.push(`<a class="text-primary font-medium underline underline-offset-4 md:text-base hover:bg-primary hover:text-primary-foreground" href="https://archive.org/download/En-ROMs/En-ROMs/">Internet Archive</a>`);
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
                  $$payload5.out.push(`<!---->Super Mario World Hacks`);
                },
                $$slots: { default: true }
              });
              $$payload4.out.push(`<!----> `);
              Table_cell($$payload4, {
                children: ($$payload5) => {
                  $$payload5.out.push(`<a class="text-primary font-medium underline underline-offset-4 md:text-base hover:bg-primary hover:text-primary-foreground" href="https://archive.org/download/super-mario-world-hacks">Internet Archive</a>`);
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
                  $$payload5.out.push(`<!---->Super Famicom - Enhanced Colors`);
                },
                $$slots: { default: true }
              });
              $$payload4.out.push(`<!----> `);
              Table_cell($$payload4, {
                children: ($$payload5) => {
                  $$payload5.out.push(`<a class="text-primary font-medium underline underline-offset-4 md:text-base hover:bg-primary hover:text-primary-foreground" href="https://archive.org/download/super-famicom-enhanced-colors/ROMs/">Internet Archive</a>`);
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
                  $$payload5.out.push(`<!---->Nintendo - Super Famicom - Speed Hacks`);
                },
                $$slots: { default: true }
              });
              $$payload4.out.push(`<!----> `);
              Table_cell($$payload4, {
                children: ($$payload5) => {
                  $$payload5.out.push(`<a class="text-primary font-medium underline underline-offset-4 md:text-base hover:bg-primary hover:text-primary-foreground" href="https://archive.org/download/sfc-speedhacks/ROMs/">Internet Archive</a>`);
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
                  $$payload5.out.push(`<!---->Complete Sega MD+ Collection (MegaSD, Mega Everdrive
                        Pro &amp; Genesis Plus GX Compatible)`);
                },
                $$slots: { default: true }
              });
              $$payload4.out.push(`<!----> `);
              Table_cell($$payload4, {
                children: ($$payload5) => {
                  $$payload5.out.push(`<a class="text-primary font-medium underline underline-offset-4 md:text-base hover:bg-primary hover:text-primary-foreground" href="https://archive.org/download/mdplus_collection_22_04_16">Internet Archive</a>`);
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
                  $$payload5.out.push(`<!---->Sega Model 3 ROMs`);
                },
                $$slots: { default: true }
              });
              $$payload4.out.push(`<!----> `);
              Table_cell($$payload4, {
                children: ($$payload5) => {
                  $$payload5.out.push(`<a class="text-primary font-medium underline underline-offset-4 md:text-base hover:bg-primary hover:text-primary-foreground" href="https://archive.org/download/segamodel3/ROMs/">Internet Archive</a>`);
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
