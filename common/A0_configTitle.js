// 这个方法用于将JYJ中台的配置值
// 转化为标准的组件标题配置值
export function configTitle(data) {
  let localItem = {}
  localItem['name'] = 'optionalTitle'
  localItem['config'] = {
    // 页面标题 背景色 外边距
    compo: {
      style: {
        'background-color': data.backgroundColor,
        margin: `${data.marginTop / 16}rem ${data.marginRight /
          16}rem ${data.marginBottom / 16}rem ${data.marginLeft / 16}rem`,
      },
    },
    // 页面标题 ICON 主标题 副标题 更多/链接
    title: {
      icon: {
        style: {
          display: data.type === 'left-center' ? 'block' : 'none',
          'background-color': data.themeColor,
          width: '0.25rem',
          height: `${data.mainTitleSize / 16}rem`,
          'margin-right': '0.5rem',
        },
      },
      value: data.mainTitle,
      style: {
        'font-size': `${data.mainTitleSize / 16}rem`,
        'line-height': `${data.mainTitleSize / 16 + 0.2}rem`,
        'font-weight': data.mainTitleBolder ? 'bold' : '',
      },
    },
    subTitle: {
      value: data.subTitle,
      link: {
        show: data.linkInfo && data.linkInfo.linkType,
        info: data.linkInfo || '',
      },
      style: {
        color: '#999999',
        'font-size': `${data.subTitleSize / 16}rem`,
        'line-height': `${data.subTitleSize / 16 + 0.2}rem`,
      },
    },
  }
  localItem = JSON.parse(JSON.stringify(localItem))
  return localItem
}
