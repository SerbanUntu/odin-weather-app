import './styles/reset.css'
import './styles/main.css'
import './styles/util.css'
import { API } from './api'
import { images } from './images'

function getImageURL() {
	const condition = API.data.condition.category
	const time = API.data.day ? 'day' : 'night'
	return images[`${condition}-${time}`]
}

API.fetchRealtimeData('London').then(() => {
	API.processRealtimeData()
	document.body.style.backgroundImage = `url("${getImageURL()}")`
})
