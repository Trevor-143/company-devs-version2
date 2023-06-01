<script>
    import { flip } from "svelte/animate";
    import PC from "../assets/pc.png"
    import NewDev from "./NewDev.svelte";
    import Dev from "./dev.svelte"
    import { store } from "./firebase/firebaseConfig"
    import { collection, query, onSnapshot, addDoc, deleteDoc, doc, updateDoc } from "firebase/firestore";
    import { onMount } from "svelte";
    

    let devs = []

    const firebaseData = collection(store, "developers")
    const devData = query(firebaseData)

    const imgRef = 'https://firebasestorage.googleapis.com/v0/b/compdevs-bd400.appspot.com/o/dev.png?alt=media&token=8c7816c8-af23-47fe-bb68-79ac94ba3f48'

    onMount(() => {
        onSnapshot( devData,(devSnap) => {
            const sampleDevs = []
            devSnap.forEach(doc => {
                const dev = {
                    id: doc.id,
                    name: doc.data().name,
                    email: doc.data().email,
                    image: doc.data().image,
                    position: doc.data().position,
                    active: doc.data().active
                }
                sampleDevs.push(dev)
            });
            devs = sampleDevs;
        })
    })

    const addDeveloper = ({detail}) => {
        addDoc(firebaseData, {
            id: devs.length+1,
            image: imgRef,
            ...detail
        })
    }

    const remove = ({detail}) => {
        deleteDoc(doc(firebaseData, detail))
    }

    const switching = ({detail}) => {
        const devDet = detail;
        const index = devs.findIndex(dev => dev.id === devDet.id)
        updateDoc(doc(firebaseData, devDet.id), {
            active: !devs[index].active
        })
    }

    $: filteredDevs = devs;
    
    const filter = (e) => {
        // console.log(e.target.value)
        if (e.target.value == "null") {
            return filteredDevs = devs
        } else {
            const selected = e.target.value == "true"
            filteredDevs = devs.filter((user) => user.active == selected)
        }
    }

</script>
    
<div class="devs">

    <h1>Company Developers</h1>

    <div class="top">
        <select name="devlist" on:change={filter}>
            <option value={null}> All Developers </option>
            <option value={true}> Active </option>
            <option value={false}> Inactive </option>
        </select>
        
        <NewDev on:addDev={addDeveloper}/>
    </div>

    <div class="devList">
    {#each filteredDevs as dev, i(dev.id) }
        <div animate:flip={{duration:500}} >
            <Dev {dev} {i} on:remove={remove} on:switch={switching} />
        </div>
    {:else}
        <div class="else">
            <img src={PC} alt="brocken pc">
            <h1>Hey, The company has no Developers at the moment.</h1>
        </div>
    {/each}  
    </div>

</div>
    
<style >
    .devs {
        margin: 2rem 0;
    }
    .devs h1 {
        margin-bottom: 1rem;
        font-size: 1rem;
        margin-left: 1rem;
    }

    .devList {
        display: grid;
        gap: 2rem;
        grid-template-columns: repeat(auto-fit, minmax(15rem, 1fr));
    }

    .else {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        height: 60vh;
    }
    .else img {
        width: 100px;
        margin: 2rem;
    }
    .else h1 {
        font-size: 0.9rem;
        color: rgb(41, 41, 41);
        text-align: center;
    }
    .top {
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        justify-content: space-between;
        margin: 1rem;
    }
    /* Style the select box */
    select {
        padding: 10px;
        border: none;
        padding: 0.5rem 1rem;
        border-radius: 0.5rem;
        outline: none;
        background-color: #e0e0e0;
    }
    select option {
        background: #000070;
        color: #fff;
    }
</style>