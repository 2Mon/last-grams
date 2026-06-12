<script lang="ts">
  import { tilt } from '$lib';
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
      title: 'Project Files',
      description: 'Your complete design files in a standard format.',
      items: [
        'For 3D prints: export as .STEP. For PCBs: include Gerbers and schematics',
        'Must be your original design. No downloaded models, no remixes',
        'No AI-generated designs. You must have made it yourself',
        'Must weigh strictly under 25g, verified in slicer or on a physical scale',
      ],
      warning: "Projects over 25g can't be approved — please double-check your weight before submitting.",
    },
    {
      number: '02',
      title: 'Readme.md (No AI)',
      description: 'A complete project writeup. No AI writing allowed.',
      items: [
        'Full image of your completed project',
        'Short description of your project and why you made it',
        'Wiring diagram for your full project (if applicable)',
      ],
      warning: 'Please write your README yourself — AI-generated text will be rejected.',
    },
    {
      number: '03',
      title: 'Design Journal',
      description: 'A log of your work throughout the process. Must be your own writing.',
      items: [
        'Stored as JOURNAL.md in your repository',
        'Each entry must include: date + time, title, what you worked on, images of progress, and time spent',
        'Photos, screenshots, and sketches are encouraged',
        'Document challenges you hit and how you solved them',
      ],
      warning: 'Write your journal in your own voice — AI-generated entries will be rejected.',
    },
    {
      number: '04',
      title: 'Weight Verification',
      description: 'Proof that your project weighs under 25g.',
      items: [
        'Photo of your project on a scale, with the weight clearly visible in grams',
        'OR a screenshot from your slicer showing the weight in grams',
      ],
    },
  ];
</script>

<svelte:head>
  <title>Submit | LAST GRAMS</title>
</svelte:head>

<main class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">

  <!-- Header -->
  <header class="space-y-6">
    <div class="inline-block bg-success-neon dark:bg-success-neon border-4 border-on-surface px-4 py-2 hard-shadow rotate-[-1deg] rounded-full">
      <p class="font-label font-bold uppercase text-xs text-on-surface">Ready to Ship?</p>
    </div>
    <h1 class="font-headline font-black text-6xl md:text-8xl tracking-tighter leading-none dark:text-background">
      Submission<br/><span class="text-primary italic">Guidelines</span>
    </h1>
    <p class="font-body text-xl font-bold text-on-surface-variant dark:text-background/70 max-w-2xl">
      Here's everything we need from you. Make sure you have it all before submitting!
    </p>
  </header>

  <!-- Divider -->
  <div class="flex items-center gap-4">
    <div class="h-1 bg-on-surface dark:bg-background flex-grow"></div>
    <span class="font-label font-bold uppercase text-sm tracking-widest text-on-surface-variant dark:text-background/70">The Checklist</span>
    <div class="h-1 bg-on-surface dark:bg-background flex-grow"></div>
  </div>

  <!-- Requirements -->
  <section class="space-y-8">
    {#each requirements as req}
      <div use:tilt class="border-4 border-on-surface dark:border-background bg-surface-container-lowest dark:bg-dark-container hard-shadow hover-lift transition-all rounded-xl overflow-hidden">

        <!-- Header bar -->
        <div class="bg-on-surface dark:bg-background text-surface dark:text-on-surface px-6 py-5 flex items-center gap-6">
          <span class="font-headline font-black text-5xl italic text-primary shrink-0 w-16 text-center leading-none">{req.number}</span>
          <div class="border-l-4 border-surface/20 dark:border-background/20 pl-6">
            <h2 class="font-headline font-black text-2xl tracking-tighter leading-none">{req.title}</h2>
            <p class="font-label text-xs uppercase font-bold text-surface/50 dark:text-background/50 mt-1">{req.description}</p>
          </div>
        </div>

        <!-- Items -->
        <div class="p-6 space-y-3">
          {#each req.items as item}
            <div class="flex items-start gap-4">
              <div class="w-2 h-2 bg-primary mt-2 shrink-0 rounded-full"></div>
              <p class="font-body font-bold text-lg text-on-surface dark:text-background">{item}</p>
            </div>
          {/each}

          {#if req.warning}
            <div class="mt-6 border-4 border-primary bg-primary/10 px-4 py-3 flex items-center gap-4 rounded-lg">
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
    <div class="h-1 bg-on-surface dark:bg-background flex-grow"></div>
    <span class="font-label font-bold uppercase text-sm tracking-widest text-on-surface-variant dark:text-background/70">How to Submit</span>
    <div class="h-1 bg-on-surface dark:bg-background flex-grow"></div>
  </div>

  <!-- How to Submit -->
  <section class="grid grid-cols-1 md:grid-cols-4 gap-6">
    <div class="border-4 border-on-surface dark:border-background bg-surface-container-lowest dark:bg-dark-container p-6 hard-shadow hover-lift transition-all rounded-xl">
      <div class="w-10 h-10 bg-primary text-on-primary font-headline font-black text-lg flex items-center justify-center mb-4 rounded-full">1</div>
      <h3 class="font-headline font-black text-xl mb-3 dark:text-background">Join Slack</h3>
      <p class="font-body font-bold text-base text-on-surface-variant dark:text-background/70">Head to <span class="text-primary">#last-grams</span> on the Hack Club Slack. Sign up free at hackclub.com/slack if you're not already there.</p>
    </div>
    <div class="border-4 border-on-surface dark:border-background bg-surface-container-lowest dark:bg-dark-container p-6 hard-shadow hover-lift transition-all rounded-xl">
      <div class="w-10 h-10 bg-primary text-on-primary font-headline font-black text-lg flex items-center justify-center mb-4 rounded-full">2</div>
      <h3 class="font-headline font-black text-xl mb-3 dark:text-background">Post Your Ship</h3>
      <p class="font-body font-bold text-base text-on-surface-variant dark:text-background/70">Share your GitHub repo link with all four requirements included. Weight photo must be in the message directly.</p>
    </div>
    <div class="border-4 border-on-surface bg-primary text-on-primary p-6 hard-shadow-primary hover-lift transition-all rounded-xl">
      <div class="w-10 h-10 bg-on-surface dark:bg-background text-surface dark:text-on-surface font-headline font-black text-lg flex items-center justify-center mb-4 rounded-full">3</div>
      <h3 class="font-headline font-black text-xl mb-3">Submit Model</h3>
      <p class="font-body font-bold text-base">Submit your model to the submission form. Our review team will review each project manually.</p>
    </div>
    <div class="border-4 border-on-surface bg-primary text-on-primary p-6 hard-shadow-primary hover-lift transition-all rounded-xl">
      <div class="w-10 h-10 bg-on-surface dark:bg-background text-surface dark:text-on-surface font-headline font-black text-lg flex items-center justify-center mb-4 rounded-full">4</div>
      <h3 class="font-headline font-black text-xl mb-3">Get Verified</h3>
      <p class="font-body font-bold text-base">A reviewer will check your submission and mark it approved. Once verified, your ship counts toward rewards and joins the gallery.</p>
    </div>
  </section>

  <!-- CTA -->
  <div class="text-center space-y-4">
    <p class="font-body font-bold text-lg text-on-surface-variant dark:text-background/70">
      Got everything? Submit your project on the
      <a href="https://forms.hackclub.com" target="_blank" class="text-primary underline decoration-4 underline-offset-4 hover:bg-primary hover:text-on-primary transition-colors px-1 rounded">Submission Form</a>.
    </p>
  </div>

</main>