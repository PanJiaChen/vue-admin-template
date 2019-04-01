import Mock from 'mockjs'

export default [
  {
    url: '/table/list',
    type: 'get',
    response: config => {
      const items = Mock.mock({
        'items|30': [{
          id: '@id',
          title: '@sentence(10, 20)',
          'status|1': ['published', 'draft', 'deleted'],
          author: 'name',
          display_time: '@datetime',
          pageviews: '@integer(300, 5000)'
        }]
      })

      return {
        code: 20000,
        data: {
          total: items.length,
          items: items
        }
      }
    }
  }
]
