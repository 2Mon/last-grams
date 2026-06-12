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
        { title: 'Your Color Change Buddy', id: '#204388', weight: '3.00g',  material: 'PLA',  maker: '@Clement',          image: 'https://media.printables.com/media/prints/204388/images/1886602_65b50415-f71b-4420-88d8-20ee4afd71ad/thumbs/inside/1600x1200/jpg/color-change-buddy4.webp' },
        { title: 'Cable Labels',            id: '#207466', weight: '1.00g',  material: 'PLA',  maker: '@FishboneWorkshop', image: 'https://media.printables.com/media/prints/207466/images/1907670_0741c15a-73a4-404d-8d11-b953692b5bdf/thumbs/inside/1600x1200/png/zawieszkanakable.webp' },
        { title: 'Cyclo Valve Cover',       id: '#208673', weight: '1.00g',  material: 'PLA',  maker: '@ThorinOakenshield',image: 'https://media.printables.com/media/prints/208673/images/1916044_8f1cf666-a118-4a49-b79e-9e2408b1ecac/thumbs/inside/1600x1200/jpg/dscn1037.webp' },
        { title: 'Book-Style SD Card Case', id: '#210458', weight: '8.00g',  material: 'PETG', maker: '@XavierFaraudo',    image: 'https://media.printables.com/media/prints/210458/images/1936578_3da808f8-3072-4946-88c6-efbc3e89be7d/thumbs/inside/1600x1200/jpg/1-portada-amb-marques.webp' },
        { title: 'Itty Bitty Fidget',       id: '#205599', weight: '12.0g',  material: 'PLA',  maker: '@3DPrinty',         image: 'https://storage.googleapis.com/production-thangs-public/uploads/attachments/f43800bd-7954-4926-9f80-a20f142ce988/square-thumbnail-1.jpg' },
        { title: 'Reusable Flossholder',    id: '#205005', weight: '4.00g',  material: 'PETG', maker: '@Saccy',            image: 'https://media.printables.com/media/prints/205005/images/1884641_904530a3-fabc-495b-8687-226b9b4389de/thumbs/inside/1600x1200/jpg/280533793_1934515593604035_2533210206350668186_n.webp' },
    ];
</script>

<svelte:head>
    <title>Gallery | LAST GRAMS</title>
</svelte:head>

<!-- Nav -->
<nav class="sticky top-0 z-50 flex items-center justify-between px-6 py-4 border-b-4 bg-background border-on-surface">
    <a href="{base}/" class="text-2xl italic font-black tracking-tighter uppercase font-headline text-on-surface">
        LAST GRAMS
    </a>
    <div class="items-center hidden gap-8 md:flex">
        <a class="font-label font-bold uppercase text-sm {isActive('/') ? 'text-primary underline decoration-4 underline-offset-4' : 'text-on-background'} hover:translate-x-[2px] hover:translate-y-[2px] transition-all" href="{base}/">Home</a>
        <a class="font-label font-bold uppercase text-sm {isActive('/gallery') ? 'text-primary underline decoration-4 underline-offset-4' : 'text-on-background'} hover:translate-x-[2px] hover:translate-y-[2px] transition-all" href="{base}/gallery">Gallery</a>
    </div>
    <a class="bg-primary text-on-primary border-4 border-on-surface px-6 py-2 font-headline font-black uppercase tracking-tighter hard-shadow active-press hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none transition-all" href="{base}/submission">Submit</a>
</nav>

<main class="px-4 py-12 mx-auto space-y-24 max-w-7xl">

    <!-- Header -->
    <header class="relative mb-16">
        <div class="relative z-10 p-8 border-4 border-on-surface md:p-12 bg-surface-container-lowest hard-shadow">
            <div class="flex flex-col items-end justify-between gap-6 md:flex-row">
                <div>
                    <h1 class="mb-4 text-6xl font-black leading-none tracking-tighter uppercase font-headline md:text-8xl">
                        COMMUNITY<br/>CREATIONS
                    </h1>
                    <p class="max-w-xl text-xl font-medium font-body text-on-surface-variant">
                        A showcase of tiny projects designed and built by the community.
                    </p>
                </div>
                <div class="flex gap-4">
                    <div class="p-4 border-4 border-on-surface bg-primary-container hard-shadow">
                        <span class="block text-xs font-bold uppercase font-label">Ships</span>
                        <span class="text-4xl italic font-black font-headline">142</span>
                    </div>
                    <div class="p-4 border-4 border-on-surface bg-surface-container-lowest hard-shadow">
                        <span class="block text-xs font-bold uppercase font-label">Lightest</span>
                        <span class="text-4xl italic font-black font-headline text-primary">4g</span>
                    </div>
                </div>
            </div>
        </div>
        <div class="absolute w-full h-full border-4 -top-4 -left-4 border-primary -z-10 opacity-20"></div>
    </header>

    <!-- Gallery Grid -->
    <section class="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
        {#each creations as item}
            <div class="group border-4 border-on-surface bg-surface-container-lowest transition-all hover:-translate-y-2 hover:scale-[1.02] card-glow overflow-hidden">
                <div class="h-64 border-b-4 border-on-surface bg-surface-variant">
                    <img class="object-cover w-full h-full" alt={item.title} src={item.image} loading="lazy"/>
                </div>
                <div class="p-6">
                    <div class="flex items-start justify-between mb-4">
                        <h3 class="text-2xl font-black leading-tight uppercase font-headline text-on-surface">
                            {item.title}
                        </h3>
                        <span class="px-2 py-1 text-xs border-2 font-label border-on-surface text-on-surface shrink-0">ID: {item.id}</span>
                    </div>
                    <div class="mb-6">
                        <span class="block mb-1 text-xs uppercase font-label text-on-surface-variant">Printed Weight</span>
                        <div class="font-black leading-none tracking-tighter font-headline text-5xl md:text-7xl text-primary">{item.weight}</div>
                    </div>
                    <div class="grid grid-cols-2 gap-4 pt-4 border-t-2 border-on-surface">
                        <div>
                            <span class="text-xs font-bold uppercase font-label text-on-surface-variant">Material</span>
                            <p class="text-base font-black font-body text-on-surface">{item.material}</p>
                        </div>
                        <div>
                            <span class="text-xs font-bold uppercase font-label text-on-surface-variant">Maker</span>
                            <p class="text-base font-black font-body text-on-surface">{item.maker}</p>
                        </div>
                    </div>
                </div>
            </div>
        {/each}
    </section>

    <!-- CTA -->
    <section class="relative p-12 overflow-hidden border-8 border-on-surface bg-primary-container hard-shadow-primary">
        <div class="absolute top-0 right-0 w-32 h-32 -rotate-45 translate-x-16 -translate-y-16 bg-primary opacity-20"></div>
        <div class="absolute px-6 py-2 italic font-black tracking-tighter uppercase shadow-lg -top-6 left-12 bg-on-surface text-surface font-headline">
            Design Hub
        </div>
        <div class="relative z-10 flex flex-col items-center justify-between gap-12 md:flex-row">
            <div class="max-w-2xl text-center md:text-left">
                <h2 class="mb-4 text-4xl font-black leading-none tracking-tighter uppercase font-headline md:text-6xl text-on-primary-container">
                    SMALL BUILDS,<br/>BIG REWARDS
                </h2>
                <p class="mb-8 text-xl font-bold font-body text-on-primary-container">
                    Have an idea for a tiny project? We'd love to see what you come up with.
                </p>
                <div class="grid grid-cols-1 gap-6 mb-8 sm:grid-cols-2">
                    <div class="p-4 border-4 bg-surface-container-lowest border-on-surface hard-shadow">
                        <div class="mb-1 text-2xl font-black uppercase font-headline text-primary">1 SHIP</div>
                        <div class="text-xs font-bold uppercase font-label text-on-surface-variant">Official Stickers</div>
                    </div>
                    <div class="p-4 border-4 bg-surface-container-lowest border-on-surface hard-shadow">
                        <div class="mb-1 text-2xl font-black uppercase font-headline text-primary">3 SHIPS</div>
                        <div class="text-xs font-bold uppercase font-label text-on-surface-variant">Hack Club Filament</div>
                    </div>
                </div>
            </div>
            <div class="flex flex-col gap-4 shrink-0">
                <a href="https://forms.hackclub.com" class="inline-block px-10 py-6 text-2xl font-black tracking-tighter text-center uppercase transition-all border-4 bg-on-surface text-surface font-headline border-on-surface hover:translate-x-1 hover:translate-y-1 hover:bg-primary active:translate-x-2 active:translate-y-2 hard-shadow">
                    SHARE YOUR PROJECT
                </a>
                <a class="text-sm font-bold text-center underline uppercase font-label text-on-primary-container decoration-2 underline-offset-4" href="{base}/submission">View Guidelines</a>
            </div>
        </div>
    </section>

</main>

<!-- Footer -->
<footer class="grid items-center w-full grid-cols-1 gap-4 p-8 text-center border-t-4 md:grid-cols-2 bg-primary dark:bg-secondary border-on-surface dark:border-background">
  <div class="flex items-center justify-center h-full text-sm font-bold uppercase border-r-4 font-label text-on-primary border-on-surface dark:border-background last:border-r-0">
    Built by 1Mon for Hack Club 2026
  </div>
  <div class="flex items-center justify-center h-full gap-6 md:border-r-4 border-on-surface dark:border-background last:border-r-0">
    <a class="p-2 text-sm font-bold uppercase transition-colors font-label text-on-primary hover:bg-on-surface dark:hover:bg-background" href="https://github.com/2Mon/last-grams" target="_blank" rel="noopener noreferrer">GitHub</a>
    <a class="p-2 text-sm font-bold uppercase transition-colors font-label text-on-primary hover:bg-on-surface dark:hover:bg-background" href="https://hackclub.com" target="_blank" rel="noopener noreferrer">Hack Club HQ</a>
  </div>
</footer>