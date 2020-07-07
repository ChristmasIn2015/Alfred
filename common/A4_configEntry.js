export function configEntry(data) {
  let localItem = {}
  localItem['name'] = 'optionalEntry'
  localItem['config'] = {
    compo: {
      style: {
        'font-size': `${data.naviFontSize / 16}rem`,
        'background-color': data.backgroundColor,
        margin: `${data.marginTop / 16}rem ${data.marginRight /
          16}rem ${data.marginBottom / 16}rem ${data.marginLeft / 16}rem`,
      },
    },
    entrys: {
      list: data.navigation,
      style: getEntryStyle(data.navigation.length),
    },
  }
  localItem = (JSON.parse(JSON.stringify(localItem)))
  return localItem
}
const lengthMap = {
  4: true,
  6: true,
  7: true,
  8: true,
  11: true,
  12: true,
}
function getEntryStyle(length) {
  // ** 05/29 图文导航当前默认：每行最多5个, 宽度18% 左右边距1% **
  // ** 当入口个数为 3个：父组件需要 space-between **
  // ** 当入口个数为 4/6/7/8/11/12个：每行最多4个 宽度18% 左右边距3.5% **
  if (lengthMap[length]) {
    return {
      width: '18%',
      margin: '3.50%',
    }
  }
  return {}
}
