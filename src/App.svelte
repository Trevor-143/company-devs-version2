<script>
  import Devs from "./lib/Devs.svelte";
  import { Router, Route, Link } from "svelte-navigator"
  import Home from "./lib/Home.svelte";
  import Company from "./assets/company.png"
  import Boss from "./assets/gamer.png"
  import { app } from "./lib/firebase/firebaseConfig"
  import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth" 


  let user = {}


  const auth = getAuth()
  let userIn = false

  const signUp = () => {
    createUserWithEmailAndPassword(auth, user.email, user.password)
    .then((res) => {
      console.log("done Signing up")
      console.log(res.user)
    })
  }
  const signIn = () => {
    signInWithEmailAndPassword(auth, user.email, user.password)
    .then((res) => {
      console.log(res.user)
      document.getElementById('form').style.display="none"
      userIn = true
    })
    .catch((error) => {
      alert(error.message)
    })
  }


</script>

<main>

  

  <Router>

    <div class="topNav">
      <Link to="/"> <img src={Company} alt="company"> 
        {#if userIn}
          <div class="bicon">
            <img src={Boss} alt="user"> <h3> {user.email} </h3>
          </div>
        {/if} 
      </Link>
      <nav>
        <Link class="links" to="/">Home</Link>
        {#if userIn }
          <Link class="links" to="/devs">Developers</Link>
        {/if}
      </nav>
    </div>

    <Route path="/devs"> <Devs/> </Route>
    <Route path="/"><Home /></Route>
  </Router>

  <div class="form" id="form">
    <img src={Company} alt="logo">
    <form>
      <input type="email" placeholder="email" bind:value={user.email}>
      <input type="password" placeholder="password" bind:value={user.password}>
      <div class="bts">
        <button type="button" on:click={signIn}>Enter</button>
        <button type="button" on:click={signUp}>Sign Up</button>
      </div>
    </form>
  </div>
  
</main>

<style>
  /* * {
    outline: 1px solid red;
  } */
  .topNav {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .topNav img {
    width: 40px;
  }
  .bicon {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 2rem;
  }
  .bicon img{
    width: 35px;
  }
  .bicon h3 {
    text-decoration: none;
    color: #fff;
    background-color: #000070;
    padding: 0.5rem 1rem;
    border-radius: 0.5rem;
    margin-left: 0.5rem;
  }
  .topNav h3 {
    width: 100px;
    font-size: 0.9rem;
    white-space: nowrap; /* Prevent line breaks */
    overflow: hidden; /* Hide overflowing content */
    text-overflow: ellipsis;
  }
  nav {
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .form {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: #fff;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
  }
  form {
    display: flex;
    flex-direction: column;
  }
  .form img {
    width: 40px;
    margin-bottom: 4rem;
  }
  input {
    background: #e0e0e0;
    margin-bottom: 1rem;
    padding: 0.5rem 1rem;
    border-radius: 0.5rem;
    border: none;
    outline: none;
  }
  .bts {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  button {
    border: none;
    background-color: #000070;
    color: #fff;
    padding: 0.5rem 1rem;
    border-radius: 0.5rem;
    outline: none;
    cursor: pointer;
    width: fit-content;
  }

</style>