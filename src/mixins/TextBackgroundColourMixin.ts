import { Component, Vue } from 'vue-property-decorator';

@Component
export class TextBackgroundColourMixin extends Vue {
	textBackgroundClass(colourCode: string): string {
		//dark colours
		if (
			["e6194b", "f58231", "808000", "3cb44b", "4363d8", "911eb4"].includes(colourCode)
		) {
			return "whitest";
		
		//medium
		} else if (
			["aaffc3", "42d4f4", "f032e6", "ffd8b1"].includes(colourCode)
		) {
			return "medium";
		//light colours
		} else {
			return "faint";
		}
	}
}