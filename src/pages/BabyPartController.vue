<template>
        <v-container id="controls" class="d-flex flex-column align-center">

        </v-container>
</template>

<script lang="ts">

import { Component, Vue} from 'vue-property-decorator';



@Component({})
export default class BabyPartController extends Vue{

}

</script>


<style lang="scss" scoped>

$threes-green: #43bd8a;



#controls{
    border: 2px solid $cf-blue;
	width: 90vw;
	max-width: 90vh;
	height: 90vh;
	max-height: 90vw;

	/*@media (min-width: 700px){
		width: 80vw;
		max-width: 80vh;
		height: 80vh;
		max-height: 80vw;
	}*/
    .v-row{
        display: none;
    }
	div.button{
		position: relative;
		line-height: 0;
		user-select: none;
		border-radius: 15%;
		&.rotate{
			transform: scale(0.75);
		}
		&:hover, &.active {
			button.movement{
				background-color: $threes-green !important;
			}
		}
		&:active, &.active{
			&#nav-up > button{ padding-bottom: 10px; }
			&#nav-down > button{ padding-top: 10px; }
			&#nav-right > button{ padding-left: 10px; }
			&#nav-left > button{ padding-right: 10px; }
			&#nav-cw > button i { transform: rotate(10deg); }
			&#nav-ccw > button i { transform: rotate(-10deg); }
		}
		img{
			width: 100%;
			position: relative;
			z-index: 2;
		}
		button.movement {
			left: 0;
			height: 100%;
			width: 100%;
			border-radius: 15%;
			position: absolute;
			transition: all 0.2s ease;
			padding: 0;
		}
		i.v-icon{
			font-size: 3.5rem;
			@media (min-width: 500px) {
				font-size: 5rem;
			}
			@media (min-width: 800px) {
				font-size: 8rem;
			}
		}
	}
}

</style>