<template lang="pug">
.box
    .container
        h3.title.is-3 
            a(@click="setSelected") {{name}}
        .columns
            span(v-for="step in track" v-bind:class="{'is-primary': step.value > 400}")
                .card.is-1()
                    .card-content
                        h4.title.is-4 {{ step.direction }}
                        // pre {{step}}
                        p duration:
                            input(v-model="step.duration", type="number")
                        p(v-if="step.direction == 'go'") Speed:
                            input(type="range" min="300" max="1200" default="300" v-model.number="step.value")
                        p(v-if="step.direction == 'lane'") Lane:
                            input(type="range" min="-68" max="68" default="0" v-model.number="step.value")
                    
                
</template>
<script>
import selectedCar from './selectedCarService.js'
export default {
  props:{
    track:{},
    name: "",
    carId: 0
  },
  data(){
      return {}
  },
  methods:{
      setSelected(){
        selectedCar.set(this.carId)
      }
  }
}
</script>

<style lang="scss">
.card{
    animation-direction: .5s;
}

</style>
