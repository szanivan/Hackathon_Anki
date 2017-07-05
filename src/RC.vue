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
import carController from './carController.js'
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
  computed:{
    carController(){return carController(this.car)}
  },
  methods:{
    setSpeed(event){
      let command = "speed"
      this.log += ('\n set Speed to ' + this.speed);
      this.carController.setSpeed(this.speed);
    },
    setStop(event){
      let command = "speed"
      this.speed = 0;
      this.log += ('\n set stop to ');
      this.carController.setStop();
    },
    setTurn(event){
      this.log += ('\n u turn ');
      this.carController.setTurn();
    },
    setLane(event){
      this.log += ('\n set lane to ' + this.lane);
      this.carController.setLane(this.lane);
    }
  }
}
</script>
<style lang="scss">

</style>
