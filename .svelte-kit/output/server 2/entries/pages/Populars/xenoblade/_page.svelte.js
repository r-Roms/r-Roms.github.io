import "clsx";
import { T as Table, a as Table_header, b as Table_row, c as Table_head, d as Table_body, e as Table_cell } from "../../../../chunks/table-row.js";
function _page($$payload) {
  $$payload.out.push(`<div class="mx-8 mb-8 mt-8 space-y-4 bg-background"><h1 class="scroll-m-20 text-balance text-4xl font-extrabold tracking-tight">Xenoblade</h1> <div class="my-6 w-full overflow-y-auto">`);
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
                  $$payload5.out.push(`<!---->Myrient (Fast &amp; Unrestricted)`);
                },
                $$slots: { default: true }
              });
              $$payload4.out.push(`<!----> `);
              Table_head($$payload4, {
                children: ($$payload5) => {
                  $$payload5.out.push(`<!---->Internet Archive`);
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
                  $$payload5.out.push(`<!---->Xenoblade Chronicles (Wii) (USA)`);
                },
                $$slots: { default: true }
              });
              $$payload4.out.push(`<!----> `);
              Table_cell($$payload4, {
                children: ($$payload5) => {
                  $$payload5.out.push(`<a href="https://myrient.erista.me/files/Redump/Nintendo%20-%20Wii%20-%20NKit%20RVZ%20%5Bzstd-19-128k%5D/Xenoblade%20Chronicles%20%28USA%2C%20Asia%29%20%28En%2CFr%2CEs%29.zip" class="text-primary font-medium underline underline-offset-4 md:text-base hover:bg-primary hover:text-primary-foreground">Download</a>`);
                },
                $$slots: { default: true }
              });
              $$payload4.out.push(`<!----> `);
              Table_cell($$payload4, {});
              $$payload4.out.push(`<!---->`);
            },
            $$slots: { default: true }
          });
          $$payload3.out.push(`<!----> `);
          Table_row($$payload3, {
            children: ($$payload4) => {
              Table_cell($$payload4, {
                children: ($$payload5) => {
                  $$payload5.out.push(`<!---->Xenoblade Chronicles X (Wii U) (USA)`);
                },
                $$slots: { default: true }
              });
              $$payload4.out.push(`<!----> `);
              Table_cell($$payload4, {
                children: ($$payload5) => {
                  $$payload5.out.push(`<a href="https://myrient.erista.me/files/No-Intro/Nintendo%20-%20Wii%20U%20(Digital)%20(CDN)/Xenoblade%20Chronicles%20X%20(USA)%20(En,Fr,Es).zip" class="text-primary font-medium underline underline-offset-4 md:text-base hover:bg-primary hover:text-primary-foreground">Game</a> / <a href="https://myrient.erista.me/files/No-Intro/Nintendo%20-%20Wii%20U%20(Digital)%20(CDN)/Xenoblade%20Chronicles%20X%20(USA)%20(En,Fr,Es)%20(Update).zip" class="text-primary font-medium underline underline-offset-4 md:text-base hover:bg-primary hover:text-primary-foreground">Update</a> / <a href="https://myrient.erista.me/files/No-Intro/Nintendo%20-%20Wii%20U%20(Digital)%20(CDN)/Xenoblade%20Chronicles%20X%20(USA)%20(En,Fr,Es)%20(v0)%20(DLC).zip" class="text-primary font-medium underline underline-offset-4 md:text-base hover:bg-primary hover:text-primary-foreground">DLC</a>`);
                },
                $$slots: { default: true }
              });
              $$payload4.out.push(`<!----> `);
              Table_cell($$payload4, {
                children: ($$payload5) => {
                  $$payload5.out.push(`<a href="https://archive.org/download/wii-u-retail-nus-usa/Xenoblade%20Chronicles%20X%20%5B00050000101C4D00%5D.7z" class="text-primary font-medium underline underline-offset-4 md:text-base hover:bg-primary hover:text-primary-foreground">Game</a> / <a href="https://archive.org/download/wii-u-retail-nus-usa/Xenoblade%20Chronicles%20X%20%5B0005000E101C4D00%5D%20%5BUPDATE%20v48%5D.7z" class="text-primary font-medium underline underline-offset-4 md:text-base hover:bg-primary hover:text-primary-foreground">Update</a> / <a href="https://archive.org/download/wii-u-retail-nus-usa/Xenoblade%20Chronicles%20X%20%5B0005000C101C4D00%5D%20%5BDLC%5D.7z" class="text-primary font-medium underline underline-offset-4 md:text-base hover:bg-primary hover:text-primary-foreground">DLC</a>`);
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
  $$payload.out.push(`<!----></div> <p class="leading-7 [&amp;:not(:first-child)]:mt-6">To run Wii U games in Cemu: Use <a href="https://github.com/VitaSmith/cdecrypt/releases" class="text-primary font-medium underline underline-offset-4 md:text-base hover:bg-primary hover:text-primary-foreground">CDecrypt</a> to unpack the files.</p></div>`);
}
export {
  _page as default
};
