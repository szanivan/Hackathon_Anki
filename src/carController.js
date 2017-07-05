
import axios from 'axios';

function sendCommand(command, car, value){
  let body = {}
  console.log(body)
  axios.post('http://localhost:7877/' + command + '/' + car + '/' + value)
}
export default
    function (name){
        return {
            setSpeed(value){
                let command = "speed"
                sendCommand("setSpeed", name, value || 300);
            },

            setStop(value){
                let command = "speed"
                this.speed = 0;
                sendCommand("setSpeed", name, 0);
            },
        
            setTurn(value){
                sendCommand('uturn', name, '')
            },

            setLane(value){
                sendCommand('setLaneOffset', name, 0)
                sendCommand('changeLanes', name, value || 0)
            }
        }
    }
