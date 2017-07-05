<template lang="pug">
  div
    h2 Remote Control For Car {{car}}
    div
      | Speed:
      input(@change="setSpeed" v-model="speed" type="range" min="300" max="2400")
      button(@click="setStop") Halt
    div
      | lane
      input(@change="setLane" v-model="lane" type="range" min="-68.0" max="68.0")
      button(@click="setLane") Set Lane
    div
    div
      button(@click="setTurn") Turn


    h3 Log
    pre {{log}}
</template>
<script>
import axios from 'axios';
export default {
  props:{
    car: 0
  },
  data(){
    return {
      speed: 300,
      acceleration: 6250,
      log: "",
      lane: 0,
    }
  },
  methods:{
    setSpeed(event){
      let command = "speed"
      this.log += ('\n set Speed to ' + this.speed);
      sendCommand("setSpeed", this.car, this.speed);
    },
    setStop(event){
      let command = "speed"
      this.speed = 0;
      this.log += ('\n set stop to ');
      sendCommand("setSpeed", this.car, 0);
    },
    setTurn(event){
      this.log += ('\n u turn ');
      sendCommand('uturn', this.car, '')
    },
    setLane(event){
      this.log += ('\n set lane to ' + this.lane);
      sendCommand('setLaneOffset', this.car, 0)
      sendCommand('changeLanes', this.car, this.lane)
    }
  }
}

function sendCommand(command, car, value){
  let body = {}
  console.log(body)
  axios.post('http://localhost:7877/' + command + '/' + car + '/' + value)
}
</script>
<style lang="scss">

</style>
