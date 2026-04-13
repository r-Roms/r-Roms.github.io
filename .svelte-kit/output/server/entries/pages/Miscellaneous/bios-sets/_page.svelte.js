import "clsx";
import { T as Table, a as Table_header, b as Table_row, c as Table_head, d as Table_body, e as Table_cell } from "../../../../chunks/table-row.js";
function _page($$payload) {
  $$payload.out.push(`<div class="mx-8 mb-8 mt-8 space-y-4 bg-background"><h1 class="scroll-m-20 text-balance text-4xl font-extrabold tracking-tight">BIOS Sets</h1> <p class="leading-7 [&amp;:not(:first-child)]:mt-6">BIOS sets are large, sorted, verified collections of BIOS and firmware
        files, typically provided as a single archive file that you will need
        to extract prior to use. The BIOS sets here are provided in no
        particular order.</p> `);
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
                  $$payload5.out.push(`<!---->RetroBIOS`);
                },
                $$slots: { default: true }
              });
              $$payload4.out.push(`<!----> `);
              Table_cell($$payload4, {
                children: ($$payload5) => {
                  $$payload5.out.push(`<a class="text-primary font-medium underline underline-offset-4 md:text-base hover:bg-primary hover:text-primary-foreground" href="https://abdess.github.io/retrobios/">RetroBIOS</a><br/> <a class="text-primary font-medium underline underline-offset-4 md:text-base hover:bg-primary hover:text-primary-foreground" href="https://github.com/Abdess/retrobios">GitHub</a>`);
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
                  $$payload5.out.push(`<!---->Redump BIOS sets`);
                },
                $$slots: { default: true }
              });
              $$payload4.out.push(`<!----> `);
              Table_cell($$payload4, {
                children: ($$payload5) => {
                  $$payload5.out.push(`<a class="text-primary font-medium underline underline-offset-4 md:text-base hover:bg-primary hover:text-primary-foreground" href="https://archive.org/download/2019_11_25_redump_bios">Internet Archive</a>`);
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
                  $$payload5.out.push(`<!---->TOSEC Firmware and Operating Systems Collection`);
                },
                $$slots: { default: true }
              });
              $$payload4.out.push(`<!----> `);
              Table_cell($$payload4, {
                children: ($$payload5) => {
                  $$payload5.out.push(`<a class="text-primary font-medium underline underline-offset-4 md:text-base hover:bg-primary hover:text-primary-foreground" href="https://archive.org/download/tosec_fw_os">Internet Archive</a>`);
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
                  $$payload5.out.push(`<!---->Retroarch System Files (BIOS/Firmwares/OS)`);
                },
                $$slots: { default: true }
              });
              $$payload4.out.push(`<!----> `);
              Table_cell($$payload4, {
                children: ($$payload5) => {
                  $$payload5.out.push(`<a class="text-primary font-medium underline underline-offset-4 md:text-base hover:bg-primary hover:text-primary-foreground" href="https://archive.org/download/RetroarchSystemFiles/Retroarch-System/">Internet Archive</a>`);
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
                  $$payload5.out.push(`<!---->Firmwares`);
                },
                $$slots: { default: true }
              });
              $$payload4.out.push(`<!----> `);
              Table_cell($$payload4, {
                children: ($$payload5) => {
                  $$payload5.out.push(`<a class="text-primary font-medium underline underline-offset-4 md:text-base hover:bg-primary hover:text-primary-foreground" href="https://mega.nz/folder/9ZdQwaaY#u63KaI0MsKcIqWE2GQmUuA">MEGA</a>`);
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
  $$payload.out.push(`<!----></div>`);
}
export {
  _page as default
};
