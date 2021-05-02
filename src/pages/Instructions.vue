<template>
  <div id="gameOutermost">
    <div id="chatContainer"></div>
    <div id="mapContainer">
      
      <!--
      <section class="grid">
        <aside class="aspect-ratio"></aside>
        <article>
          <ul class="grid absolute-fill">
            <li class="aspect-ratio">
              <div class="absolute-fill">content 1</div>
            </li>
          </ul>
        </article>
      </section>
    </div>
    -->

    <div id="test">
      I am the content
    </div>
    </div>
    <div id="powerupsContainer"></div>
    <div id="playerDisplayContainer"></div>
  </div>
</template>


<style scoped>
#gameOutermost {
  display: grid;
  grid-template-columns: 25vw 1fr 150px;
  grid-template-rows: 1fr 120px;
  width: 100%;
  height: 100%;
}

#chatContainer {
  grid-column: 1/2;
  grid-row: 1/2;
  background-color: beige;
}

#mapContainer {
  grid-column: 2/3;
  grid-row: 1/2;
  background-color: lightblue;
  display: grid;
  align-items: center;
  justify-items: center;
  grid-template-columns: 1fr;
  grid-template-rows: 1fr;
}

#outerSquare {
  background-color: red;
  width: 80%;
}

#outerSquare::before {
  content: "";
  display: inline-block;
  width: 1px;
  height: 0;
  padding-bottom: 100%;
}

#powerupsContainer {
  grid-column: 3/4;
  grid-row: 1/2;
  background-color: beige;
}

#playerDisplayContainer {
  grid-column: 1/4;
  grid-row: 2/3;
  background-color: beige;
}

#test{
  aspect-ratio: 1;
  background-color: red;
  height: 100%;
}

/*

*, *:before, *:after {
	box-sizing: border-box;
}


section {
	overflow: hidden;
}

article {
	grid-row: 1 / -1;
	grid-column: 1 / -1;
	position: relative;
}

ul {
	list-style: none;
	margin: 0;
	padding: 0;
	grid-row-gap: 24px;
}


li {
	position: relative;
}

.absolute-fill {
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
}

.grid {
	display: grid;
	grid-template-columns: 1fr;
	grid-column-gap: 24px;
}

.aspect-ratio {
	padding-top: 100%;
	
}
*/

</style>