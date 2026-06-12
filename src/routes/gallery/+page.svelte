<script lang="ts">
    import { base } from '$app/paths';
    import { tilt } from '$lib';
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
        { title: 'Itty Bitty Fidget',       id: '#205599', weight: '12.0g', material: 'PLA',  maker: '@3DPrinty',         image: 'https://storage.googleapis.com/production-thangs-public/uploads/attachments/f43800bd-7954-4926-9f80-a20f142ce988/square-thumbnail-1.jpg' },
        { title: 'Reusable Flossholder',    id: '#205005', weight: '4.00g',  material: 'PETG', maker: '@Saccy',            image: 'https://media.printables.com/media/prints/205005/images/1884641_904530a3-fabc-495b-8687-226b9b4389de/thumbs/inside/1600x1200/jpg/280533793_1934515593604035_2533210206350668186_n.webp' },
    ];
</script>

<svelte:head>
    <title>Gallery | LAST GRAMS</title>
</svelte:head>

<main class="max-w-7xl mx-auto px-4 py-12 space-y-24">

    <!-- Header -->
    <header class="mb-16 relative">
        <div class="border-4 border-on-surface dark:border-background p-8 md:p-12 bg-surface-container-lowest dark:bg-dark-container relative z-10 hard-shadow rounded-2xl">
            <div class="flex flex-col md:flex-row justify-between items-end gap-6">
                <div>
                    <h1 class="font-headline font-black text-6xl md:text-8xl tracking-tighter leading-none mb-4 dark:text-background">
                        Community<br/>Creations
                    </h1>
                    <p class="font-body text-xl max-w-xl text-on-surface-variant dark:text-background/70 font-medium">
                        A showcase of tiny projects designed and built by the community.
                    </p>
                </div>
                <div class="flex gap-4">
                    <div class="border-4 border-on-surface dark:border-background p-4 bg-primary-container dark:bg-dark-container hard-shadow rounded-xl">
                        <span class="font-label font-bold uppercase block text-xs dark:text-background/70">Ships</span>
                        <span class="font-headline font-black text-4xl italic dark:text-background">142</span>
                    </div>
                    <div class="border-4 border-on-surface dark:border-background p-4 bg-surface-container-lowest dark:bg-dark-container hard-shadow rounded-xl">
                        <span class="font-label font-bold uppercase block text-xs dark:text-background/70">Lightest</span>
                        <span class="font-headline font-black text-4xl italic text-primary">4g</span>
                    </div>
                </div>
            </div>
        </div>
        <div class="absolute -top-4 -left-4 w-full h-full border-4 border-primary -z-10 opacity-20 rounded-2xl"></div>
    </header>

    <!-- Gallery Grid -->
    <section class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-24">
        {#each creations as item}
            <div use:tilt class="group border-4 border-on-surface dark:border-background bg-surface-container-lowest dark:bg-dark-container transition-all hover:-translate-y-2 hover:scale-[1.02] card-glow overflow-hidden rounded-xl">
                <div class="h-64 border-b-4 border-on-surface dark:border-background bg-surface-variant dark:bg-dark-container-high">
                    <img class="w-full h-full object-cover" alt={item.title} src={item.image}/>
                </div>
                <div class="p-6">
                    <div class="flex justify-between items-start mb-4">
                        <h3 class="font-headline font-black text-2xl leading-tight text-on-surface dark:text-background">
                            {item.title}
                        </h3>
                        <span class="font-label text-xs border-2 border-on-surface dark:border-background px-2 py-1 text-on-surface dark:text-background shrink-0 rounded-full">ID: {item.id}</span>
                    </div>
                    <div class="mb-6">
                        <span class="font-label text-xs uppercase text-on-surface-variant dark:text-background/70 block mb-1">Printed Weight</span>
                        <div class="font-headline font-black text-7xl text-primary leading-none tracking-tighter">{item.weight}</div>
                    </div>
                    <div class="grid grid-cols-2 gap-4 border-t-2 border-on-surface dark:border-background pt-4">
                        <div>
                            <span class="font-label text-xs uppercase font-bold text-on-surface-variant dark:text-background/70">Material</span>
                            <p class="font-body text-base font-black text-on-surface dark:text-background">{item.material}</p>
                        </div>
                        <div>
                            <span class="font-label text-xs uppercase font-bold text-on-surface-variant dark:text-background/70">Maker</span>
                            <p class="font-body text-base font-black text-on-surface dark:text-background">{item.maker}</p>
                        </div>
                    </div>
                </div>
            </div>
        {/each}
    </section>

    <!-- CTA -->
    <section class="border-8 border-on-surface dark:border-background p-12 bg-primary-container dark:bg-on-primary-container relative hard-shadow-primary overflow-hidden rounded-2xl">
        <div class="absolute top-0 right-0 w-32 h-32 bg-primary opacity-20 -rotate-45 translate-x-16 -translate-y-16"></div>
        <div class="absolute -top-6 left-12 bg-on-surface text-surface px-6 py-2 font-headline font-black italic tracking-tighter shadow-lg rounded-full">
            Design Hub
        </div>
        <div class="flex flex-col md:flex-row items-center justify-between gap-12 relative z-10">
            <div class="max-w-2xl text-center md:text-left">
                <h2 class="font-headline font-black text-4xl md:text-6xl tracking-tighter leading-none mb-4 text-on-primary-container dark:text-background">
                    Small Builds,<br/>Big Rewards
                </h2>
                <p class="font-body text-xl font-bold text-on-primary-container dark:text-background mb-8">
                    Have an idea for a tiny project? We'd love to see what you come up with.
                </p>
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
                    <div class="bg-surface-container-lowest dark:bg-dark-container border-4 border-on-surface dark:border-background p-4 hard-shadow rounded-xl">
                        <div class="font-headline font-black text-2xl text-primary mb-1">1 Ship</div>
                        <div class="font-label font-bold uppercase text-xs text-on-surface-variant">Official Stickers</div>
                    </div>
                    <div class="bg-surface-container-lowest dark:bg-dark-container border-4 border-on-surface dark:border-background p-4 hard-shadow rounded-xl">
                        <div class="font-headline font-black text-2xl text-primary mb-1">3 Ships</div>
                        <div class="font-label font-bold uppercase text-xs text-on-surface-variant">Hack Club Filament</div>
                    </div>
                </div>
            </div>
            <div class="flex flex-col gap-4 shrink-0">
                <a href="https://forms.hackclub.com" class="bg-on-surface text-surface px-10 py-6 font-headline font-black text-2xl tracking-tighter border-4 border-on-surface dark:border-background hover:translate-x-1 hover:translate-y-1 hover:bg-primary transition-all active:translate-x-2 active:translate-y-2 hard-shadow inline-block text-center rounded-xl">
                    Share Your Project
                </a>
                <a class="font-label font-bold text-sm text-center text-on-primary-container dark:text-background underline decoration-2 underline-offset-4" href="{base}/submission">View Guidelines</a>
            </div>
        </div>
    </section>

</main>