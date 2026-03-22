<script lang="ts">
    import { base } from '$app/paths';
    import { page } from '$app/state';

    const isActive = (path: string) => page.url.pathname === (base + path) || (path === '/' && (page.url.pathname === base + '/' || page.url.pathname === base));

    interface Creation {
        title: string;
        id: string;
        weight: string;
        material: string;
        maker: string;
        image: string;
    }

    const creations: Creation[] = [
        { title: 'Project 1', id: '#0001', weight: '0.82g', material: 'PLA',   maker: '@user_1', image: 'https://placehold.co/600x400/e8e8e4/2e2f2d?text=Project+1' },
        { title: 'Project 2', id: '#0002', weight: '1.15g', material: 'Resin', maker: '@user_2', image: 'https://placehold.co/600x400/e8e8e4/2e2f2d?text=Project+2' },
        { title: 'Project 3', id: '#0003', weight: '0.45g', material: 'TPU',   maker: '@user_3', image: 'https://placehold.co/600x400/e8e8e4/2e2f2d?text=Project+3' },
        { title: 'Project 4', id: '#0004', weight: '0.68g', material: 'Nylon', maker: '@user_4', image: 'https://placehold.co/600x400/e8e8e4/2e2f2d?text=Project+4' },
        { title: 'Project 5', id: '#0005', weight: '1.02g', material: 'PETG',  maker: '@user_5', image: 'https://placehold.co/600x400/e8e8e4/2e2f2d?text=Project+5' },
        { title: 'Project 6', id: '#0006', weight: '0.24g', material: 'ABS',   maker: '@user_6', image: 'https://placehold.co/600x400/e8e8e4/2e2f2d?text=Project+6' },
    ];
</script>

<svelte:head>
    <title>Gallery | LAST GRAMS</title>
</svelte:head>

<!-- Nav -->
<nav class="sticky top-0 z-50 flex justify-between items-center px-6 py-4 bg-background border-b-4 border-on-surface">
    <div class="text-2xl font-headline font-black uppercase italic tracking-tighter text-on-surface">
        LAST GRAMS
    </div>
    <div class="hidden md:flex gap-8 items-center">
        <a class="font-label font-bold uppercase text-sm {isActive('/') ? 'text-primary underline decoration-4 underline-offset-4' : 'text-on-background'} hover:translate-x-[2px] hover:translate-y-[2px] transition-all" href="{base}/">Home</a>
        <a class="font-label font-bold uppercase text-sm {isActive('/gallery') ? 'text-primary underline decoration-4 underline-offset-4' : 'text-on-background'} hover:translate-x-[2px] hover:translate-y-[2px] transition-all" href="{base}/gallery">Gallery</a>
    </div>
    <a class="bg-primary text-on-primary border-4 border-on-surface px-6 py-2 font-headline font-black uppercase tracking-tighter hard-shadow active-press hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none transition-all" href="{base}/submission">Submit</a>
</nav>

<main class="max-w-7xl mx-auto px-4 py-12 space-y-24">

    <!-- Header -->
    <header class="mb-16 relative">
        <div class="border-4 border-on-surface p-8 md:p-12 bg-surface-container-lowest relative z-10 hard-shadow">
            <div class="flex flex-col md:flex-row justify-between items-end gap-6">
                <div>
                    <h1 class="font-headline font-black text-6xl md:text-8xl uppercase tracking-tighter leading-none mb-4">
                        COMMUNITY<br/>ORIGINAL CREATIONS
                    </h1>
                    <p class="font-body text-xl max-w-xl text-on-surface-variant font-medium">
                        A showcase of unique models designed by the community to rescue the last grams of their spools.
                    </p>
                </div>
                <div class="flex gap-4">
                    <div class="border-4 border-on-surface p-4 bg-primary-container hard-shadow">
                        <span class="font-label font-bold uppercase block text-xs">Total Ships</span>
                        <span class="font-headline font-black text-4xl italic">142</span>
                    </div>
                    <div class="border-4 border-on-surface p-4 bg-surface-container-lowest hard-shadow">
                        <span class="font-label font-bold uppercase block text-xs">Record Min</span>
                        <span class="font-headline font-black text-4xl italic text-primary">4g</span>
                    </div>
                </div>
            </div>
        </div>
        <div class="absolute -top-4 -left-4 w-full h-full border-4 border-primary -z-10 opacity-20"></div>
    </header>

    <!-- Gallery Grid -->
    <section class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-24">
        {#each creations as item}
            <div class="group border-4 border-on-surface bg-surface-container-lowest transition-all hover:-translate-y-2 hover:scale-[1.02] card-glow overflow-hidden">
                <div class="h-64 border-b-4 border-on-surface bg-surface-variant">
                    <img class="w-full h-full object-cover" alt={item.title} src={item.image}/>
                </div>
                <div class="p-6">
                    <div class="flex justify-between items-start mb-4">
                        <h3 class="font-headline font-black text-2xl uppercase leading-tight text-on-surface">
                            {item.title}
                        </h3>
                        <span class="font-label text-xs border-2 border-on-surface px-2 py-1 text-on-surface shrink-0">ID: {item.id}</span>
                    </div>
                    <div class="mb-6">
                        <span class="font-label text-xs uppercase text-on-surface-variant block mb-1">Printed Weight</span>
                        <div class="font-headline font-black text-7xl text-primary leading-none tracking-tighter">{item.weight}</div>
                    </div>
                    <div class="grid grid-cols-2 gap-4 border-t-2 border-on-surface pt-4">
                        <div>
                            <span class="font-label text-xs uppercase font-bold text-on-surface-variant">Material</span>
                            <p class="font-body text-base font-black text-on-surface">{item.material}</p>
                        </div>
                        <div>
                            <span class="font-label text-xs uppercase font-bold text-on-surface-variant">Maker</span>
                            <p class="font-body text-base font-black text-on-surface">{item.maker}</p>
                        </div>
                    </div>
                </div>
            </div>
        {/each}
    </section>

    <!-- CTA -->
    <section class="border-8 border-on-surface p-12 bg-primary-container relative hard-shadow-primary overflow-hidden">
        <div class="absolute top-0 right-0 w-32 h-32 bg-primary opacity-20 -rotate-45 translate-x-16 -translate-y-16"></div>
        <div class="absolute -top-6 left-12 bg-on-surface text-surface px-6 py-2 font-headline font-black uppercase italic tracking-tighter shadow-lg">
            Design Hub
        </div>
        <div class="flex flex-col md:flex-row items-center justify-between gap-12 relative z-10">
            <div class="max-w-2xl text-center md:text-left">
                <h2 class="font-headline font-black text-4xl md:text-6xl uppercase tracking-tighter leading-none mb-4 text-on-primary-container">
                    SMALL PRINTS.<br/>BIG REWARDS.
                </h2>
                <p class="font-body text-xl font-bold text-on-primary-container mb-8">
                    Got an idea for a design that could save the last grams on your spool?
                </p>
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
                    <div class="bg-surface-container-lowest border-4 border-on-surface p-4 hard-shadow">
                        <div class="font-headline font-black text-2xl text-primary uppercase mb-1">1 SHIP</div>
                        <div class="font-label font-bold uppercase text-xs text-on-surface-variant">Official Stickers</div>
                    </div>
                    <div class="bg-surface-container-lowest border-4 border-on-surface p-4 hard-shadow">
                        <div class="font-headline font-black text-2xl text-primary uppercase mb-1">3 SHIPS</div>
                        <div class="font-label font-bold uppercase text-xs text-on-surface-variant">Hack Club Filament</div>
                    </div>
                </div>
            </div>
            <div class="flex flex-col gap-4 shrink-0">
                <a href="https://forms.hackclub.com" class="bg-on-surface text-surface px-10 py-6 font-headline font-black text-2xl uppercase tracking-tighter border-4 border-on-surface hover:translate-x-1 hover:translate-y-1 hover:bg-primary transition-all active:translate-x-2 active:translate-y-2 hard-shadow inline-block text-center">
                    SUBMIT YOUR BUILD
                </a>
                <a class="font-label font-bold uppercase text-sm text-center text-on-primary-container underline decoration-2 underline-offset-4" href="{base}/submission">View Guidelines</a>
            </div>
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