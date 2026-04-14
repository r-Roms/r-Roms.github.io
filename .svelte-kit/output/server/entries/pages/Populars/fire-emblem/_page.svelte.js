import "clsx";
import { T as Table, a as Table_header, b as Table_row, c as Table_head, d as Table_body, e as Table_cell } from "../../../../chunks/table-row.js";
function _page($$renderer) {
  $$renderer.push(`<div class="mx-8 mb-8 mt-8 space-y-4 bg-background"><h1 class="scroll-m-20 text-balance text-4xl font-extrabold tracking-tight">Fire Emblem</h1> <div class="my-6 w-full overflow-y-auto">`);
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
                  $$renderer5.push(`<!---->Fire Emblem Path of Radiance (GC) (USA)`);
                },
                $$slots: { default: true }
              });
              $$renderer4.push(`<!----> `);
              Table_cell($$renderer4, {
                children: ($$renderer5) => {
                  $$renderer5.push(`<a href="https://minerva-archive.org/browse/Redump/Nintendo%20-%20GameCube%20-%20NKit%20RVZ%20[zstd-19-128k]/Fire%20Emblem%20-%20Path%20of%20Radiance%20(USA).zip" class="text-primary font-medium underline underline-offset-4 md:text-base hover:bg-primary hover:text-primary-foreground">Download</a>`);
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
                  $$renderer5.push(`<!---->Fire Emblem Radiant Dawn (Wii) (USA)`);
                },
                $$slots: { default: true }
              });
              $$renderer4.push(`<!----> `);
              Table_cell($$renderer4, {
                children: ($$renderer5) => {
                  $$renderer5.push(`<a href="https://minerva-archive.org/browse/Redump/Nintendo%20-%20Wii%20-%20NKit%20RVZ%20[zstd-19-128k]/Fire%20Emblem%20-%20Radiant%20Dawn%20(USA)%20(Rev%201).zip" class="text-primary font-medium underline underline-offset-4 md:text-base hover:bg-primary hover:text-primary-foreground">Download</a>`);
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
                  $$renderer5.push(`<!---->Fire Emblem Fates Special Edition (3DS) (USA)`);
                },
                $$slots: { default: true }
              });
              $$renderer4.push(`<!----> `);
              Table_cell($$renderer4, {
                children: ($$renderer5) => {
                  $$renderer5.push(`<a href="https://minerva-archive.org/browse/No-Intro/Nintendo%20-%20Nintendo%203DS%20(Encrypted)/Fire%20Emblem%20Fates%20-%20Special%20Edition%20(USA).zip" class="text-primary font-medium underline underline-offset-4 md:text-base hover:bg-primary hover:text-primary-foreground">Download</a>`);
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
  $$renderer.push(`<!----></div></div>`);
}
export {
  _page as default
};
