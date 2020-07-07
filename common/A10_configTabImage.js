export function configTabImage(data) {
  let localItem = {}
  localItem['name'] = 'optionalTabImage'
  localItem['config'] = {
    compo: {
      style: {
        'background-color': data.backgroundColor,
        margin: `${data.marginTop / 16}rem ${data.marginRight /
          16}rem ${data.marginBottom / 16}rem ${data.marginLeft / 16}rem`,
      },
    },
    tabs: {
      tabType: 2, // *0 Tab列表样式 *1 Tab推荐位/锚点样式 *2 推荐切换样式
      mainColor: data.themeColor || '#1288F0',
      list: adornList(data.recommendTabList),
      listType: 'tabType2', // 0 列表 1 小图 2 大图 3 瀑布流 4 tabType2/推荐切换
    },
  }
  localItem = JSON.parse(JSON.stringify(localItem))
  return localItem
}
function adornList(messList) {
  let list = []
  if (messList.length) {
    for (let i = 0; i < messList.length; i++) {
      list.push({
        title: messList[i].title,
        list: messList[i].recommendList,
      })
    }
  }
  return list
}
