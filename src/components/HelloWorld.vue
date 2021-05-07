<template>
  <div class="hello">
    <nav>
      <div class="overview">
        <div class="search">
          <div class="inputs">
            <input v-model="input" v-on:keyup="fetchSearch" type="text">
            <ul class="searchList">
              <li :class="searchArray.length != 0 ? 'searchLi searchLi-active' : 'searchLi'" v-for="item in searchArray" :key="item.id" @click="fetchCalories(item.id)">
                {{ item.title }}
              </li>
             </ul>
            <label>Select Meal:
              <select v-model="mealChoice" name="meal">
                <option value="breakfast">Breakfast</option>
                <option value="lunch">Lunch</option>
                <option value="dinner">Dinner</option>
              </select>
            </label>
          </div>
          
          
         
        </div>
        
        <div class="numbers">
          <div class="cals-goal">
          <h4> {{targetCalories}} </h4>
          <p>Target</p>
        </div>
        <div class="cals-today">
          <h4> {{currentCalories}} </h4>
          <p>Today</p>
        </div>
        <div class="cals-net">
          <h4 :class="targetCalories - currentCalories > 0 ? 'positive' : 'negative'">
            {{targetCalories - currentCalories}}
          </h4>
          <p>Net</p>
        </div>
        </div>
        
        <div class="canvas-holder">
            <pie-chart class="chart" v-if="chartData != null" :chart-data="chartData" :options="chartOptions"></pie-chart>
        </div>
      </div>
      
    </nav>
    <div class="meals">
      <div class="meal breakfast">
        <div class="meal-heading">
          <h3>Breakfast</h3>
          <button @click="time">test</button>
          <h4 v-if="breakfastTotal != 0">{{ breakfastTotal }} cals</h4>
        </div>
        
        <p v-for="item in breakfastArray" :key="item.id">
          {{ item.title }} {{ item.nutrition.calories }} 
        </p>
      </div>
      <div class="meal lunch">
        <div class="meal-heading">
          <h3>Lunch</h3>
          <h4 v-if="lunchTotal != 0">{{ lunchTotal }} cals</h4>
        </div>
        <p v-for="item in lunchArray" :key="item.id">
          {{ item.title }} {{ item.nutrition.calories }} 
        </p>
      </div>
      <div class="meal dinner">
        <div class="meal-heading">
          <h3>Dinner</h3>
          <h4 v-if="dinnerTotal != 0">{{ dinnerTotal }} cals</h4>
        </div>
        <p v-for="item in dinnerArray" :key="item.id">
          {{ item.title }} {{ item.nutrition.calories }} 
        </p>
      </div>
      
    </div>
    
  </div>
</template>

<script>
import PieChart from './pieChart.js'
import firebase from 'firebase'

export default {
    components: {PieChart},
    data() {
      return {
        input: "",
        searchArray: [],
        calories: "",
        breakfastArray: [],
        lunchArray: [],
        dinnerArray: [],
        breakfastTotal: 0,
        lunchTotal: 0,
        dinnerTotal: 0,
        carbs: 0,
        protein: 0,
        fat: 0,
        mealChoice: "breakfast",
        targetCalories: 2000,
        currentCalories: 0,
        chartOptions: {
            responsive: true,
            plugins: {
              legend: {
                display: false,
              }
            }
          },
        chartData: null,
    
      }
    },
    methods: {
      fetchSearch() {
        if (this.input.length > 3) {
          let api = `https://api.spoonacular.com/food/menuItems/search?query=${this.input}&number=5&apiKey=2ce90c069d8043aeadcf789227296dd1`
          fetch(api)
            .then(res => {
              return res.json()
            })
            .then(data => {
              console.log(data)
              this.searchArray = data.menuItems
            })
        }
        
      },
      fetchCalories(id) {
        if (this.input.length > 3) {
          let api = `https://api.spoonacular.com/food/menuItems/${id}?apiKey=2ce90c069d8043aeadcf789227296dd1`
          fetch(api)
            .then(res => {
              return res.json()
            })
            .then(data => {
              console.log(data)
              this.carbs += parseInt(data.nutrition.carbs)
              this.protein += parseInt(data.nutrition.protein)
              this.fat += parseInt(data.nutrition.fat)
              this.populateChart()
              if(this.mealChoice === "breakfast") {
                this.breakfastArray.push(data)
                this.currentCalories += data.nutrition.calories
                this.breakfastTotal += data.nutrition.calories
              }
              if(this.mealChoice === "lunch") {
                this.lunchArray.push(data)
                this.currentCalories += data.nutrition.calories
                this.lunchTotal += data.nutrition.calories
              }
              if(this.mealChoice === "dinner") {
                this.dinnerArray.push(data)
                this.currentCalories += data.nutrition.calories
                this.dinnerTotal += data.nutrition.calories
              }
              
            })
        }
        
      },
      populateChart() {
        this.chartData = {
          hoverBackgroundColor: "red",
          hoverBorderWidth: 10,
          labels: ["Carbs", "Protein", "Fat"],
          datasets: [
            {
              label: "Data One",
              backgroundColor: ["#41B883", "#E46651", "#00D8FF"],
              data: [this.carbs, this.protein, this.fat]
            }
          ]
        }
        
      },
      time() {
        console.log(firebase.firestore.Timestamp)
      }
      
    },
    mounted: {
      chart() {
        this.populateChart()
    }
  }
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.hello {
  padding: 20px;
  height: 100%;
  display: grid;
  grid-template-rows: 2fr 3fr;
}

ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}

.numbers {
  padding: 0 20px;
}

.numbers p {
  font-size: 12px;
  font-weight: 500;
  opacity: 0.6;
  margin: 5px 0;
}

.numbers h4 {
  text-align: center;
  margin-top: 5px;
  opacity: 0.9;
}

.cals-net h4 {
  font-size: 18px;
  opacity: 1;
}

.meals {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  margin-top: 10px;
  gap: 20px;
}

.meal p {
  margin-top: 5px;  
}

.meal-heading {
  background-color:rgb(25, 89, 207);
  color: white;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  margin-bottom: 10px;
}

.searchList{
  display: flex;
  flex-direction: column;
  position: absolute;
  z-index: 10;
  width: 30%;
}

.searchLi{
  transform: translateY(-110%);
}

.searchLi:hover{
  cursor: pointer;
  background-color: lightsteelblue;
}


.searchLi-active{
  transform: translateY(0%);
  transition: transform 0.2s ease;
}

.overview {
  margin: 0 auto;
  display: grid;
  grid-template-columns: 2fr 1fr 2fr;
  /* align-items: center;
  justify-content: center; */
}

.canvas-holder {
  width: 200px;
  margin: 0 auto;
}



.search {
  display: flex;
  align-items: center;
}

.inputs {
  align-self: flex-start;
  padding-top: 10px;
}

.positive {
  color: #41B883;
}

.negative {
  color: #e7462a;
}
</style>
