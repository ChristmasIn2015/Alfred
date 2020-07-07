// tab资讯
export function configTabs(item) {
  let localItem = {}
  localItem['name'] = 'optionalTab'
  localItem['config'] = {
    compo: {
      style: {
        // 'background-color': item.backgroundColor,
        margin: `${item.marginTop / 16}rem ${item.marginRight /
          16}rem ${item.marginBottom / 16}rem ${item.marginLeft / 16}rem`,
      },
    },
    tabs: {
      list: item.tabList,
      tabStyle: {
        color: '#333333',
        'background-color': item.themeColor,
      },
      contentStyle: {
        'background-color': item.backgroundColor,
      },
      type: item.name,
    },
  }
  localItem = JSON.parse(JSON.stringify(localItem))
  return localItem
}
