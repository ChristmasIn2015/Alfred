export function configIconBar(data) {
  let localItem = {}
  localItem['name'] = 'optionalSearchBar'
  localItem['config'] = {
    compo: {
      fixed: false,
      style: {
        margin: `${data.marginTop / 16}rem ${data.marginRight /
          16}rem ${data.marginBottom / 16}rem ${data.marginLeft / 16}rem`,
      },
    },
    nail: {
      style: {
        'background-color': data.backgroundColor,
      },
    },
    left: {
      url: data.leftDate.url,
      link: data.leftDate,
    },
    center: {
      show: false,
      message: '',
      link: {},
    },
    right: {
      url: data.rightDate.url,
      link: data.rightDate,
    },
  }
  localItem = JSON.parse(JSON.stringify(localItem))
  return localItem
}
