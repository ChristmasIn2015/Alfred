// 这个方法用于将JYJ中台的配置值
// 转化为标准的图片广告配置值
export function configSwiper(data) {
  let myConfig = getSwiperConfig(data.type)
  myConfig.auto = data.swiperRule === 'auto'
  myConfig['imagesStatic'] = data.swiperRule === 'static'
  myConfig['images'] = getSwiperImages(data)
  myConfig['yjyCompoStyle'] = {
    'background-color': data.backgroundColor,
    margin: `${data.marginTop / 16}rem ${data.marginRight /
      16}rem ${data.marginBottom / 16}rem ${data.marginLeft / 16}rem`,
  }
  let localItem = {
    name: 'optionalSwiper',
    config: myConfig,
  }
  localItem = JSON.parse(JSON.stringify(localItem))
  return localItem
}

function getSwiperImages(data) {
  let images = []
  data.imgList.forEach((img) => {
    img['3d'] = data.type === '3d'
    img['radius'] = data.imgAngle !== 'straight'
    img['fontSize'] = data.titleSize
    images.push(img)
  })
  return images
}

function getSwiperConfig(type) {
  let index = 0
  switch (type) {
    case '3d':
      index = 1
      break
    case '2d-one-third':
      index = 2
      break
    case '2d-two-half':
      index = 3
      break
    case '2d-one-half':
      index = 4
      break
    case '2d-three':
      index = 5
      break
    case '2d-flat':
      index = 6
      break
    default:
      index = 0
      break
  }
  let config = swiperTypeMap[index]
  return config
}
const swiperTypeMap = {
  0: {
    pots: false,
    imageRate: 1,
    gap: 0,
    auto: false,
    images: [], // 整张平铺
  },
  1: {
    pots: false,
    imageRate: 0.83,
    gap: 0,
    auto: false,
    images: [], // 3d
  },
  2: {
    pots: false,
    imageRate: 0.9,
    gap: 10,
    auto: false,
    images: [], // 1.3张
  },
  3: {
    pots: false,
    imageRate: 1 / 2.5,
    gap: 10,
    auto: false,
    images: [], // 2.5张
  },
  4: {
    pots: false,
    imageRate: 0.83,
    gap: 10,
    auto: false,
    images: [], // 1.3张
  },
  5: {
    pots: false,
    imageRate: 1 / 3.175,
    gap: 10,
    auto: false,
    images: [], // 3张
  },
  6: {
    pots: false,
    imageRate: 0.48,
    gap: 10,
    auto: false,
    images: [], // 2张
  },
}
