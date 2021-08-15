const Mock = require('mockjs')

const data = Mock.mock({
  'items|30': [{
    id: '@id',
    title: '@sentence(10, 20)',
    tags: [1, 2, 3],
    views: '@integer(0, 1000)',
    'status|1': ['published', 'draft', 'deleted'],
    'enableComment|1': [1, 2],
    author: 'name',
    updateTime: '@datetime'
  }]
})

module.exports = [
  {
    url: '/blog/list',
    type: 'get',
    response: config => {
      const items = data.items
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
