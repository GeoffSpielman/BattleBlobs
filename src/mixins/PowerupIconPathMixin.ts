import { Component, Vue } from 'vue-property-decorator';

@Component
export class PowerupIconPathMixin extends Vue {
	iconPath(iconName: string): string {
		switch (iconName) {
			case "Sneak-A-Peak":
				return require("@/assets/game/sneak_a_peak.png");

			case "Umbrella":
				return require("@/assets/game/umbrella.png");

			case "Big Shot":
				return require("@/assets/game/missile.png");

			case "Move It Minor":
				return require("@/assets/game/move_it_minor.png");

			case "Move It Major":
				return require("@/assets/game/move_it_major.png");

			case "Uh-Oh":
				return require("@/assets/game/uh_oh.png");

			default:
				return "ERROR";
		}
	}
}