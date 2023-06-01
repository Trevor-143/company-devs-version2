<script>
    import { createEventDispatcher } from "svelte";

    const dispatch = createEventDispatcher()

    const close = () => {
        dispatch("close")
    }
    const onSubmit = () => {
        dispatch('submit')
    }

</script>

<div class="addForm" >
    <form on:submit|preventDefault={onSubmit} >
        <slot />
        <div class="btns">
            <button  >Add Developer</button>
            <button on:click={close} >Close</button>
        </div>
    </form>
</div>

<style>
    .addForm {
        position: fixed;
        bottom: 0;
        right: 0;
        z-index: 10;
        margin-right: 5%;
        margin-bottom: 5%;
        box-shadow: 0px 0px 157px -62px rgba(0,0,0,0.75);
        -webkit-box-shadow: 0px 0px 157px -62px rgba(0,0,0,0.75);
        -moz-box-shadow: 0px 0px 157px -62px rgba(0,0,0,0.75);
        padding: 1rem;
        border-radius: 1rem;
        background-color: #fff;
    }
    .addForm form {
        background-color: #fff;
        display: flex;
        flex-direction: column;
    }
    .btns {
        margin-top: 2rem;
        display: flex;
        align-items: center;
        justify-content: space-between;
    }
    .btns button {
        padding: 0.5rem 1rem;
        border: none;
        background-color: #000070;
        color: #fff;
        border-radius: 0.5rem;
        cursor: pointer;
    }
    button:nth-child(2) {
        background-color: rgb(187, 0, 0);
    }
</style>