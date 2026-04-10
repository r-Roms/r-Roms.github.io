import "clsx";
import { T as Table, a as Table_header, b as Table_row, c as Table_head, d as Table_body, e as Table_cell } from "../../../../chunks/table-row.js";
function _page($$payload) {
  $$payload.out.push(`<div class="mx-8 mb-8 mt-8 space-y-4 bg-background"><h1 class="scroll-m-20 text-balance text-4xl font-extrabold tracking-tight">Other Information</h1> <h2 class="mt-10 scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0">Archive Files</h2> <p class="leading-7 [&amp;:not(:first-child)]:mt-6">Archives are used to store the content of one or more files within a
        single file. Archives are commonly compressed to reduce disk and
        network usage. Archives may need to be extracted depending on
        your emulator and the ROM file type inside. The most common archives
        for ROMs are .zip and .7z, among several others. The following is a
        small set of recommendations on archive programs.</p> <div class="my-6 w-full overflow-y-auto">`);
  Table($$payload, {
    children: ($$payload2) => {
      Table_header($$payload2, {
        children: ($$payload3) => {
          Table_row($$payload3, {
            children: ($$payload4) => {
              Table_head($$payload4, {
                children: ($$payload5) => {
                  $$payload5.out.push(`<!---->Program`);
                },
                $$slots: { default: true }
              });
              $$payload4.out.push(`<!----> `);
              Table_head($$payload4, {
                children: ($$payload5) => {
                  $$payload5.out.push(`<!---->Supported Systems`);
                },
                $$slots: { default: true }
              });
              $$payload4.out.push(`<!----> `);
              Table_head($$payload4, {
                children: ($$payload5) => {
                  $$payload5.out.push(`<!---->Supported Archive Types`);
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
                  $$payload5.out.push(`<a href="https://peazip.github.io" class="text-primary font-medium underline underline-offset-4 md:text-base hover:bg-primary hover:text-primary-foreground">PeaZip</a>`);
                },
                $$slots: { default: true }
              });
              $$payload4.out.push(`<!----> `);
              Table_cell($$payload4, {
                children: ($$payload5) => {
                  $$payload5.out.push(`<!---->Windows, MacOS, Linux`);
                },
                $$slots: { default: true }
              });
              $$payload4.out.push(`<!----> `);
              Table_cell($$payload4, {
                children: ($$payload5) => {
                  $$payload5.out.push(`<!---->Most`);
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
                  $$payload5.out.push(`<a href="https://www.7-zip.org" class="text-primary font-medium underline underline-offset-4 md:text-base hover:bg-primary hover:text-primary-foreground">7Zip</a>`);
                },
                $$slots: { default: true }
              });
              $$payload4.out.push(`<!----> `);
              Table_cell($$payload4, {
                children: ($$payload5) => {
                  $$payload5.out.push(`<!---->Windows`);
                },
                $$slots: { default: true }
              });
              $$payload4.out.push(`<!----> `);
              Table_cell($$payload4, {
                children: ($$payload5) => {
                  $$payload5.out.push(`<!---->Most`);
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
                  $$payload5.out.push(`<!---->Files (iOS)`);
                },
                $$slots: { default: true }
              });
              $$payload4.out.push(`<!----> `);
              Table_cell($$payload4, {
                children: ($$payload5) => {
                  $$payload5.out.push(`<!---->iOS`);
                },
                $$slots: { default: true }
              });
              $$payload4.out.push(`<!----> `);
              Table_cell($$payload4, {
                children: ($$payload5) => {
                  $$payload5.out.push(`<!---->.zip<br/> Can rename .7z to .zip`);
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
                  $$payload5.out.push(`<!---->Windows Explorer`);
                },
                $$slots: { default: true }
              });
              $$payload4.out.push(`<!----> `);
              Table_cell($$payload4, {
                children: ($$payload5) => {
                  $$payload5.out.push(`<!---->Windows`);
                },
                $$slots: { default: true }
              });
              $$payload4.out.push(`<!----> `);
              Table_cell($$payload4, {
                children: ($$payload5) => {
                  $$payload5.out.push(`<!---->.zip`);
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
  $$payload.out.push(`<!----></div> <h2 class="mt-10 scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0">Adblock</h2> <p class="leading-7 [&amp;:not(:first-child)]:mt-6">An adblocker is recommended when accessing certain links on this
        megathread and the Internet in general. This can be installed as
        an extension in your browser. Some browsers come with an adblocker
        integrated.</p> <div class="my-6 w-full overflow-y-auto">`);
  Table($$payload, {
    children: ($$payload2) => {
      Table_header($$payload2, {
        children: ($$payload3) => {
          Table_row($$payload3, {
            children: ($$payload4) => {
              Table_head($$payload4, {
                children: ($$payload5) => {
                  $$payload5.out.push(`<!---->Browser`);
                },
                $$slots: { default: true }
              });
              $$payload4.out.push(`<!----> `);
              Table_head($$payload4, {
                children: ($$payload5) => {
                  $$payload5.out.push(`<!---->Extension`);
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
                  $$payload5.out.push(`<a href="https://vivaldi.com" class="text-primary font-medium underline underline-offset-4 md:text-base hover:bg-primary hover:text-primary-foreground">Vivaldi</a>`);
                },
                $$slots: { default: true }
              });
              $$payload4.out.push(`<!----> `);
              Table_cell($$payload4, {});
              $$payload4.out.push(`<!---->`);
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
                  $$payload5.out.push(`<a href="https://brave.com" class="text-primary font-medium underline underline-offset-4 md:text-base hover:bg-primary hover:text-primary-foreground">Brave</a>`);
                },
                $$slots: { default: true }
              });
              $$payload4.out.push(`<!----> `);
              Table_cell($$payload4, {});
              $$payload4.out.push(`<!---->`);
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
                  $$payload5.out.push(`<a href="https://helium.computer" class="text-primary font-medium underline underline-offset-4 md:text-base hover:bg-primary hover:text-primary-foreground">Helium</a>`);
                },
                $$slots: { default: true }
              });
              $$payload4.out.push(`<!----> `);
              Table_cell($$payload4, {});
              $$payload4.out.push(`<!---->`);
              Table_cell($$payload4, {});
              $$payload4.out.push(`<!---->`);
            },
            $$slots: { default: true }
          });
          $$payload3.out.push(`<!----> `);
          Table_row($$payload3, {
            children: ($$payload4) => {
              Table_cell($$payload4, {});
              $$payload4.out.push(`<!----> `);
              Table_cell($$payload4, {
                children: ($$payload5) => {
                  $$payload5.out.push(`<a href="https://ublockorigin.com" class="text-primary font-medium underline underline-offset-4 md:text-base hover:bg-primary hover:text-primary-foreground">uBlock Origin</a>`);
                },
                $$slots: { default: true }
              });
              $$payload4.out.push(`<!----> `);
              Table_cell($$payload4, {
                children: ($$payload5) => {
                  $$payload5.out.push(`<a href="https://chrome.google.com/webstore/detail/ublock-origin/cjpalhdlnbpafiamejdnhcphjbkeiagm?hl=en" class="text-primary font-medium underline underline-offset-4 md:text-base hover:bg-primary hover:text-primary-foreground">Chrome</a> <a href="https://addons.mozilla.org/en-US/android/addon/ublock-origin/" class="text-primary font-medium underline underline-offset-4 md:text-base hover:bg-primary hover:text-primary-foreground">Firefox</a> <a href="https://addons.opera.com/en/extensions/details/ublock/" class="text-primary font-medium underline underline-offset-4 md:text-base hover:bg-primary hover:text-primary-foreground">Opera</a>`);
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
  $$payload.out.push(`<!----></div> <p class="leading-7 [&amp;:not(:first-child)]:mt-6">For Android: Download Firefox from the Play Store, locate the Addons
        menu and select uBlock Origin. Add it to Firefox and remember to only
        use Firefox to download ROMs.</p> <h2 class="mt-10 scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0">Bypassing Download Limits</h2> <h3 class="mt-8 scroll-m-20 text-2xl font-semibold tracking-tight">Google Drive</h3> <p class="leading-7 [&amp;:not(:first-child)]:mt-6">From time to time when trying to download a file, you may see an
        error message saying “Download quota exceeded, so you can’t download
        this file at this time”. The steps to bypass the download quota limit
        are as follows:</p> <ol class="my-6 ml-6 font-medium list-decimal [&amp;>li]:mt-2"><li>Sign in to your Google account or create one, if you have not
            already.</li> <li>Open Google Drive and go to “My Drive” in the sidebar.</li> <li>Make a new folder. It does not matter what you name it.</li> <li>Go to the quota'd folder, right click on the file you want to
            download, and click “Add Shortcut to Drive”.</li> <li>Navigate to “My Drive” and then to the folder you made, and click
            “Add Shortcut”.</li> <li>Go to “My Drive” on the sidebar. Right-click the folder you made and
            click “Download”.</li> <li>A .zip file with the file(s) you selected starts downloading.</li></ol> <h3 class="mt-8 scroll-m-20 text-2xl font-semibold tracking-tight">MEGA</h3> <p class="leading-7 [&amp;:not(:first-child)]:mt-6">MEGA has a 5 GB download limit every 24 hours. To bypass MEGA's download
        limits, you will need either a VPN or a list of proxies. If you are
        using a VPN, simply connect to it. If you are using a list of proxies,
        download <a href="https://github.com/tonikelope/megabasterd" class="text-primary font-medium underline underline-offset-4 md:text-base hover:bg-primary hover:text-primary-foreground">MegaBasterd</a> and configure it with the list of proxies.</p></div>`);
}
export {
  _page as default
};
