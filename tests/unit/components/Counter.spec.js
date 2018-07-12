import { shallowMount } from '@vue/test-utils'
import Counter from '@/components/Counter.vue'

describe('test Counter.vue', () => {
  const wrapper = shallowMount(Counter)

  it('increments counter', () => {
    expect(wrapper.vm.counter).toBe(0)
    wrapper.find('[jest="increment-button"]').trigger('click')
    expect(wrapper.vm.counter).toBe(1)
  })

  // it('渲染正确', () => {
  //   expect(wrapper.html()).toContain('<span class="count">0</span>')
  // })

  it('是一个按钮', () => {
    expect(wrapper.contains('button')).toBe(true)
  })

  // it('snapshot test', () => {
  //   expect(wrapper.element).toMatchSnapshot()
  // })
})
