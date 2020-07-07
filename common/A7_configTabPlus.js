export function configTabPlus(data) {
  let localItem = {}
  localItem['name'] = 'optionalTabPlus'
  localItem['config'] = {
    compo: {
      style: {
        'background-color': data.backgroundColor,
        margin: `${data.marginTop / 16}rem ${data.marginRight /
          16}rem ${data.marginBottom / 16}rem ${data.marginLeft / 16}rem`,
      },
    },
    tabs: {
      tabType: 0, // *0 Tab列表样式 *1 Tab推荐位/锚点样式 *2 推荐切换样式
      mainColor: data.themeColor || '#1288F0',
      list: data.tabList,
      listType: data.type, // 0 列表 1 小图 2 大图 3 瀑布流 4 tabType2/推荐切换
    },
  }
  localItem = JSON.parse(JSON.stringify(localItem))
  return localItem
}
