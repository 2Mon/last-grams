<script lang="ts">
  import { base } from '$app/paths';
  import { page } from '$app/state';
  const gramsUsed = 142; // TODO: make dynamic

  const isActive = (path: string) =>
    page.url.pathname === (base + path) || (path === '/' && (page.url.pathname === base + '/' || page.url.pathname === base));

  const projects = [
    { user: 'Clement', name: 'Your Color Change Buddy', weight: '4.20g', rotate: '-1deg', img: 'https://media.printables.com/media/prints/204388/images/1886602_65b50415-f71b-4420-88d8-20ee4afd71ad/thumbs/inside/640x480/jpg/color-change-buddy4.webp' },
    { user: 'FishboneWorkshop', name: 'Cable labels', weight: '8.15g', rotate: '2deg',  img: 'https://media.printables.com/media/prints/207466/images/1907670_0741c15a-73a4-404d-8d11-b953692b5bdf/thumbs/inside/640x480/png/zawieszkanakable.webp' },
    { user: 'ThorinOakenshield', name: 'Cyclo valve cover', weight: '2.45g', rotate: '-2deg', img: 'https://media.printables.com/media/prints/208673/images/1916044_8f1cf666-a118-4a49-b79e-9e2408b1ecac/thumbs/inside/640x480/jpg/dscn1037.webp' },
    { user: 'XavierFaraudo', name: 'Book-style SD card case', weight: '0.95g', rotate: '1deg',  img: 'https://media.printables.com/media/prints/210458/images/1936578_3da808f8-3072-4946-88c6-efbc3e89be7d/thumbs/inside/640x480/jpg/1-portada-amb-marques.webp' },
    { user: 'XavierFaraudo', name: 'Remaining filament scales', weight: '12.3g', rotate: '-1deg', img: 'https://media.printables.com/media/prints/205435/images/2590817_eca96780-9b60-412d-989a-67d2d8916eef/thumbs/inside/1600x1200/jpg/1-portada-medodors.webp' },
    { user: '3DPrinty', name: 'Itty Bitty Fidget', weight: '6.77g', rotate: '2deg',  img: 'https://storage.googleapis.com/production-thangs-public/uploads/attachments/f43800bd-7954-4926-9f80-a20f142ce988/square-thumbnail-1.jpg' },
    { user: 'Saccy', name: 'Reusable Flossholder', weight: '18.9g', rotate: '-2deg', img: 'https://media.printables.com/media/prints/205005/images/1884641_904530a3-fabc-495b-8687-226b9b4389de/thumbs/inside/1600x1200/jpg/280533793_1934515593604035_2533210206350668186_n.webp' },
  ];
</script>

<svelte:head>
  <title>LAST GRAMS | A Hack Club YSWS</title>
</svelte:head>

<!-- Nav -->
<nav class="sticky top-0 z-50 flex justify-between items-center px-6 py-4 bg-background dark:bg-on-surface border-b-4 border-on-surface dark:border-background">
  <div class="text-2xl font-headline font-black uppercase italic tracking-tighter text-on-surface dark:text-background">
    LAST GRAMS
  </div>
  <div class="hidden md:flex gap-8 items-center">
    <a class="font-label font-bold uppercase text-sm {isActive('/') ? 'text-primary underline decoration-4 underline-offset-4' : 'text-on-background dark:text-background'} hover:translate-x-[2px] hover:translate-y-[2px] transition-all" href="{base}/">Home</a>
    <a class="font-label font-bold uppercase text-sm {isActive('/gallery') ? 'text-primary underline decoration-4 underline-offset-4' : 'text-on-background dark:text-background'} hover:translate-x-[2px] hover:translate-y-[2px] transition-all" href="{base}/gallery">Gallery</a>
  </div>
  <a class="bg-primary text-on-primary border-4 border-on-surface dark:border-background px-6 py-2 font-headline font-black uppercase tracking-tighter hard-shadow active-press hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none transition-all" href="{base}/submission">
    SUBMIT
  </a>
</nav>

<main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-24">

  <!-- Hero -->
  <section class="relative flex flex-col items-center text-center space-y-12 py-20">
    <div class="absolute -top-10 left-10 md:left-20 rotate-[-5deg] bg-success-neon border-4 border-on-surface px-4 py-2 hard-shadow z-10">
      <p class="font-label font-bold uppercase text-xs text-on-surface">Join Today!</p>
    </div>
    <div class="space-y-4">
      <h1 class="font-headline font-black text-7xl md:text-9xl uppercase tracking-tighter text-on-surface dark:text-background leading-none">
        LAST<br/><span class="text-primary italic">GRAMS</span>
      </h1>
      <p class="font-label font-black uppercase tracking-widest text-2xl md:text-4xl mt-6 bg-on-surface dark:bg-background text-surface dark:text-on-surface px-4 py-2 inline-block">
        DESIGN UNDER 25G • GET REAL REWARDS
      </p>
    </div>

    <!-- Live Counter -->
    <div class="flex items-center gap-4 bg-surface-container dark:bg-surface-container-highest border-4 border-on-surface dark:border-background p-4 hard-shadow rotate-1">
      <span class="material-symbols-outlined text-primary text-4xl" style='font-variation-settings: "FILL" 1;'>brush</span>
      <div class="text-left">
        <p class="font-headline font-black text-3xl leading-none text-on-surface dark:text-background">{gramsUsed} GRAMS SAVED</p>
        <p class="font-label text-xs uppercase opacity-70 text-on-surface dark:text-background">From being thrown out</p>
      </div>
    </div>

    <div class="flex flex-col gap-6 items-center">
      <div class="flex flex-col md:flex-row gap-6 items-center">
        <a class="bg-success-neon text-on-surface border-4 border-on-surface px-12 py-6 text-3xl font-headline font-black uppercase tracking-tighter hard-shadow active-press hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none transition-all" href="{base}/submission">Submission Guidelines</a>
        <a class="bg-primary text-on-primary border-4 border-on-surface px-12 py-6 text-3xl font-headline font-black uppercase tracking-tighter hard-shadow active-press hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none transition-all" href="https://forms.hackclub.com">Submit your project</a>
      </div>
      <div class="text-center max-w-sm">
        <p class="font-body font-bold text-lg leading-tight text-on-surface dark:text-background">
          Got a spool with only a few grams left? <span class="text-primary">Use less than 25g to make something original and useful.</span> Get awesome rewards.
        </p>
      </div>
    </div>
  </section>

  <!-- Marquee -->
  <section class="space-y-8">
    <div class="flex items-center gap-4 px-4">
      <h2 class="font-headline font-black text-3xl uppercase tracking-tighter shrink-0 text-on-surface dark:text-background">SHIPPED CREATIONS</h2>
      <div class="h-1 bg-on-surface dark:bg-background flex-grow"></div>
    </div>

    <div class="relative w-full" style="overflow-x: hidden; mask-image: linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%); -webkit-mask-image: linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%);">
      <div
        class="flex gap-6 animate-marquee-slow hover:[animation-play-state:paused] cursor-grab active:cursor-grabbing py-4"
        style="width: max-content"
      >
        <!-- Original set -->
        <div class="flex gap-6">
          {#each projects as p}
            <div
              class="inline-block bg-surface-container-lowest dark:bg-surface-container-highest border-4 border-on-surface dark:border-background p-3 hard-shadow min-w-[280px]"
              style="transform: rotate({p.rotate})"
            >
              <img alt={p.name} class="w-full h-40 object-cover border-2 border-on-surface dark:border-background mb-3" src={p.img} />
              <div class="flex justify-between items-end">
                <div>
                  <p class="font-label text-[10px] uppercase font-bold text-primary">By @{p.user}</p>
                  <h4 class="font-headline font-black text-xl uppercase leading-tight text-on-surface dark:text-background">{p.name}</h4>
                </div>
                <div class="bg-on-surface dark:bg-background text-surface dark:text-on-surface px-2 py-1 font-label font-bold text-sm">{p.weight}</div>
              </div>
            </div>
          {/each}
        </div>

        <!-- Duplicate set for seamless loop -->
        <div class="flex gap-6" aria-hidden="true">
          {#each projects as p}
            <div
              class="inline-block bg-surface-container-lowest dark:bg-surface-container-highest border-4 border-on-surface dark:border-background p-3 hard-shadow min-w-[280px]"
              style="transform: rotate({p.rotate})"
            >
              <img alt={p.name} class="w-full h-40 object-cover border-2 border-on-surface dark:border-background mb-3" src={p.img} />
              <div class="flex justify-between items-end">
                <div>
                  <p class="font-label text-[10px] uppercase font-bold text-primary">By @{p.user}</p>
                  <h4 class="font-headline font-black text-xl uppercase leading-tight text-on-surface dark:text-background">{p.name}</h4>
                </div>
                <div class="bg-on-surface dark:bg-background text-surface dark:text-on-surface px-2 py-1 font-label font-bold text-sm">{p.weight}</div>
              </div>
            </div>
          {/each}
        </div>
      </div>
    </div>
  </section>

  <!-- SpecBanner -->
  <section class="w-full bg-on-surface text-surface py-6 relative border-y-4 border-primary" style="overflow-x: hidden; mask-image: linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%); -webkit-mask-image: linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%);">
    <div
      class="animate-marquee font-headline font-black text-4xl md:text-5xl uppercase italic tracking-tighter flex"
      style="width: max-content; white-space: nowrap; gap: 3rem;"
    >
      <span>PRINT IT • WEIGH IT • SHIP IT • </span>
      <span>PRINT IT • WEIGH IT • SHIP IT • </span>
      <span>PRINT IT • WEIGH IT • SHIP IT • </span>
      <span aria-hidden="true">PRINT IT • WEIGH IT • SHIP IT • </span>
      <span aria-hidden="true">PRINT IT • WEIGH IT • SHIP IT • </span>
      <span aria-hidden="true">PRINT IT • WEIGH IT • SHIP IT • </span>
    </div>
  </section>

  <!-- Prizes -->
  <section class="space-y-12">
    <div class="text-center md:text-left max-w-2xl">
      <h2 class="font-headline font-black text-5xl uppercase tracking-tighter leading-none mb-4 text-on-surface dark:text-background">THE HAUL</h2>
      <p class="font-body text-xl font-bold text-on-surface dark:text-background">Ship original lightweight projects and receive exclusive rewards!</p>
    </div>
    <div class="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">

      <!-- Tier 1: 1 Ship -->
      <div class="bg-surface-container-lowest dark:bg-surface-container-highest border-4 border-on-surface dark:border-background p-0 hard-shadow flex flex-col relative">
        <div class="bg-on-surface dark:bg-background text-surface dark:text-on-surface font-headline font-black text-2xl px-4 py-2 uppercase italic tracking-tighter">1 Approved Ship</div>
        <div class="p-6 space-y-4 flex-1">
          <div>
            <h3 class="font-headline font-black text-3xl uppercase leading-none text-on-surface dark:text-background">Sticker Pack</h3>
            <p class="font-body text-lg mt-2 font-bold text-on-surface dark:text-background opacity-80">Custom Last Grams stickers for your projects.</p>
          </div>
        </div>
        <div class="border-t-4 border-on-surface dark:border-background p-4 bg-surface-container dark:bg-surface-container-highest">
          <p class="font-label font-bold text-xs uppercase text-primary">Ready to ship?</p>
        </div>
      </div>

      <!-- Tier 2: 3 Ships -->
      <div class="bg-primary-container border-4 border-on-surface dark:border-background p-0 hard-shadow flex flex-col relative">
        <div class="absolute -right-20 top-6 rotate-45 bg-on-surface text-success-neon font-black font-label py-4 px-10 text-sm tracking-widest shadow-xl z-10 [filter:drop-shadow(0_0_8px_#39ff14)]">LIMITED EDITION!</div>
        <div class="bg-on-surface dark:bg-background text-surface dark:text-on-surface font-headline font-black text-2xl px-4 py-2 uppercase italic tracking-tighter">3 Approved Ships</div>
        <div class="p-6 space-y-4 flex-1">
          <div>
            <h3 class="font-headline font-black text-3xl uppercase leading-none text-on-primary-container">1kg Hack Club Filament</h3>
            <p class="font-body text-lg mt-2 font-bold text-on-primary-container">Fresh spool of custom Hack Club filament. Red with white glitter on a custom Hack Club spool.</p>
          </div>
        </div>
        <div class="border-t-4 border-on-surface dark:border-background p-4 bg-on-primary-container/10">
          <p class="font-label font-bold text-xs uppercase text-on-primary-container">Tier 2 Reward</p>
        </div>
      </div>
    </div>
  </section>

  <!-- How it works -->
  <section class="space-y-12">
    <div class="flex items-center gap-4">
      <div class="h-1 bg-on-surface dark:bg-background flex-grow"></div>
      <h2 class="font-headline font-black text-4xl uppercase tracking-tighter shrink-0 text-on-surface dark:text-background">HOW IT WORKS</h2>
      <div class="h-1 bg-on-surface dark:bg-background flex-grow"></div>
    </div>
    <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
      <div class="p-8 border-4 border-on-surface dark:border-background bg-surface-container-lowest dark:bg-surface-container-highest hard-shadow relative">
        <span class="absolute -top-4 -left-4 w-12 h-12 bg-on-surface dark:bg-background text-surface dark:text-on-surface font-headline font-black text-2xl flex items-center justify-center">01</span>
        <h4 class="font-headline font-black text-xl uppercase mt-4 text-on-surface dark:text-background">DESIGN A MODEL</h4>
        <p class="font-body font-bold text-lg mt-4 text-on-surface-variant dark:text-background/70">Create a model in CAD that weighs less than 25g when sliced.</p>
      </div>
      <div class="p-8 border-4 border-on-surface dark:border-background bg-surface-container-lowest dark:bg-surface-container-highest hard-shadow relative">
        <span class="absolute -top-4 -left-4 w-12 h-12 bg-on-surface dark:bg-background text-surface dark:text-on-surface font-headline font-black text-2xl flex items-center justify-center">02</span>
        <h4 class="font-headline font-black text-xl uppercase mt-4 text-on-surface dark:text-background">DOCUMENT YOUR WORK</h4>
        <p class="font-body font-bold text-lg mt-4 text-on-surface-variant dark:text-background/70">Document your design process in a JOURNAL.md on a github repository.</p>
      </div>
      <div class="p-8 border-4 border-on-surface dark:border-background bg-surface-container-lowest dark:bg-surface-container-highest hard-shadow relative">
        <span class="absolute -top-4 -left-4 w-12 h-12 bg-on-surface dark:bg-background text-surface dark:text-on-surface font-headline font-black text-2xl flex items-center justify-center">03</span>
        <h4 class="font-headline font-black text-xl uppercase mt-4 text-on-surface dark:text-background">SLICE & PRINT</h4>
        <p class="font-body font-bold text-lg mt-4 text-on-surface-variant dark:text-background/70">Slice your model to ensure it meets the weight requirement. Print using your 3d printer, or use #printing-legion!</p>
      </div>
      <div class="p-8 border-4 border-on-surface dark:border-background bg-primary text-on-primary hard-shadow-primary relative">
        <span class="absolute -top-4 -left-4 w-12 h-12 bg-on-surface dark:bg-background text-surface dark:text-on-surface font-headline font-black text-2xl flex items-center justify-center">04</span>
        <h4 class="font-headline font-black text-xl uppercase mt-4">SHIP YOUR PROJECT</h4>
        <p class="font-body font-bold text-lg mt-4">Submit your project for review and receive rewards for your work!</p>
      </div>
    </div>
  </section>

  <!-- FAQ -->
  <section class="space-y-6">
    <div class="flex items-center gap-4">
      <div class="h-1 bg-on-surface dark:bg-background flex-grow"></div>
      <h2 class="font-headline font-black text-4xl uppercase tracking-tighter shrink-0 text-on-surface dark:text-background">FAQ</h2>
      <div class="h-1 bg-on-surface dark:bg-background flex-grow"></div>
    </div>

    <div class="border-4 border-on-surface dark:border-background p-8 bg-surface-container-lowest dark:bg-surface-container-highest hover:bg-surface-container dark:hover:bg-surface-container-high transition-colors">
      <h3 class="font-headline font-black text-2xl uppercase flex gap-4 text-on-surface dark:text-background">
        <span class="text-primary">Q:</span> WHAT EVEN IS LAST GRAMS?
      </h3>
      <div class="mt-4 pl-10 border-l-4 border-primary">
        <p class="font-body font-bold text-xl text-on-surface dark:text-background">Last Grams is a Hack Club YSWS — You Ship, We Ship. Design and 3D print an original object using less than 25g of filament, and we'll send you real prizes.</p>
      </div>
    </div>

    <div class="border-4 border-on-surface dark:border-background p-8 bg-surface-container-lowest dark:bg-surface-container-highest hover:bg-surface-container dark:hover:bg-surface-container-high transition-colors">
      <h3 class="font-headline font-black text-2xl uppercase flex gap-4 text-on-surface dark:text-background">
        <span class="text-primary">Q:</span> WHO CAN PARTICIPATE?
      </h3>
      <div class="mt-4 pl-10 border-l-4 border-primary">
        <p class="font-body font-bold text-xl text-on-surface dark:text-background">Teens aged 13–18 of all experience levels can participate in Last Grams! Guided projects are available.</p>
      </div>
    </div>

    <div class="border-4 border-on-surface dark:border-background p-8 bg-surface-container-lowest dark:bg-surface-container-highest hover:bg-surface-container dark:hover:bg-surface-container-high transition-colors">
      <h3 class="font-headline font-black text-2xl uppercase flex gap-4 text-on-surface dark:text-background">
        <span class="text-primary">Q:</span> DOES MY DESIGN HAVE TO BE ORIGINAL?
      </h3>
      <div class="mt-4 pl-10 border-l-4 border-primary">
        <p class="font-body font-bold text-xl text-on-surface dark:text-background">Yes. All of your projects must be made entirely by you.</p>
      </div>
    </div>

    <div class="border-4 border-on-surface dark:border-background p-8 bg-surface-container-lowest dark:bg-surface-container-highest hover:bg-surface-container dark:hover:bg-surface-container-high transition-colors">
      <h3 class="font-headline font-black text-2xl uppercase flex gap-4 text-on-surface dark:text-background">
        <span class="text-primary">Q:</span> HOW DO I PROVE MY WEIGHT?
      </h3>
      <div class="mt-4 pl-10 border-l-4 border-primary">
        <p class="font-body font-bold text-xl text-on-surface dark:text-background">For design submissions, submit a screenshot of your design in the slicer. For completed builds, upload a picture of your print on a scale showing the weight.</p>
      </div>
    </div>

    <div class="border-4 border-on-surface dark:border-background p-8 bg-surface-container-lowest dark:bg-surface-container-highest hover:bg-surface-container dark:hover:bg-surface-container-high transition-colors">
      <h3 class="font-headline font-black text-2xl uppercase flex gap-4 text-on-surface dark:text-background">
        <span class="text-primary">Q:</span> WHAT MATERIALS ARE ALLOWED?
      </h3>
      <div class="mt-4 pl-10 border-l-4 border-primary">
        <p class="font-body font-bold text-xl text-on-surface dark:text-background">PLA, ABS, PETG, TPU, Nylon, resin, etc. Multi-material prints are fine as long as the total is under 25g.</p>
      </div>
    </div>

    <div class="border-4 border-on-surface dark:border-background p-8 bg-surface-container-lowest dark:bg-surface-container-highest hover:bg-surface-container dark:hover:bg-surface-container-high transition-colors">
      <h3 class="font-headline font-black text-2xl uppercase flex gap-4 text-on-surface dark:text-background">
        <span class="text-primary">Q:</span> CAN I SUBMIT MORE THAN ONCE?
      </h3>
      <div class="mt-4 pl-10 border-l-4 border-primary">
        <p class="font-body font-bold text-xl text-on-surface dark:text-background">Yes — every unique original design is a new ship. At 3 submissions, you unlock custom Hack Club filament!!</p>
      </div>
    </div>

    <div class="border-4 border-on-surface dark:border-background p-8 bg-surface-container-lowest dark:bg-surface-container-highest hover:bg-surface-container dark:hover:bg-surface-container-high transition-colors">
      <h3 class="font-headline font-black text-2xl uppercase flex gap-4 text-on-surface dark:text-background">
        <span class="text-primary">Q:</span> I HAVE A QUESTION!
      </h3>
      <div class="mt-4 pl-10 border-l-4 border-primary">
        <p class="font-body font-bold text-xl text-on-surface dark:text-background"> Find us in <span class="text-primary font-black">#last-grams</span> on the Hack Club Slack.</p>
      </div>
    </div>
  </section>

  <!-- Call to Action -->
  <section class="bg-on-surface dark:bg-background p-12 text-center border-4 border-on-surface dark:border-background relative">
    <div class="absolute inset-0 opacity-10" style="background-image: radial-gradient(#F7F6F2 2px, transparent 2px); background-size: 20px 20px;"></div>
    <div class="relative z-10 space-y-10">
      <h2 class="font-headline font-black text-5xl md:text-7xl uppercase text-surface dark:text-on-surface leading-none tracking-tighter">
        EVERY GRAM COUNTS.<br/>WASTE NOTHING.
      </h2>
      <div class="flex flex-col md:flex-row gap-6 justify-center items-center">
        <a href="{base}/submission" class="bg-success-neon text-on-surface border-4 border-surface px-12 py-6 text-3xl font-headline font-black uppercase tracking-tighter hard-shadow active-press hover:translate-x-[2px] hover:translate-y-[2px] transition-all inline-block">
        Submission Guidelines
        </a>
        <button class="bg-primary text-on-primary border-4 border-surface dark:border-on-surface px-12 py-6 text-3xl font-headline font-black uppercase tracking-tighter hard-shadow active-press hover:translate-x-[2px] hover:translate-y-[2px] transition-all">
          Ship Your Build
        </button>
      </div>
  </section>

</main>

<!-- Footer -->
<footer class="w-full grid grid-cols-1 md:grid-cols-2 items-center text-center p-8 gap-4 bg-primary dark:bg-secondary border-t-4 border-on-surface dark:border-background">
  <div class="font-label font-bold uppercase text-sm text-on-primary border-r-4 border-on-surface dark:border-background last:border-r-0 h-full flex items-center justify-center">
    Built by 1Mon for Hack Club 2026
  </div>
  <div class="flex justify-center gap-6 border-r-4 border-on-surface dark:border-background last:border-r-0 h-full items-center">
    <a class="font-label font-bold uppercase text-sm text-on-primary hover:bg-on-surface dark:hover:bg-background transition-colors p-2" href="https://github.com/2Mon/last-grams" target="_blank">GitHub</a>
    <a class="font-label font-bold uppercase text-sm text-on-primary hover:bg-on-surface dark:hover:bg-background transition-colors p-2" href="https://hackclub.com" target="_blank">Hack Club HQ</a>
  </div>
</footer>