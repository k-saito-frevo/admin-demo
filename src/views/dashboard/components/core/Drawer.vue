<template>
  <v-navigation-drawer
    id="core-navigation-drawer"
    v-model="drawer"
    :dark="barColor !== 'rgba(228, 226, 226, 1), rgba(255, 255, 255, 0.7)'"
    :expand-on-hover="expandOnHover"
    :src="barImage"
    mobile-break-point="960"
    app
    width="260"
    v-bind="$attrs"
  >
    <template v-slot:img="props">
      <v-img :gradient="`to bottom, ${barColor}`" v-bind="props"/>
    </template>

    <v-divider class="mb-1" />

    <v-list dense nav>
      <v-list-item>
        <v-list-item-avatar class="align-self-center" color="white" contain>
          <v-img v-bind:src="require('@/assets/frevo.png')" max-height="30"/>
        </v-list-item-avatar>
        <v-list-item-content>
          <v-list-item-title  class="display-1"  v-text="profile.title"/>
        </v-list-item-content>
      </v-list-item>
    </v-list>

    <v-divider class="mb-2" />

    <v-list expand nav rounded>
      <div />

      <template v-for="(item, i) in computedItems">
        <base-item-group
          v-if="item.children"
          :key="`group-${i}`"
          :item="item"
        >
        </base-item-group>
        <base-item
          v-else
          :key="`item-${i}`"
          :item="item"
        />
      </template>
      <div />
    </v-list>
  </v-navigation-drawer>
</template>

<script>
  import {
    mapState,
  } from 'vuex'

  export default {
    name: 'DashboardCoreDrawer',
    props: {
      expandOnHover: {
        type: Boolean,
        default: false,
      },
    },

    data: () => ({
      items: [
        {
          title:'運行管理',
          icon:'mdi-car-traction-control',
          group:'/operation',
          children:[
            {
              title:"温度管理",
              icon:'mdi-chart-multiple',
              to:"temperature"
            },
            {
              title:"動態管理",
              icon:'mdi-crosshairs-gps',
              to:"dynamics"
            },
          ],
        },
        {
          title:'工事管理',
          icon:'mdi-teach',
          group:'/construction',
          children:[
            {
              title:"工事情報",
              icon:'mdi-pickaxe',
              to:"constructioninfo"

            },
            {
              title:"運搬車両情報",
              icon:'mdi-car-lifted-pickup',
              to:"vehicleinfo"
            },
            {
              title:"経路作成",
              icon:'mdi-map-search-outline',
              to:"routeinfo"
            },
          ],
        },
        {
          title:'マスタ管理',
          icon:'mdi-hammer-screwdriver',
          group:'/master',
          children:[
            {
              title:"ユーザ管理",
              icon:'mdi-card-account-details-outline',
              to:"usermaster"
            },
            {
              title:"支店管理",
              icon:'mdi-domain',
              to:"branchmaster"
            },
            {
              title:"車載端末管理",
              icon:'mdi-devices',
              to:"devicemaster"
            },
            {
              title:"設定管理",
              icon:'mdi-cog-outline',
              to:"settingmaster"
            }
          ],
        },
        {
          icon: 'mdi-view-dashboard',
          title: 'dashboard',
          to: '/dashboard',
        },
        {
          title: 'typography',
          icon: 'mdi-format-font',
          to: '/pages/typography',
        },
        {
          title: 'icons',
          icon: 'mdi-chart-bubble',
          to: '/pages/icons',
        },
        {
          title: 'google',
          icon: 'mdi-map-marker',
          to: '/maps/google-maps',
        },
        {
          title: 'notifications',
          icon: 'mdi-bell',
          to: '/pages/notifications',
        },
        {
          title: 'ログアウト',
          icon: 'mdi-reply-all',
          to: '/',
        },
      ],
    }),

    computed: {
      ...mapState(['barColor', 'barImage']),
      drawer: {
        get () {
          return this.$store.state.drawer
        },
        set (val) {
          this.$store.commit('SET_DRAWER', val)
        },
      },
      computedItems () {
        return this.items.map(this.mapItem)
      },
      profile () {
        return {
          avatar: true,
          title: 'FrevoWorks',
        }
      },
    },

    methods: {
      mapItem (item) {
        return {
          ...item,
          children: item.children ? item.children.map(this.mapItem) : undefined,
          title: this.$t(item.title)
        }
      },
    },
  }
</script>

<style lang="sass">
  #core-navigation-drawer
    .v-list-group__header.v-list-item--active:before
      opacity: .24
    .v-list-item
      &__icon--text,
      &__icon:first-child
        justify-content: center
        text-align: center
        width: 20px
        +ltr()
          margin-right: 24px
          margin-left: 12px !important
    .v-list--dense
      .v-list-item
        &__icon--text,
        &__icon:first-child
          margin-top: 10px
    .v-list-group--sub-group
      .v-list-item
        +ltr()
          padding-left: 8px
      .v-list-group__header
        +ltr()
          padding-right: 0
        .v-list-item__icon--text
          margin-top: 19px
          order: 0
        .v-list-group__header__prepend-icon
          order: 2
          +ltr()
            margin-right: 8px
</style>
