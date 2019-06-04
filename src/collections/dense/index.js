import Vue from 'vue'
import inputAutoWidth from './directives/inputAutoWidth'
import { default as text } from './types/TypeText'
import './style/main.scss'

Vue.directive('input-autowidth', inputAutoWidth)

export default {
  name: 'dense',
  types: { text }
}
