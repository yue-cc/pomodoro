<template lang="pug">
#list
  b-container
    div.play.position-absolute
      div.circle
    div.play.position-absolute
      span.time2 {{ timeText }}
      span.current2 {{ currentText }}
    div.play2.position-absolute
      b-btn.btn-start2(variant='dark' v-if='status !== 1' @click='start')
        font-awesome-icon(:icon='["fas", "play"]')
      b-btn.btn-pause2(variant='primary' v-if='status === 1' @click='pause')
        font-awesome-icon(:icon='["fas", "pause"]')
    b-row
      b-col.col-12.col-lg-6.mt-5
        b-col
          p.texta TO-DO LIST
          p.textb ANALYTICS
          p.textb RINGTONES
      b-col.col-12.col-lg-6.mt-5
        b-row.addmission.position-relative
          b-form-group.w-100(invalid-feedback='請至少輸入兩個字' :state='state')
            b-form-input(v-model='newitem' :state='state' trim @keydown.enter='additem' placeholder="ADD A NEW MISSION…")
            b-btn.plus(variant='white' @click='additem')
              span +
        b-row
          div.todo-text
            h2 TO-DO
          b-table.list-text(:items='list' :fields='listfields')
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
            template(#cell(action)='data')
              span(v-if='!data.item.edit')
                b-btn(@click='editlist(data.index)' variant='white')
                  font-awesome-icon.icon2(:icon='["fas", "pen"]')
                b-btn(@click='dellist(data.index)' variant='white')
                  font-awesome-icon.icon2(:icon='["fas", "trash"]')
              span(v-else)
                b-btn(@click='changelist(data.index)' variant='white')
                  font-awesome-icon.icon2(:icon='["fas", "check"]')
                b-btn(@click='cancellist(data.index)' variant='white')
                  font-awesome-icon.icon2(:icon='["fas", "undo"]')
        b-row
          div.done-text
            h2 DONE
          b-table-simple.list-text
            tbody
              tr(v-for='(item, idx) in finished' :key='idx')
                td {{ item }}
                td
                  b-btn(@click='delfinish(idx)' variant='white')
                    font-awesome-icon.icon2(:icon='["fas", "trash"]')
</template>

<script>
export default {
  name: 'List',
  data () {
    return {
      timer: 0,
      newitem: '',
      listfields: [
        { key: 'name', label: 'name' },
        { key: 'action', label: 'action' }
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
      return this.$store.getters.list.map(item => {
        if (item.model.length < 2) {
          item.state = false
        } else {
          item.state = true
        }
        return item
      })
    },
    finished () {
      return this.$store.state.finished
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
    editlist (index) {
      this.$store.commit('editList', index)
    },
    changelist (index) {
      console.log(index)
      if (this.list[index].state) {
        this.$store.commit('changeList', index)
      }
    },
    cancellist (index) {
      this.$store.commit('cancelList', index)
    },
    dellist (index) {
      this.$store.commit('delList', index)
    },
    delfinish (index) {
      this.$store.commit('delFinish', index)
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
    }
  }
}
</script>
<style lang="stylus">
#list
  background #003164
  height 100%
  overflow-y auto
.texta
  color #FF4384
  font-size 2rem
  font-weight bold
.textb
  color #FFFFFF33
  font-size 2rem
  font-weight bold
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
.todo-text
  width 100%
  background #FFFFFF33
  margin-top 50px
  padding 0px 10px
  color #fff
.done-text
  width 100%
  background #FFFFFF33
  margin-top 20px
  padding 0px 10px
  color #fff
.list-text
  color #fff
.icon2
  width 30px
  color #fff
.play
  width 400px
  height 150px
  bottom 0px
  overflow hidden
.circle
  width 300px
  height  300px
  background #FFEDF7
  border-radius 50%
  position absolute
.time2
  font-size 40px
  color #FF4384
  font-weight bold
  position absolute
  top 40px
  left 90px
.current2
  width 200px
  text-align center
  font-size 16px
  color #003164
  font-weight bold
  position absolute
  top 100px
  left 50px
.play2
  width 200px
  height 150px
  bottom 50px
  overflow hidden
.btn-start2
  width 100px !important
  height 100px !important
  background #FF4384 !important
  border-radius 50% !important
  border 0px
  position absolute
  left 100px
.btn-pause2
  width 100px !important
  height 100px
  background #FF4384 !important
  border-radius 50% !important
  position absolute
  left 100px
@media screen and (max-width: 992px) {
  #list {
    padding 0px 60px
    transition 1s
    overflow-y auto
  }
}
</style>
