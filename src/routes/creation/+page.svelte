<script>
    import Input from "../../lib/input/Input.svelte";
    import generateString from '../../lib/utils'
    let listePersonnes = [];
    let nomPersonne = "";
    let evenementCree = false;

    function ajouterPersonne() {
        listePersonnes = [nomPersonne, ...listePersonnes];
        listePersonnes = listePersonnes;
        nomPersonne = "";
    }

    function enleverPersonne(index) {
        listePersonnes.splice(index, 1);
        listePersonnes = listePersonnes;
    }

    function handleEnter(e) {
        if (e.key === "Enter") {
            e.preventDefault();
            ajouterPersonne();
        }
    }

    function onSubmit(e) {
        const formData = new FormData(e.target);

        const data = {};
        for (let field of formData) {
            const [key, value] = field;
            data[key] = value;
        }
        data["listePersonnePresente"] = listePersonnes;
        console.log(data);
        evenementCree = true;
    }
</script>

{#if !evenementCree}
<form on:submit|preventDefault={onSubmit}>
    <input placeholder="Titre de l'évenement" name="titreEvenement" />

    <h4>Lieu de l'évenement</h4>
    <input
        placeholder="Commune/CP ou adresse précise pour géolocalisation - saisir puis sélectionner dans la liste déroulante"
        name="lieu_evenement"
    />
    <input
        placeholder="Si besoin, nom explicite ( ex: Stade Coubertin, Maison diocésaine..)"
        name="lieu_evenement_info"
    />

    <h4>
        Lieu de départ / retour : (laisser vide si plusieurs villes de départ /
        retour)
    </h4>
    <input
        placeholder="Commune/CP ou adresse précise pour géolocalisation - saisir puis sélectionner dans la liste déroulante"
        name="lieu_depart_retour"
    />
    <input
        placeholder="Si besoin, nom explicite ( ex: Local scout, parking Eglise Saint-Martin..)"
        name="lieu_depart_retour_info"
    />

    <h4>Gestion des trajets</h4>
    <select name="trajets">
        <option value="aller_retour" selected>Aller et Retour</option>
        <option value="aller">Aller uniquement</option>
        <option value="retour">Retour uniquement</option>
    </select>

    <textarea name="description" cols="30" rows="10" />

    <label for="photo">Ajouter Photo</label>
    <input type="file" name="avatar" accept="image/png, image/jpeg" />

    <h4>Organisateur</h4>

    <Input placeholder="Votre Nom, Prénom" />
    <Input type="email" placeholder="Votre E-mail" />

    <h4>Personnes présentes</h4>
    <input
        type="text"
        placeholder="Ajouter une personne"
        bind:value={nomPersonne}
        on:keydown={handleEnter}
    />

    {#each listePersonnes as personne, i}
        <input type="text" value={personne} />
        <button type="button" on:click={() => enleverPersonne(i)}
            >Enlever</button
        >
    {/each}

    <button type="submit">GO</button>
</form>

{:else}
<h1>EVENENT BIEN CREER</h1>    
<p>Parager le lien: <a href='/poll?url={generateString(5)}'>http://monsite.com/{generateString(5)}</a> </p>
{/if}

<h1>Créer</h1>

<style>
    form {
        display: flex;
        justify-content: center;
        flex-direction: column;
        width: 50%;
    }
</style>
