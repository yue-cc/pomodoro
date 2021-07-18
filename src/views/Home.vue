<template lang="pug">
#home
  b-container.container
    b-row
      b-col.col-12.col-lg-6.mt-5
        b-row.addmission.position-relative
          b-form-group.w-100(invalid-feedback='請至少輸入兩個字' :state='state')
            b-form-input(v-model='newitem' :state='state' trim @keydown.enter='additem' placeholder="ADD A NEW MISSION…")
            b-btn.plus(variant='white' @click='additem')
              span +
        b-row.p-2
          b-col.col-12.current.d-flex
            div.big-circle
            div
              span {{ currentText }}
              div.small-circle
          b-col.col-12.time
            span {{ timeText }}
          b-col.col-12
            b-table(:items='list2' :fields='listfields')
              template(#cell(name)='data')
                b-form-input(
                  v-if='data.item.edit'
                  v-model='data.item.model'
                  trim
                  :state='data.item.state'
                  @keydown.enter='changelist(data.index)'
                  @keydown.esc='cancellist(data.index)'
                )
                span(v-else) {{ data.value }}
      b-col.col-12.col-lg-5.mt-5
        b-btn.btn-start(variant='dark' v-if='status !== 1' @click='start')
          font-awesome-icon.icon(:icon='["fas", "play"]')
        b-btn.btn-pause(variant='primary' v-if='status === 1' @click='pause')
          font-awesome-icon.icon(:icon='["fas", "pause"]')
        b-btn.btn-finish(variant='primary' v-if='current.length > 0' @click='finish(true)')
          font-awesome-icon(:icon='["fas", "step-forward"]')
</template>

<script>
export default {
  name: 'Home',
  data () {
    return {
      timer: 0,
      newitem: '',
      listfields: [
        { key: 'name', label: '○ TO DO LIST' }
      ]
    }
  },
  computed: {
    state () {
      if (this.newitem.length === 0) {
        return null
      } else if (this.newitem.length < 2) {
        return false
      } else {
        return true
      }
    },
    status () {
      return this.$store.state.status
    },
    list () {
      return this.$store.state.list
    },
    list2 () {
      return this.$store.getters.list.map(item => {
        if (item.model.length < 2) {
          item.state = false
        } else {
          item.state = true
        }
        return item
      })
    },
    current () {
      return this.$store.state.current
    },
    currentText () {
      let text = this.current
      if (text.length === 0) {
        if (this.list.length === 0) {
          text = 'There are no tasks yet'
        } else {
          text = '點擊開始'
        }
      }
      return text
    },
    timeleft () {
      return this.$store.state.timeleft
    },
    timeText () {
      const m = Math.floor(this.timeleft / 60)
      const s = Math.floor(this.timeleft % 60)
      return `${m} : ${s}`
    }
  },
  methods: {
    additem () {
      if (this.state) {
        this.$store.commit('addList', this.newitem)
        this.newitem = ''
      } else {
        this.$swal({
          icon: 'error',
          title: '錯誤',
          text: '必須要兩個字以上'
        })
      }
    },
    pause () {
      clearInterval(this.timer)
      this.$store.commit('changeStatus', 2)
    },
    start () {
      if (this.status !== 2 && this.list.length > 0) {
        this.$store.commit('start')
      }
      if (this.current.length > 0) {
        this.$store.commit('changeStatus', 1)
        this.timer = setInterval(() => {
          this.$store.commit('countdown')
          if (this.timeleft <= -1) {
            this.finish(false)
          }
        }, 1000)
      }
    },
    finish (skip) {
      clearInterval(this.timer)
      this.$store.commit('changeStatus', 0)
      this.$store.commit('addFinish')

      if (!skip) {
        const audio = new Audio()
        audio.src = require('../assets/' + this.$store.state.sound)
        audio.play()
      }

      if (this.list.length > 0) {
        this.start()
      } else {
        this.$swal({
          icon: 'success',
          title: '結束'
        })
      }
    }
  }
}
</script>
<style lang="stylus">
#home
  background linear-gradient(to right, #FFEDF7 75%, #003164 75%)
  height 100%
.addmission
  height 40px
.addmission input::placeholder
  color #FF4384
  font-size 16px
  font-weight bold
  font-style italic
.plus
  width 40px !important
  height 30px !important
  background white !important
  color #FF4384
  font-size 2rem
  position absolute
  top 5px
  right 5px
.plus span
  font-weight bold
  font-style italic
  position absolute
  top -15px
  right 5px
.current
  margin-top 50px
  font-size 24px
  color #003164
  font-weight bold
.big-circle
  width 48px
  height 48px
  background #FFEDF7
  border-radius 50%
  border 2px solid #003164
  margin-right 15px
.small-circle
  width 12px
  height 12px
  background #FFEDF7
  border-radius 50%
  border 1px solid #FF4384
.time
  margin-top -40px
  font-size 140px
  color #FF4384
  font-weight bold
.btn-start
  width 500px !important
  height 500px !important
  background #FF4384 !important
  border-radius 50% !important
  border 0px
.btn-pause
  width 500px !important
  height 500px
  background #FF4384 !important
  border-radius 50% !important
  border 200px solid #fff
.btn-finish
  width 80px !important
  height 80px !important
  background #FF4384 !important
  border-radius 50% !important
  border 0px
  margin-top -80px
  margin-left 460px
.icon
  width 50px !important
  height 50px !important
@media screen and (max-width: 992px) {
  #home {
    padding 0px 60px
    transition 1s
    overflow-y auto
  }
  .btn-start {
    width: 100% !important;
    height: 50px !important
    border-radius 25px !important
    margin-top -50px
  }
  .btn-finish {
    width: 100% !important;
    height: 50px !important
    border-radius: 25px !important
    border: 0px
    margin-top: 5px
    margin-left: 0px
  }
  .btn-pause {
    width: 100% !important;
    height: 50px !important
    border-radius: 25px !important
    border: 0px
    margin-top -50px
  }
  .icon {
    width: 16px !important
    height: 16px !important
  }
  .time {
    font-size 100px
    margin-top -20px
  }
}

</style>
