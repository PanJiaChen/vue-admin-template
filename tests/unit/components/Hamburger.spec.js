import { shallowMount } from '@vue/test-utils'
import Hamburger from '@/components/Hamburger/index.vue'

describe('Hamburger.vue', () => {
  it('toggle click', () => {
    const wrapper = shallowMount(Hamburger)

    const mockFn = jest.fn()
    wrapper.vm.$on('toggleClick', mockFn)

    // 触发按钮的点击事件
    wrapper.find('.hamburger').trigger('click')
    expect(mockFn).toBeCalled()
  })

  // it('渲染正确', () => {
  //   expect(wrapper.html()).toContain('<span class="count">0</span>')
  // })

  // it('是一个按钮', () => {
  //   expect(wrapper.contains('button')).toBe(true)
  // })

  // it('snapshot test', () => {
  //   expect(wrapper.element).toMatchSnapshot()
  // })
})
