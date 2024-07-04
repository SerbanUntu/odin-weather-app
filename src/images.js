import ClearDay from './images/clear-day.jpg'
import ClearNight from './images/clear-night.jpg'
import CloudyDay from './images/cloudy-day.jpg'
import CloudyNight from './images/cloudy-night.jpg'
import OvercastDay from './images/overcast-day.jpg'
import OvercastNight from './images/overcast-night.jpg'
import Rainy from './images/rainy.jpg'
import SnowyDay from './images/snowy-day.jpg'
import SnowyNight from './images/snowy-night.jpg'
import StormyDay from './images/stormy-day.jpg'
import StormyNight from './images/stormy-night.jpg'
import SearchIcon from './images/search.svg'
import { Theme } from './enums'

document.querySelector('.search-button img').src = SearchIcon

class Image {
	src
	authors
	theme

	constructor(src, authors, theme) {
		this.src = src
		this.authors = authors
		this.theme = theme
	}
}

export const images = {
	'clear-day': new Image(ClearDay, 'Teddy Charti', Theme.LIGHT),
	'clear-night': new Image(ClearNight, 'Oskar Kadaksoo', Theme.DARK),
	'cloudy-day': new Image(CloudyDay, 'Kristina Tolmacheva', Theme.LIGHT),
	'cloudy-night': new Image(CloudyNight, 'Andriyko Podilnyk', Theme.DARK),
	'overcast-day': new Image(OvercastDay, 'Jaime Spaniol', Theme.LIGHT),
	'overcast-night': new Image(OvercastNight, 'Antoine Barrès', Theme.DARK),
	'rainy-day': new Image(Rainy, 'Valentin Müller', Theme.DARK),
	'rainy-night': new Image(Rainy, 'Valentin Müller', Theme.DARK),
	'snowy-day': new Image(SnowyDay, 'Adam Chang', Theme.LIGHT),
	'snowy-night': new Image(SnowyNight, 'William Topa', Theme.DARK),
	'stormy-day': new Image(StormyDay, 'Igor Kyryliuk & Tetiana Kravchenko', Theme.DARK),
	'stormy-night': new Image(StormyNight, 'Luka Vovk', Theme.DARK),
}
