import Vue from 'vue'
import inputAutoWidth from './directives/inputAutoWidth'
import './style/main.scss'

import { default as text } from './types/TypeText'
import { default as checkbox } from './types/TypeCheckBox'
import { default as color } from './types/TypeColor'

Vue.directive('input-autowidth', inputAutoWidth)

export default {
  name: 'dense',
  types: { text, checkbox, color }
}
