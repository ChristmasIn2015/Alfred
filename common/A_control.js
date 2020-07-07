import { configTitle } from './A0_configTitle.js'
import { configSwiper } from './A1_configSwiper.js'
import { configSearchBar } from './A2_configSearchBar.js'
import { configIconBar } from './A3_configIconBar.js'
import { configEntry } from './A4_configEntry.js'
import { configMsg } from './A5_configMsg.js'
import { configTabs } from './A6_configTab.js'
import { configTabPlus } from './A7_configTabPlus.js'
import { configUserCoupon } from './A8_configUserCoupon.js'
import { configTabNail } from './A9_configTabNail.js'
import { configTabImage } from './A10_configTabImage.js'

function switchComponentsList(list) {
  let componentsList = []
  list.forEach((item) => {
    let compo = null
    switch (item.name) {
      case 'TitleCom':
        compo = configTitle(item) // 页面标题
        break
      case 'ImgAd':
        compo = configSwiper(item) // 图片广告
        break
      case 'SearchCom':
        compo = configSearchBar(item) // 信息搜索框
        break
      case 'FunctionLink':
        compo = configIconBar(item) // 功能链接
        break
      case 'ImageTextNavigation':
        compo = configEntry(item) // 图文导航
        break
      case 'DynamicNews':
        compo = configMsg(item) // 公告轮播
        break
      case 'TabInformation':
        compo = configTabs(item) // tab资讯
        break
      case 'TabList':
        compo = configTabPlus(item) // tab列表
        break
      case 'Coupon':
        compo = configUserCoupon(item) // 领取优惠券
        break
      case 'TabRecommend':
        compo = configTabNail(item) // Tab推荐
        break
      case 'RecommendSwitch':
        compo = configTabImage(item) // 推荐切换
        break
    }
    compo ? componentsList.push(compo) : ''
  })
  return componentsList
}

export default {
  switchComponentsList,
  configTitle,
  configSwiper,
  configSearchBar,
  configIconBar,
  configEntry,
  configMsg,
  configTabs,
  configTabPlus,
  configUserCoupon,
  configTabNail,
  configTabImage,
}
