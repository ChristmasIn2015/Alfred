export function configUserCoupon(item) {
  // **** filter ****
  let ids = item.couponID || ''
  ids = ids.replace(/；/, ';')
  // let ids = '41654814;41654817'
  let key = ''
  if (ids.indexOf(';') >= 0) key = ';'
  // **** filter end ****

  let localItem = {}
  localItem['name'] = 'optionalUserCoupon'
  localItem['config'] = {
    compo: {
      style: {
        'background-color': item.backgroundColor,
        margin: `${item.marginTop / 16}rem ${item.marginRight /
          16}rem ${item.marginBottom / 16}rem ${item.marginLeft / 16}rem`,
      },
    },
    coupon: {
      queryIds: key ? ids.split(key) : ids.split(),
      postMessage: item.sentMessage || false, // item.sentMessage
      btnStyle: { 'background-color': item.themeColor || '#1288F0' },
    },
  }
  localItem = JSON.parse(JSON.stringify(localItem))
  return localItem
}
