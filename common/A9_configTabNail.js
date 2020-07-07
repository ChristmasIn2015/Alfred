export function configTabNail(data) {
  if (data.type === '大图') data.type = '列表'
  let localItem = {}
  localItem['name'] = 'optionalTabNail'
  localItem['config'] = {
    compo: {
      style: {
        'background-color': data.backgroundColor || 'white',
        margin: `${data.marginTop / 16}rem ${data.marginRight /
          16}rem ${data.marginBottom / 16}rem ${data.marginLeft / 16}rem`,
      },
    },
    tabs: {
      reFixed: data.isTop,
      reFixedPaddingLeft: data.marginLeft,
      reFixedPaddingRight: data.marginRight,
      tabType: 1, // *0 Tab列表样式 *1 Tab推荐位/锚点样式 *2 推荐切换样式
      mainColor: data.themeColor || '#1288F0',
      list: adornNailList(data.tabList),
    },
  }
  localItem = JSON.parse(JSON.stringify(localItem))
  return localItem
}
function adornNailList(messList) {
  let list = []
  for (let i = 0; i < messList.length; i++) {
    let e = messList[i]
    e.datasource['title'] = e.title
    e.datasource['titleLink'] = e.linkType
    e.datasource['listLimit'] = e.productNum || 0
    e.datasource['listType'] = e.type
    list.push(e.datasource)
  }
  return list
}
