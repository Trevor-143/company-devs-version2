<script>
    import { createEventDispatcher } from "svelte";

    export let dev;
    export let i;

    const dispatch = createEventDispatcher()

    const remove = () => {
        dispatch("remove", dev.id)
    }

    const currentDev = {
        id: dev.id,
        active: dev.active
    }

    const devAct = () => {
        // console.log('hey')
        dispatch("switch", currentDev)
    }

</script>

<div class="dev" style:background-color={ dev.active == true ? "#a9ffca" : "#ffbcbc" } >
    <p> {i+1} </p>
    <img src={dev.image} alt={dev.name}>
    <div class="devMiniInfo">
        <h3> {dev.name} </h3>
        <h4> {dev.email} </h4>
        <h4> {dev.position} </h4>
        <h4> Active: {dev.active} </h4>
    </div>
    <button on:click={devAct} class="act" > Activity </button>
    <button on:click={remove} > Delete </button>
</div>

<style>
    .dev {
        display: flex;
        align-items: center;
        justify-content: flex-start;
        background-color: #e0e0e0;
        padding: 1rem;
        border-radius: 1rem;
        border: #e0e0e0 solid 2px;
        transition: 0.5s;
        position: relative;
    }
    .dev p {
        position: absolute;
        top: 0;
        right: 0;
        margin-top: 10px;
        margin-right: 10px;
        background-color: #000070;
        color: #fff;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 0.5rem;
        font-weight: 700;
        padding: 0.2rem 0.5rem;
    }
    .dev:hover {
        background-color: rgba(224, 224, 224, 0);
    }
    .dev:hover button {
        opacity: 1;
    }
    .dev img {
        width: 40px;
        border-radius: 50%;
    }
    .dev .devMiniInfo {
        padding: 1rem;
        font-size: 0.8rem;   
    }
    .dev button {
        position: absolute;
        border: none;
        background-color: #b90000;
        color: #fff;
        border-radius: 0.5rem;
        padding: 0.5rem 1rem;
        bottom: 0;
        right: 0;
        margin-bottom: -10px;
        margin-right: 10px;
        transition: 0.4s;
        opacity: 0;
        cursor: pointer;
    }
    .dev .act {
        left: 0;
        margin-left: 10px;
        width: fit-content;
        background-color: #000070;
    }

    h4 {
        font-weight: 400;
        color: rgb(65, 65, 65);
    }
</style>