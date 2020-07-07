// 这个方法用于将JYJ中台的配置值
// 转化为标准的组件标题配置值
export function configSearchBar(item) {
  let localItem = {}
  localItem['name'] = 'optionalSearchBar'
  localItem['config'] = {
    compo: {
      fixed: false,
      style: {
        margin: `${item.marginTop / 16}rem ${item.marginRight /
          16}rem ${item.marginBottom / 16}rem ${item.marginLeft / 16}rem`,
      },
    },
    nail: {
      style: {
        'background-color': item.backgroundColor,
      },
    },
    left: {
      url: item.leftDate.url,
      link: item.leftDate,
    },
    center: {
      show: true,
      message: item.promptName,
      style: {
        'border-radius': item.searchAngle === 'circle' ? '0.5rem' : '0rem',
        'background-color': item.searchColor,
        'justify-content': item.promptPosition,
        color: item.promptColor,
      },
      link: item.jumpLink,
    },
    right: {
      url: item.rightDate.url,
      link: item.rightDate,
    },
  }
  localItem = JSON.parse(JSON.stringify(localItem))
  return localItem
}
