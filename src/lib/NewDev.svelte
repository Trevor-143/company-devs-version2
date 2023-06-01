<script>
    import { createEventDispatcher } from "svelte";
    import Model from "./Model.svelte";
    import Active from "../assets/active.png"
    import Inactive from "../assets/inactive.png"
    
    const dispatch = createEventDispatcher()

    let showModel = false

    let newDev = {}
    
    const handleForm = (e) => {
        // console.log(e)
        console.log(newDev)
        dispatch("addDev", newDev)
    }

</script>
<div class="additio">
    <button on:click={() => (showModel = !showModel)}>Add Developer</button>
    {#if showModel}
        <Model
            on:close={() => (showModel = false)}
            on:submit={handleForm} > 
            <input type="text" placeholder="name" bind:value={newDev.name}>
            <input type="email" placeholder="email" bind:value={newDev.email}>
            <input type="text" placeholder="position" bind:value={newDev.position}>
            <div class="radios">
                <h3>active ?</h3>
                <div class="radioBtns">
                    <div><img src={Active} alt="active" > <input type="radio" name="active" value={true} bind:group={newDev.active} ></div>
                    <div><img src={Inactive} alt="inactive" > <input type="radio" name="active" value={false} bind:group={newDev.active} ></div>
                </div>
            </div>
        </Model>
    {/if}
</div>

<style>
    /* * {
        outline: 1px red solid;
    } */
    button {
        border: none;
        background-color: #000070;
        padding: 0.5rem 1rem;
        border-radius: 0.5rem;
        color: #fff;
        cursor: pointer;
    }

    input {
        background-color: #e0e0e0;
        border: none;
        padding: 0.5rem 1rem;
        border-radius: 0.5rem;
        outline: 1rem;
        margin-bottom: 1rem;
    }
    .radios {
        display: flex;
        justify-content: space-between;
        align-items: center;
        color: #fff;
        background-color: #000070;
        padding: 0.5rem 1rem;
        border-radius: 0.5rem;
    }
    .radios h3 {
        font-size: 0.9rem;
    }
    .radioBtns {
        background-color: #ffffff;
        border-radius: 0.5rem;
        padding: 0.5rem;
        color: #000070;
        display: flex;
        align-items: center;
        /* flex-direction: column; */
    }
    .radioBtns div {
        display: flex;
        align-items: center;
        margin-right: 0.5rem;
    }

    .radioBtns img {
        width: 20px;
        margin-right: 0.5rem;
    }
    .radioBtns input {
        cursor: pointer;
        margin: auto;
    }
</style>