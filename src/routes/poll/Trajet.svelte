<script>
    export let titre;
    export let infoVoiture;

    let ouvrirModalAjoutVoiture = false;
    let ouvrirModalAjoutPassager = true;

    function ajoutVoiture(e) {
        const data = donnesForm(e);
        infoVoiture.push({
            carType: "TODO",
            placesDisponibles: data["placesDisponibles"],
            conducteur: {
                name: data['nomPrenom'],
                email: data['precision'],
            },
            passagers: [],
        });
        infoVoiture = infoVoiture;
        ouvrirModalAjoutVoiture = false;
    }

    function ajoutPassager(e, index) {
        const data = donnesForm(e);

        infoVoiture[index].passagers.push({
            name: data["nomPrenom"],
            email: data["precision"],
        });
        infoVoiture = infoVoiture;
    }

    function supprimerPassager(indexInfo, indexPassager) {
        console.log(infoVoiture[indexInfo].passagers);
        infoVoiture[indexInfo].passagers.splice(indexPassager, 1);
        infoVoiture = infoVoiture;
    }

    function miseAJourConducteur(e, indexInfo) {
        const data = donnesForm(e);
        infoVoiture[indexInfo].conducteur.name = data['nomPrenom']
        infoVoiture[indexInfo].conducteur.email = data['precision']
        infoVoiture = infoVoiture;
        
    }

    function ouvrirModaleAjoutConducteur() {
        ouvrirModalAjoutVoiture = true;
    }

    function donnesForm(e) {
        const formData = new FormData(e.target);

        const data = {};
        for (let field of formData) {
            const [key, value] = field;
            data[key] = value;
        }
        return data;
    }
</script>

<div class="trajet-bordure">
    <h2>{titre}</h2>

    {#each infoVoiture as voiture, indexInfo}
        <div style="border: 2px solid blue; display: flex; gap: 1em">
            <img
                width="50"
                height="50"
                src="https://img.icons8.com/ios/50/car--v1.png"
                alt="car--v1"
            />
            <form on:submit|preventDefault={(e) => miseAJourConducteur(e, indexInfo)} >
                <div>
                    <input
                        type="text"
                        value={voiture.conducteur.name}
                        name="nomPrenom"
                        placeholder="nom du conducteur"
                    />
                    <input
                        type="text"
                        name="precision"
                        value={voiture.conducteur.email}
                        placeholder="precision"
                    />
                    <input
                        type="text"
                        bind:value={voiture.placesDisponibles}
                        name="placesDisponibles"
                        placeholder="places disponibles"
                    />
                </div>
                <input type="submit" value="valider" />

                {#each voiture.passagers as passager, indexPassager}
                    <p>
                        <img
                            width="50"
                            height="50"
                            src="https://img.icons8.com/ios/50/user--v1.png"
                            alt="user--v1"
                        />
                        <input type="text" value={passager.name} />
                        <input type="text" value={passager.email} />
                        <button
                            style="width: min-content;"
                            on:click={() =>
                                supprimerPassager(indexInfo, indexPassager)}
                            ><img
                                width="48"
                                height="48"
                                src="https://img.icons8.com/fluency/48/delete-forever.png"
                                alt="delete-forever"
                            /></button
                        >
                    </p>
                {/each}

                <strong>Ajouter passagers dans cette voiture</strong>
                <i>({voiture.placesDisponibles - voiture.passagers.length}) places restantes</i>
                {#if ouvrirModalAjoutPassager}
                    <form
                        on:submit|preventDefault={(e) =>
                            ajoutPassager(e, indexInfo)}
                    >
                        <input
                            type="text"
                            placeholder="Nom, Prenom"
                            name="nomPrenom"
                        />
                        <input
                            type="text"
                            placeholder="Prescisions"
                            name="precision"
                        />
                        <input type="submit" value="Ajouter"/>
                    </form>
                {/if}
            </form>
        </div>
    {/each}

    <button on:click={ouvrirModaleAjoutConducteur}>Ajouter une voiture</button>
    {#if ouvrirModalAjoutVoiture}
        <img
            width="80"
            height="80"
            src="https://img.icons8.com/dotty/80/driver.png"
            alt="driver"
        />
        <form on:submit|preventDefault={(e) => ajoutVoiture(e)}>
            <input type="text" placeholder="Nom, Prenom" name="nomPrenom" />
            <input
                type="text"
                placeholder="Nombre de place"
                name="placesDisponibles"
            />
            <input type="text" placeholder="Prescisions" name="precision" />
            <input type="submit" value="Ajouter" />
        </form>
    {/if}
</div>

<style>
    .trajet-bordure {
        flex: 1;
        border: 2px solid;
    }

    button {
        width: 100%;
    }
</style>
