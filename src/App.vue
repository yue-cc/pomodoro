<template lang="pug">
#app
  b-nav.nav(vertical)
    b-nav-item(to='/')
      img(src="./assets/home.png")
    b-nav-item(to='/list')
      img(src="./assets/list.png")
    b-nav-item(to='/settings')
      img(src="./assets/music.png")
  div.pomodoro.position-absolute
    span pomodoro
  //- b-navbar(toggable='lg' type='white' variant='white')
  //-   b-container
  //-     b-navbar-brand(to='/') 番茄鐘
  //-     b-navbar-toggle(target='navbar-collapse')
  //-     b-collapse#navbar-collapse(is-nav)
  //-       b-navbar-nav.ml-auto
  //-         b-nav-item(to='/list') 清單
  //-         b-nav-item(to='/settings') 設定
  keep-alive
    router-view
</template>
<style lang="stylus">
#app
  width 100%
  height 100vh
  margin 0
  padding 0
  list-style none
  font-family Roboto, sans-serif
  box-sizing border-box
  overflow hidden
.nav
  width 200px !important
  height 100%
  position absolute
  right 0
  text-align right
  padding 40px 0
.pomodoro
  right 5px
  bottom 50px
  font-size 2rem
  font-weight bold
  color #fff
  writing-mode vertical-lr
</style>
