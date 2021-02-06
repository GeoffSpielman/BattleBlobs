<template>
    <div class="container">
        <header>
            <h1> I am the main menu </h1>
        </header>
        <section>
            Buttons for instrucitons/lobby
        </section>       
        <footer> &#169; Geoff Spielman, 2020 </footer>
    </div>
</template>

<script>
export default {

}
</script>

<style scoped>

.container{
    align-items: center;
    justify-content: flex-end;
    flex-direction: column;
}

header{
    display: flex;
    height: 150px
}
section{
    display: flex;
    flex-grow: 1;
}
</style>