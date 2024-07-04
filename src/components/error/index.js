import './index.css'
import ErrorIcon from '../../images/error.svg'
import CloseIcon from '../../images/close.svg'

export class ErrorMessage {
	static LIFESPAN_MS = 5000

	text

	constructor(text) {
		this.text = text
	}

	static pushError(text) {
		const error = new ErrorMessage(text)
		const queue = document.querySelector('.error-queue')
		const errorComponent = error.getComponent()
		if (queue.childNodes) {
			queue.insertBefore(errorComponent, queue.childNodes[0])
		} else {
			queue.appendChild(errorComponent)
		}
		setTimeout(() => {
			errorComponent.remove()
		}, ErrorMessage.LIFESPAN_MS)
	}

	getComponent() {
		const component = document.createElement('div')
		component.setAttribute('title', this.text)
		component.classList.add('error-message')
		component.innerHTML = `
			<img class="error-icon" src=${ErrorIcon}>
			<p class="error-text text-ellipsis">${this.text}</p>
			<button class="close-error-message">
				<img class="close-icon" src=${CloseIcon}>
			</button>
		`
		const button = component.querySelector('button')
		button.addEventListener('click', e => {
			e.preventDefault()
			component.remove()
		})
		return component
	}
}
