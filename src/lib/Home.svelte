<script>
    import { onMount } from "svelte";
    import active from "../assets/active.png"
    import pc from "../assets/pc.png"
    import { store } from "./firebase/firebaseConfig";
    import { collection, query, doc, onSnapshot } from "firebase/firestore";

    const fireData = collection(store, "developers")
    const dataQuery = query(fireData)

    let homeDevs = []
 

    onMount(() => {
        onSnapshot(dataQuery, (dataSnap) => {
            const devArray = []
            dataSnap.forEach(doc => {
                if( doc.data().active == true ) {
                    const dev = {
                        id: doc.id,
                        image: doc.data().image,
                        name: doc.data().name,
                        email: doc.data().email,
                        position: doc.data().position
                    }
                    devArray.push(dev)
                }
            });
            homeDevs = devArray;
        })
    })
    

    $: filteredHomeDevs = homeDevs


</script>

<main>
    <h1>Welcome Boss</h1>
    <p>This is your developers management system. Having all the developers in your company to controll, add, remove activate and deactivate. You can add positions depending on what you like...... Have fun and manage them well.</p>
    <h2> <img src={active} alt="active developers"> Your Active Developers</h2>
    <div class="homeDevs">
        {#each filteredHomeDevs as dev}
            <div class="oneDev" >
                <img src={dev.image} alt={dev.name}>
                <div class="devInfo">
                    <h3>{dev.name}</h3>
                    <h4>{dev.email}</h4>
                    <h4>{dev.position}</h4>
                </div>
            </div>
        {:else}
            <div class="noDevs">
                <img src={pc} alt="no devs">
                <h4>You have no active developers...</h4>
            </div>
        {/each}
    </div>
</main>

<style>
    main {
        min-height: 60vh;
    }
    main h1 {
        margin-top: 2rem;
        margin-bottom: 1rem;
        text-align: left;
    }
    p {
        font-size: 0.9rem;
    }
    h2 {
        font-size: 1rem;
        margin-top: 2rem;
        margin-bottom: 0.5rem;
        display: flex;
        align-items: center;
    }
    h2 img {
        width: 20px;
        margin: 0.5rem;
    }
    .homeDevs {
        display: grid;
        gap: 1rem;
        grid-template-columns: repeat(auto-fit, minmax(15rem, 1fr));
    }
    .oneDev {
        background-color: #a9ffca;
        border-radius: 1rem;
        display: flex;
        align-items: center;
        padding: 1rem;
    }
    .oneDev img {
        max-width: 40px;
        max-height: 40px;
        width: 100%;
        height: 100%;
        height: auto;
        margin-right: 1rem;
    }
    .devInfo {
        font-size: 0.8rem;
        text-align: left;
    }
    .devInfo h4 {
        font-weight: 400;
        margin-top: 0.2rem;
    }
    .noDevs {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        height: 60vh;
    }

    .noDevs img {
        width: 70px;
        margin: 5rem;
        transform: rotateZ(30deg);
    }

</style>