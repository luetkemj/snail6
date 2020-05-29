import { Component } from 'geotic'
import { colors } from '../lib/graphics'

export default class Soilage extends Component {
    static allowMultiple = true

    static properties = {
        color: colors.defaultColor,
        name: 'blood',
        sourceName: '',
        sourceEntityId: ''
    }

    onAttached(evt) {
        this.entity.fireEvent('soil', { color: this.color })
    }

    onClean(evt) {
        this.destroy()
    }
}