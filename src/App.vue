<template>
  <div id="app">
    <div class="columns">
      <div class="column" id="commands">
        Commands

        <div class="btn-group" >
            <button v-on:click="forward">FORWARD</button>
            <button v-on:click="backward">BACKWARD</button>
            <button v-on:click="uturn">U-TURN</button>
            <button v-on:click="halt">HALT</button>
        </div>
      </div>
      <div class="column is-two-thirds" id="tracks">
        Track
            <ul id="track1">
                <li v-for="step in track">
                  {{ step.direction }}
                </li>
            </ul>
      </div>
      <div class="column" id="actions">
            <button id="start_cmd" v-on:click="start">Start</button>
            <button id="stop_cmd" v-on:click="stop">Stop</button>
            <button id="clear" v-on:click="clear">Clear</button>
      </div>
    </div>
    <div class="columns">
      <div class="column">
        <remote-control car="f6:c8:09:8a:81:2a"></remote-control>
      </div>
      <div class="column is-half">
        <remote-control car="e9:e6:2d:94:da:64"></remote-control>
      </div>
    </div>
  </div>
</template>

<script>

import remoteControl from './RC.vue'

export default {
  name: 'app',
  data() {
    return {
      track: []
    }
  },
  components:{
    remoteControl: remoteControl,
  },
  methods: {
    start: function (event) {
      //Start Anki car
      collect_commands(this.track)
    },
    stop: function (event) {
      //Stop Anki car
      alert("stop")
    },
    clear: function (event) {
      //clear track
      this.track = [];
    },
    forward:function (event) {
      this.track.push({direction: 'forward', duration: 1000});
    },
    backward: function (event) {
      this.track.push({direction: 'backward', duration: 1000});
    },
    uturn: function (event) {
      this.track.push({direction: 'uturn', duration: 1000});
    },
    halt: function (event) {
      this.track.push({direction: 'halt', duration: 1000});
    }
  }
}

function collect_commands (track) {
    var promise = Promise.resolve();
    track.map(step => {
        promise = promise.then( _ =>
            new Promise(function(resolve, reject) {
              setTimeout(function(){
                  console.log(step.direction);
                  resolve()},
                step.duration)})
        )
    })
    return promise;
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
