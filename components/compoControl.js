function switchComponentsList(list) {
  let componentsList = []
  // 信息搜索
  // componentsList.push(configSearchBar())
  // // 图文导航
  // componentsList.push(configEntry())
  // // 公告轮播
  // componentsList.push(configMsg())
  list.forEach((item) => {
    // 页面标题
    if (item.name === 'TitleCom') componentsList.push(configTitle(item))
    // 图片广告
    if (item.name === 'ImgAd') componentsList.push(configSwiper(item))
  })
  return componentsList
}

// 页面标题
function configTitle(item) {
  let localItem = {}
  localItem['name'] = 'optionalTitle'
  localItem['config'] = {
    compo: {
      style: {
        'background-color': item.backgroundColor,
        margin: `${item.marginTop / 16}rem ${item.marginLeft /
          16}rem ${item.marginBottom / 16}rem`,
      },
    },
    title: {
      value: item.mainTitle,
      style: {
        'font-size': `${item.mainTitleSize / 16}rem`,
        'line-height': `${item.mainTitleSize / 16}rem`,
      },
    },
    tip: {
      value: item.subTitle,
      style: {
        'font-size': `${item.subTitleSize / 16}rem`,
        'line-height': `${item.subTitleSize / 16}rem`,
      },
    },
    icon: {
      style: {
        display: item.type === 'center' ? 'none' : 'block',
        'background-color': item.themeColor,
        height: `${item.mainTitleSize / 16}rem`,
      },
    },
  }
  return localItem
}

// 图片广告
function configSwiper(item) {
  //
  // item.type = '2d-three'
  //
  let localItem = {}
  localItem['name'] = 'optionalSwiper'
  let images = []
  item.imgList.forEach((img) => {
    let tempImg = JSON.parse(JSON.stringify(img))
    tempImg['tip'] = ''
    images.push(tempImg)
  })
  localItem['config'] = {
    compo: {
      style: {
        'background-color': item.backgroundColor,
        margin: `${item.marginTop / 16}rem ${item.marginLeftRight /
          16}rem ${item.marginBottom / 16}rem`,
      },
    },
    swiper: {
      option: getSwiperType(item.type),
      style: {
        'border-radius': item.imgAngle === 'straight' ? '0rem' : '1rem',
        height: `${getSwiperRemHeight(item.type) / 16}rem`,
      },
      images: images,
    },
  }
  return localItem
}
function getSwiperType(type) {
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
    default:
      index = 0
      break
  }
  return swiperTypeMap[index]
}
function getSwiperRemHeight(type) {
  let tempHeight = 375 * 0.618
  switch (type) {
    case '3d':
      tempHeight *= 0.75
      break
    case '2d-one-third':
      tempHeight *= 0.75
      break
    case '2d-two-half':
      tempHeight *= 0.5
      break
    case '2d-one-half':
      tempHeight *= 2 / 3
      break
    default:
      tempHeight = tempHeight
      break
  }
  return tempHeight
}
const swiperTypeMap = {
  // N张铺满平铺
  0: {
    // centeredSlides: true, // 居中
    slidesPerView: 1, // 每个轮播块的图片数量
    autoplay: true, // 自动播放
    speed: 500, // 左右滑动速度，越大越慢
  },
  // 1.5张3D轮播
  1: {
    effect: 'coverflow',
    coverflowEffect: {
      rotate: 0,
      stretch: 0,
      depth: 100,
      modifier: 2,
      slideShadows: false,
    },
    spaceBetween: 40,
    slidesPerView: 1.3,
    autoplay: true,
  },
  // 1.3 张滑动平铺
  2: {
    spaceBetween: 15,
    slidesPerView: 1.3,
    autoplay: true,
  },
  // 2.5 张平铺
  3: {
    spaceBetween: 10,
    slidesPerView: 2.5,
    autoplay: true,
  },
  // 1.5 张平铺
  4: {
    spaceBetween: 15,
    slidesPerView: 1.5,
    autoplay: true,
  },
  // 3 张静止广告图
  5: {
    threeAD: true,
  },
  // 纵向广告
  6: {
    direction: 'vertical',
    loop: true,
    loopedSlides: 5,
  },
}

// 信息搜索
function configSearchBar() {
  let item = {}
  let localItem = {}
  let tempUrl =
    'http://pic.lvmama.com/uploads/pc/place2/jtour/2020-05-12/jtour_op_sys_1589272216406.png'
  localItem['name'] = 'optionalSearchBar'
  localItem['config'] = {
    compo: {
      fixed: true,
      style: {
        'background-color': item.backgroundColor,
        'margin-bottom': '10rem',
      },
    },
    left: {
      url: tempUrl,
    },
    center: {
      message: '123',
      style: {
        'text-align': 'center',
        'font-color': 'white',
        'background-color': 'red',
      },
    },
    right: {
      url: tempUrl,
    },
  }
  return localItem
}

// 图文盗号
function configEntry() {
  let item = {}
  let localItem = {}
  let tempUrl =
    'http://pic.lvmama.com/uploads/pc/place2/jtour/2020-05-12/jtour_op_sys_1589272216406.png'
  localItem['name'] = 'optionalEntry'
  localItem['config'] = {
    compo: {
      style: {
        'background-color': item.backgroundColor,
        margin: '1rem',
      },
    },
    list: [
      { icon: tempUrl, title: '123' },
      { icon: tempUrl, title: '123' },
      { icon: tempUrl, title: '123' },
    ],
  }
  return localItem
}

// 公告轮播
function configMsg() {
  let localItem = {}
  let tempUrl =
    'http://pic.lvmama.com/uploads/pc/place2/jtour/2020-05-12/jtour_op_sys_1589272216406.png'
  localItem['name'] = 'optionalMsg'
  localItem['config'] = {
    compo: {
      icon: tempUrl,
      style: {
        'background-color': 'red',
        margin: '1rem',
      },
    },
    swiper: {
      option: swiperTypeMap[6],
      list: [
        {
          value: 123333,
        },
        {
          value: 12222233,
        },
        {
          value: 122212322331222123223312221232233,
        },
      ],
    },
  }
  return localItem
}

export default {
  switchComponentsList,
  configTitle,
  configSwiper,
}
