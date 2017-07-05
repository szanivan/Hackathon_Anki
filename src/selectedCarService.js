var selectedCar = 0
export default {
    set(value){
        selectedCar = value;
    },
    get(){
        return selectedCar;
    }
}