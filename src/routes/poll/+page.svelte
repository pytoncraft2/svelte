<script>
    import { getEvenement } from "../../lib/utils";
    import Trajet from "./Trajet.svelte";
    import { onMount } from "svelte";
    import {browser} from "$app/environment";
    import { page } from '$app/stores'
    let valeurRecherge = [];
    let donnes;

    onMount(async () => {
    let urlPartage = $page.url.searchParams.get('url');
    const searchParams = browser && $page.url.searchParams
    
    if (searchParams && searchParams.get("url")) console.log("myParam is: ",urlPartage)

        donnes = await getEvenement(urlPartage);
        chercherParticipant()
    });

    function chercherParticipant(e = '') {
        const r = donnes.voitureAller.map((v) =>
            v.passagers.filter((a) =>
                a.name.toLowerCase().includes(e.target?.value || '')
            )
        );
        valeurRecherge = r[0].concat(r[1]);
    }
</script>

<h1>MON EVENT</h1>

<div class="bordure">
    <div>
        {#if donnes}
            <h1>{donnes.evenement.titre}</h1>
            <p>{donnes.evenement.description}</p>
            <input
                type="text"
                placeholder="rechercher un participant"
                on:keyup={chercherParticipant}
            />
            {#each valeurRecherge as participant, i}
                <p>- {participant.name}</p>
            {/each}
            <hr />

            <div class="bloc-trajets">
                <Trajet
                    titre="Trajet aller"
                    bind:infoVoiture={donnes.voitureAller}
                />
                <Trajet
                    titre="Trajet retour"
                    bind:infoVoiture={donnes.voitureRetour}
                />
            </div>
        {/if}
    </div>

    <div />
</div>

<style>
    .bordure {
        border: 1px solid black;
    }
    .bloc-trajets {
        display: flex;
    }
</style>
