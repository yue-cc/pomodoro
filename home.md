<template lang="pug">
#home
  b-container
    b-row
      b-col.col-12.col-lg-6.mt-5
        b-row.addmission.position-relative
          b-form-input(v-model="text" placeholder="ADD A NEW MISSION…")
          i.plus.position-absolute +
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
      b-col.col-12.col-lg-5
        b-row
          b-col(cols='12')
            b-btn.btn-start(variant='dark' v-if='status !== 1' @click='start')
              font-awesome-icon(:icon='["fas", "play"]')
            b-btn(variant='primary' v-if='status === 1' @click='pause')
              font-awesome-icon(:icon='["fas", "pause"]')
            b-btn(variant='primary' v-if='current.length > 0' @click='finish(true)')
              font-awesome-icon(:icon='["fas", "step-forward"]')
</template>

<script>
export default {
  name: 'Home',
  data () {
    return {
      timer: 0,
      listfields: [
        { key: 'name', label: '○ TO DO LIST' }
      ]
    }
  },
  computed: {
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
  background #FFEDF7
  height 100%
.addmission
  height 40px
.addmission input::placeholder
  color #FF4384
  font-size 16px
  font-weight bold
  font-style italic
.plus
  color #FF4384
  font-size 2rem
  top -10px
  right 30px
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
b-btn
  width 500px
  height 500px
</style>
