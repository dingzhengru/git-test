<template>
  <AppModal :isShow="isShow" @close="$emit('close')">
    <div class="service-term">
      <div class="service-term__close" @click="$emit('close')"></div>
      <div class="service-term__header">
        <div class="service-term__header__title">《服务条款》</div>
        <div class="service-term__header__content">
          请仔细阅读本条款，并确认您已完全理解其内容。如果对于本条款所产生的权利和义务有任何疑问，请向您所属法律管辖区域内的法律顾问寻求说明。
        </div>
      </div>
      <div class="service-term__body">
        <div class="service-term__body__item" v-for="item in termList" :key="item.title">
          <div class="service-term__body__item__title" @click="openTerm(item)">
            {{ item.title }}
            <i class="service-term__body__item__title__icon" :class="{ open: item.isOpen }"></i>
          </div>
          <transition name="slide-dropdown-height">
            <div class="service-term__body__item__content" v-show="item.isOpen">
              <ul>
                <li v-for="(contentItem, index) in item.list" :key="index" v-html="contentItem"></li>
              </ul>
            </div>
          </transition>
        </div>
      </div>
      <div class="service-term__footer">
        <button class="ui-btn ui-btn--block" @click="$emit('close')">{{ $t('ui.button.close') }}</button>
      </div>
    </div>
  </AppModal>
</template>

<script>
export default {
  name: 'ModalServiceTerm',
  components: {
    AppModal: () => import('@/components/AppModal'),
  },
  props: {
    isShow: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      termList: [
        {
          title: '一、定义',
          list: [
            '以下条规适用于用户使用、<br>连接和参与由 (以下统称、『我们』及『我们的』视具体情况而定) 通过<br><a class="lnk" href="http://www.lionking.re888show.com" target="_blank">http://www.lionking.re888show.com</a>经营的网站提供的网上博彩服务。本条规须与特定博彩的博彩规则及适用于博彩软件的使用及与连接进入博彩网站和其中所含条规一并阅读。',
            '「博彩」就本条规而言，包括但不限于通过博彩网站提供的任何及一切博彩服务进行的投注、FREE PLAY游戏及各类博彩活动。',
            '「连接设备」指任何应用连接设备，包括但不限于为使用和连接博彩网站、参与博彩服务而采用的个人计算机、笔记本电脑、移动电话、个人数码助理、PDA电话、手提设备。',
          ],
          isOpen: false,
        },
        {
          title: '二、同意',
          list: ['以下条规适用于用户使用'],
          isOpen: false,
        },
      ],
    };
  },
  methods: {
    openTerm(item) {
      item.isOpen = !item.isOpen;
    },
  },
};
</script>
