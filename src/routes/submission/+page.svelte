<script lang="ts">
  import { tilt, notOpenYet } from '$lib';
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
        'Must be your original design. No downloaded projects, no remixes',
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
  <title>Submit | WISP</title>
</svelte:head>

<main class="max-w-5xl px-4 py-12 mx-auto space-y-16 sm:px-6 lg:px-8">

  <!-- Header -->
  <header class="space-y-6">
    <div class="inline-block bg-success-neon dark:bg-success-neon border-4 border-on-surface px-4 py-2 hard-shadow rotate-[-1deg] rounded-full">
      <p class="text-xs font-bold uppercase font-label text-on-surface">Ready to Ship?</p>
    </div>
    <h1 class="text-6xl font-black leading-none tracking-tighter font-headline md:text-8xl dark:text-background">
      Submission<br/><span class="italic text-primary">Guidelines</span>
    </h1>
    <p class="max-w-2xl text-xl font-bold font-body text-on-surface-variant dark:text-background/70">
      Here's everything we need from you. Make sure you have it all before submitting!
    </p>
  </header>

  <!-- Divider -->
  <div class="flex items-center gap-4">
    <div class="flex-grow h-1 bg-on-surface dark:bg-background"></div>
    <span class="text-sm font-bold tracking-widest uppercase font-label text-on-surface-variant dark:text-background/70">The Checklist</span>
    <div class="flex-grow h-1 bg-on-surface dark:bg-background"></div>
  </div>

  <!-- Requirements -->
  <section class="space-y-8">
    {#each requirements as req}
      <div use:tilt class="overflow-hidden transition-all border-4 border-on-surface dark:border-background bg-surface-container-lowest dark:bg-dark-container hard-shadow hover-lift rounded-xl">

        <!-- Header bar -->
        <div class="flex items-center gap-6 px-6 py-5 bg-on-surface dark:bg-background text-surface dark:text-on-surface">
          <span class="w-16 text-5xl italic font-black leading-none text-center font-headline text-primary shrink-0">{req.number}</span>
          <div class="pl-6 border-l-4 border-surface/20 dark:border-background/20">
            <h2 class="text-2xl font-black leading-none tracking-tighter font-headline">{req.title}</h2>
            <p class="mt-1 text-xs font-bold uppercase font-label text-surface/50 dark:text-background/50">{req.description}</p>
          </div>
        </div>

        <!-- Items -->
        <div class="p-6 space-y-3">
          {#each req.items as item}
            <div class="flex items-start gap-4">
              <div class="w-2 h-2 mt-2 rounded-full bg-primary shrink-0"></div>
              <p class="text-lg font-bold font-body text-on-surface dark:text-background">{item}</p>
            </div>
          {/each}

          {#if req.warning}
            <div class="flex items-center gap-4 px-4 py-3 mt-6 border-4 rounded-lg border-primary bg-primary/10">
              <span class="text-2xl font-black leading-none font-headline text-primary shrink-0">!</span>
              <p class="text-sm font-black uppercase font-label text-primary">{req.warning}</p>
            </div>
          {/if}
        </div>

      </div>
    {/each}
  </section>

  <!-- Divider -->
  <div class="flex items-center gap-4">
    <div class="flex-grow h-1 bg-on-surface dark:bg-background"></div>
    <span class="text-sm font-bold tracking-widest uppercase font-label text-on-surface-variant dark:text-background/70">How to Submit</span>
    <div class="flex-grow h-1 bg-on-surface dark:bg-background"></div>
  </div>

  <!-- How to Submit -->
  <section class="grid grid-cols-1 gap-6 md:grid-cols-4">
    <div class="p-6 transition-all border-4 border-on-surface dark:border-background bg-surface-container-lowest dark:bg-dark-container hard-shadow hover-lift rounded-xl">
      <div class="flex items-center justify-center w-10 h-10 mb-4 text-lg font-black rounded-full bg-primary text-on-primary font-headline">1</div>
      <h3 class="mb-3 text-xl font-black font-headline dark:text-background">Join Slack</h3>
      <p class="text-base font-bold font-body text-on-surface-variant dark:text-background/70">Head to <span class="text-primary">#wisp</span> on the Hack Club Slack. Sign up free at hackclub.com/slack if you're not already there.</p>
    </div>
    <div class="p-6 transition-all border-4 border-on-surface dark:border-background bg-surface-container-lowest dark:bg-dark-container hard-shadow hover-lift rounded-xl">
      <div class="flex items-center justify-center w-10 h-10 mb-4 text-lg font-black rounded-full bg-primary text-on-primary font-headline">2</div>
      <h3 class="mb-3 text-xl font-black font-headline dark:text-background">Post Your Ship</h3>
      <p class="text-base font-bold font-body text-on-surface-variant dark:text-background/70">Share your GitHub repo link with all requirements included. Weight photo must be in the message directly.</p>
    </div>
    <div class="p-6 transition-all border-4 border-on-surface bg-primary text-on-primary hard-shadow-primary hover-lift rounded-xl">
      <div class="flex items-center justify-center w-10 h-10 mb-4 text-lg font-black rounded-full bg-on-surface dark:bg-background text-surface dark:text-on-surface font-headline">3</div>
      <h3 class="mb-3 text-xl font-black font-headline">Submit Project</h3>
      <p class="text-base font-bold font-body">Submit your project to the submission form. Our review team will review each project manually.</p>
    </div>
    <div class="p-6 transition-all border-4 border-on-surface bg-primary text-on-primary hard-shadow-primary hover-lift rounded-xl">
      <div class="flex items-center justify-center w-10 h-10 mb-4 text-lg font-black rounded-full bg-on-surface dark:bg-background text-surface dark:text-on-surface font-headline">4</div>
      <h3 class="mb-3 text-xl font-black font-headline">Get Verified</h3>
      <p class="text-base font-bold font-body">A reviewer will check your submission and mark it approved. Once verified, your ship counts toward rewards and joins the gallery.</p>
    </div>
  </section>

  <!-- CTA -->
  <div class="space-y-4 text-center">
    <p class="text-lg font-bold font-body text-on-surface-variant dark:text-background/70">
      Got everything? Submit your project on the
      <a href="https://forms.hackclub.com" onclick={notOpenYet} target="_blank" class="px-1 underline transition-colors rounded text-primary decoration-4 underline-offset-4 hover:bg-primary hover:text-on-primary">Submission Form</a>.
    </p>
  </div>

</main>