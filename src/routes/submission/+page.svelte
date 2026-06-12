<script lang="ts">
  import { base } from '$app/paths';
  import { page } from '$app/state';

  const isActive = (path: string): boolean =>
    page.url.pathname === (base + path) || (path === '/' && (page.url.pathname === base + '/' || page.url.pathname === base));

  interface Requirement {
    number: string;
    title: string;
    description: string;
    items: string[];
    warning?: string;
  }

  const requirements: Requirement[] = [
    {
      number: '01',
      title: 'PROJECT FILES',
      description: 'Your complete design files in a standard format.',
      items: [
        'For 3D prints: export as .STEP. For PCBs: include Gerbers and schematics',
        'Must be your original design. No downloaded models, no remixes',
        'No AI-generated designs. You must have made it yourself',
        'Must weigh strictly under 25g, verified in slicer or on a physical scale',
      ],
      warning: "Anything over 25g won't be approved. Double-check before submitting.",
    },
    {
      number: '02',
      title: 'README.MD',
      description: 'A complete project writeup. No AI writing allowed.',
      items: [
        'Full image of your completed project',
        'Short description of your project and why you made it',
        'Wiring diagram for your full project (if applicable)',
      ],
      warning: 'NO AI IN READMEs. AI-generated text will be rejected immediately.',
    },
    {
      number: '03',
      title: 'DESIGN JOURNAL',
      description: 'A log of your work throughout the process. Must be your own writing.',
      items: [
        'Stored as JOURNAL.md in your repository',
        'Each entry must include: date + time, title, what you worked on, images of progress, and time spent',
        'Photos, screenshots, and sketches are encouraged',
        'Document challenges you hit and how you solved them',
      ],
      warning: 'AI-generated journal entries will be rejected. Write in your own voice.',
    },
    {
      number: '04',
      title: 'WEIGHT VERIFICATION',
      description: 'Proof that your project weighs under 25g.',
      items: [
        'Photo of your project on a scale, with the weight clearly visible in grams',
        'For 3D prints: a slicer screenshot showing the weight also works',
      ],
    },
  ];
</script>

<svelte:head>
  <title>Submit | LAST GRAMS</title>
</svelte:head>

<!-- Nav -->
<nav class="sticky top-0 z-50 flex justify-between items-center px-6 py-4 bg-background border-b-4 border-on-surface">
  <a href="{base}/" class="text-2xl font-headline font-black uppercase italic tracking-tighter text-on-surface">
    LAST GRAMS
  </a>
  <div class="hidden md:flex gap-8 items-center">
    <a class="font-label font-bold uppercase text-sm {isActive('/') ? 'text-primary underline decoration-4 underline-offset-4' : 'text-on-background'} hover:translate-x-[2px] hover:translate-y-[2px] transition-all" href="{base}/">Home</a>
    <a class="font-label font-bold uppercase text-sm {isActive('/gallery') ? 'text-primary underline decoration-4 underline-offset-4' : 'text-on-background'} hover:translate-x-[2px] hover:translate-y-[2px] transition-all" href="{base}/gallery">Gallery</a>
  </div>
  <a href="https://forms.hackclub.com" class="bg-primary text-on-primary border-4 border-on-surface px-6 py-2 font-headline font-black uppercase tracking-tighter hard-shadow active-press hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none transition-all">
    SUBMIT
  </a>
</nav>

<main class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">

  <!-- Header -->
  <header class="space-y-6">
    <h1 class="font-headline font-black text-6xl md:text-8xl uppercase tracking-tighter leading-none">
      SUBMISSION<br/><span class="text-primary italic">GUIDELINES</span>
    </h1>
    <p class="font-body text-xl font-bold text-on-surface-variant max-w-2xl">
      Your submission needs all of the following. Missing something? It'll get rejected.
    </p>
  </header>

  <!-- Divider -->
  <div class="flex items-center gap-4">
    <div class="h-1 bg-on-surface flex-grow"></div>
    <span class="font-label font-bold uppercase text-sm tracking-widest text-on-surface-variant">The Checklist</span>
    <div class="h-1 bg-on-surface flex-grow"></div>
  </div>

  <!-- Requirements -->
  <section class="space-y-8">
    {#each requirements as req}
      <div class="border-4 border-on-surface bg-surface-container-lowest hard-shadow">

        <!-- Header bar -->
        <div class="bg-on-surface text-surface px-6 py-5 flex items-center gap-6">
          <span class="font-headline font-black text-5xl italic text-primary shrink-0 w-16 text-center leading-none">{req.number}</span>
          <div class="border-l-4 border-surface/20 pl-6">
            <h2 class="font-headline font-black text-2xl uppercase tracking-tighter leading-none">{req.title}</h2>
            <p class="font-label text-xs uppercase font-bold text-surface/50 mt-1">{req.description}</p>
          </div>
        </div>

        <!-- Items -->
        <div class="p-6 space-y-3">
          {#each req.items as item}
            <div class="flex items-start gap-4">
              <div class="w-2 h-2 bg-primary mt-2 shrink-0"></div>
              <p class="font-body font-bold text-lg text-on-surface">{item}</p>
            </div>
          {/each}

          {#if req.warning}
            <div class="mt-6 border-4 border-primary bg-primary/10 px-4 py-3 flex items-center gap-4">
              <span class="font-headline font-black text-primary text-2xl shrink-0 leading-none">!</span>
              <p class="font-label font-black uppercase text-sm text-primary">{req.warning}</p>
            </div>
          {/if}
        </div>

      </div>
    {/each}
  </section>

  <!-- Divider -->
  <div class="flex items-center gap-4">
    <div class="h-1 bg-on-surface flex-grow"></div>
    <span class="font-label font-bold uppercase text-sm tracking-widest text-on-surface-variant">How to Submit</span>
    <div class="h-1 bg-on-surface flex-grow"></div>
  </div>

  <!-- How to Submit -->
  <section class="grid grid-cols-1 md:grid-cols-4 gap-6">
    <div class="border-4 border-on-surface bg-surface-container-lowest p-6 hard-shadow">
      <div class="w-10 h-10 bg-primary text-on-primary font-headline font-black text-lg flex items-center justify-center mb-4">1</div>
      <h3 class="font-headline font-black text-xl uppercase mb-3">JOIN SLACK</h3>
      <p class="font-body font-bold text-base text-on-surface-variant">Join <span class="text-primary">#last-grams</span> on Hack Club Slack. Not on Slack yet? Sign up at hackclub.com/slack.</p>
    </div>
    <div class="border-4 border-on-surface bg-surface-container-lowest p-6 hard-shadow">
      <div class="w-10 h-10 bg-primary text-on-primary font-headline font-black text-lg flex items-center justify-center mb-4">2</div>
      <h3 class="font-headline font-black text-xl uppercase mb-3">POST YOUR SHIP</h3>
      <p class="font-body font-bold text-base text-on-surface-variant">Share your GitHub repo link with all four requirements. Include your weight photo directly in the message.</p>
    </div>
    <div class="border-4 border-on-surface bg-primary text-on-primary p-6 hard-shadow-primary">
      <div class="w-10 h-10 bg-on-surface text-surface font-headline font-black text-lg flex items-center justify-center mb-4">3</div>
      <h3 class="font-headline font-black text-xl uppercase mb-3">SUBMIT MODEL</h3>
      <p class="font-body font-bold text-base">Fill out the submission form. Every project is reviewed by a real person.</p>
    </div>
    <div class="border-4 border-on-surface bg-primary text-on-primary p-6 hard-shadow-primary">
      <div class="w-10 h-10 bg-on-surface text-surface font-headline font-black text-lg flex items-center justify-center mb-4">4</div>
      <h3 class="font-headline font-black text-xl uppercase mb-3">GET APPROVED</h3>
      <p class="font-body font-bold text-base">Once approved, your ship counts toward rewards and shows up in the gallery.</p>
    </div>
  </section>

  <!-- CTA -->
  <section class="bg-on-surface p-12 text-center border-4 border-on-surface">
    <div class="space-y-8">
      <h2 class="font-headline font-black text-5xl md:text-6xl uppercase text-surface leading-none tracking-tighter">
        READY?<br/><span class="text-primary italic">SHIP IT.</span>
      </h2>
      <a href="https://forms.hackclub.com" target="_blank" class="bg-success-neon text-on-surface border-4 border-surface px-12 py-6 text-3xl font-headline font-black uppercase tracking-tighter hard-shadow active-press hover:translate-x-[2px] hover:translate-y-[2px] transition-all inline-block">
        Submission Form
      </a>
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