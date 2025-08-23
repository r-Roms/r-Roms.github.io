import { a as attr } from "../../../../chunks/attributes.js";
const img1 = "/_app/immutable/assets/9K4CIDd.DmoYaDR6.png";
const img2 = "/_app/immutable/assets/75nhplt.X__IKEbs.png";
function _page($$payload) {
  $$payload.out.push(`<div class="mx-8 mb-8 mt-8 space-y-4 bg-background"><h1 class="scroll-m-20 text-balance text-4xl font-extrabold tracking-tight">About RVZ files</h1> <p class="text-muted-foreground text-xl leading-7 [&amp;:not(:first-child)]:mt-6">RVZ files work with the Dolphin emulator but not on real hardware. They
        also help save bandwidth for both you and the website hosting the files
        when downloading. If you are using real hardware, use <a href="https://dolphin-emu.org/" class="text-primary font-medium underline underline-offset-4 md:text-base hover:bg-primary hover:text-primary-foreground">Dolphin Emulator</a> to convert the files to ISO<br/> <img${attr("src", img1)} alt="" class="h-full w-full rounded-md object-cover"/> <img${attr("src", img2)} alt="" class="h-full w-full rounded-md object-cover"/></p> <video controls class="h-full w-full rounded-md object-cover" autoplay muted playsinline preload="metadata" style="aspect-ratio: 16 / 9"><source src="https://myrient.erista.me/assets/rvz.mp4" type="video/mp4"/></video></div>`);
}
export {
  _page as default
};
