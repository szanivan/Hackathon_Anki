<template>
  <div id="app">
    <div class="container">
    <h1 class="title is-1">Baron</h1>
      <div class="columns">
        <div class="column">
          <h3 class="title is-3">Commands</h3>
          <div class="card">
            <div class="card-content">
              <div class="block">
                <button class="button" id="start_cmd" v-on:click="start">Start<i class="play"></i></button>
                <button class="button" id="stop_cmd" v-on:click="stop">Stop</button>
                <button class="button" id="clear" v-on:click="clear">Clear</button>
              </div>
              <p>Select commands</p>
              <div class="block">
                <button class="button" v-on:click="forward">Go</button>
                <button class="button" v-on:click="backward">Stop</button>
                <button class="button" v-on:click="uturn">Lane</button>
                <button class="button" v-on:click="halt">Light</button>
              </div>
            </div>
          </div>
        </div>
        <div class="column is-three-quarters">
          <h3 class="title is-3">Tracks</h3>
          <timeline v-for="(car, key) in cars" :track="car.track" :name="car.name" :car-id="key"> </timeline>
          
        </div>
      </div>
    </div>
    <div class="container">
      <div class="columns" v-if="false">
        <div class="column" v-for="car in cars">
          <remote-control :car="car.mac"></remote-control>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import remoteControl from './RC.vue'
import track from './Track.vue'
import selectedCar from './selectedCarService.js'
import carController from './carController.js'

export default {
  name: 'app',
  data() {
    return {
      cars: [
        {mac: "f6:c8:09:8a:81:2a", name: "Blue Car" , track: []},
        {mac: "e9:e6:2d:94:da:64", name: "Black Car", track: []},
      ],
    }
  },
  components:{
    remoteControl: remoteControl,
    timeline: track
  },
  methods: {
    selectedCar(){return selectedCar.get()},
    track(){return this.cars[this.selectedCar()].track},
    start: function (event) {
      //Start Anki car
      this.cars.map(car => {
        let controller = carController(car.mac)
        this.collect_commands(car.track, controller)
      })
    },
    stop: function (event) {
      //Stop Anki car
      alert("stop")
    },
    clear: function (event) {
      //clear track
      while(this.track().length > 0) this.track().pop();
    },
    forward:function (event) {
      this.track().push({direction: 'go', duration: 1000});
    },
    backward: function (event) {
      this.track().push({direction: 'stop', duration: 1000});
    },
    uturn: function (event) {
      this.track().push({direction: 'lane', duration: 1000});
    },
    halt: function (event) {
      this.track().push({direction: 'light', duration: 1000});
    },
    collect_commands (track, controller) {
        var promise = Promise.resolve();
        track.map(step => {
            promise = promise.then( _ =>{
                console.log(step.direction);
                step.active = true;
                switch(step.direction){
                  case "go": controller.setSpeed(step.value); break;
                  case "stop": controller.setStop(step.value); break;
                  case "lane": controller.setLane(step.value); break;
                  // case "light": controller.setLight', step.value); break;
                }
                return new Promise(function(resolve, reject) {
                  setTimeout(function(){
                      step.active = false;
                      resolve()},
                    step.duration)})
            })
        })
        return promise;
    }
  }
}

</script>

<style lang="scss">
@import '~bulma';
@import "~buefy/src/scss/buefy";

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: left;
  color: #2c3e50;
}

.column {
  border: 2px;
  border-color: black;
}

.btn-group {
  margin: 10px 20px 10px 20px;
  display: block;
  float: left;
}
.btn-group button:hover {
    background-color: #3e8e41;
}
ul#track1 li {
    display:inline;
}

</style>
