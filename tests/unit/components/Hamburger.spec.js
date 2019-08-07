import { shallowMount } from '@vue/test-utils'
import Hamburger from '@/layout/components/Hamburger.vue'
describe('Hamburger.vue', () => {
  it('toggle click', () => {
    const wrapper = shallowMount(Hamburger)
    const mockFn = jest.fn()
    wrapper.vm.$on('layout-hamburger-click', mockFn)
    wrapper.find('.navbar-hamburger').trigger('click')
    expect(mockFn).toBeCalled()
  })
  it('prop isActive', () => {
    const wrapper = shallowMount(Hamburger)
    wrapper.setProps({ isActive: true })
    wrapper.vm.$nextTick(() => {
      expect(wrapper.contains('.is-navbar-hamburger-active')).toBe(true)
    })
    wrapper.setProps({ isActive: false })
    wrapper.vm.$nextTick(() => {
      expect(wrapper.contains('.is-navbar-hamburger-active')).toBe(false)
    })
  })
})
