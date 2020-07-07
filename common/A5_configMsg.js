export function configMsg(item) {
  let localItem = {}
  localItem['name'] = 'optionalMsg'
  localItem['config'] = {
    yjyCompo: {
      icon: item.iconList[0] ? item.iconList[0].url : '',
      style: {
        'border-radius': '0.5rem',
        'background-color': item.backgroundColor,
        margin: `${item.marginTop / 16}rem ${item.marginRight /
          16}rem ${item.marginBottom / 16}rem ${item.marginLeft / 16}rem`,
      },
    },
    swiper: {
      style: {
        'font-size': `${item.fontSize / 16}rem`,
      },
      renderData: item.apiLinkInfo || null,
    },
  }
  localItem = JSON.parse(JSON.stringify(localItem))
  return localItem
}
