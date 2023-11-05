<script>

import {AnalyticsApiService} from "@/TechXPrime/services/analytics-api.service";

class Item{
  component;
  amount;
  price;
  constructor() {
    this.component = "";
    this.amount = 1;
    this.price = 0;
  }

}
export default{
  name:"dashboard",
  data(){
    return {
      isChangingInventory: false,
      inventoryCreated: false,
      errorCreatingOrSaving: false,
      showErrorCreatingOrSaving: false,
      isBarClicked: false,
      chartData: null,
      chartOptions: null,
      weekSelected: null,
      profitSelected: null,
      barSelectedPosition: null,
      analyticsService: null,
      analyticsProfits: null,
      analyticsIncomes: null,
      analyticsExpenses: null,
      items: [],
    };
  },
  methods:{
    createInventory(){
      this.isChangingInventory = !this.isChangingInventory;
      if(this.items.length > 0){
        this.inventoryCreated = true;
      }
    },
    saveInventory(){
      for (let item in this.items){
        if(item.component === "" || item.amount === 0 || item.price === 0){
          this.errorCreatingOrSaving = true;
        }
      }
      !this.errorCreatingOrSaving ? this.isChangingInventory = !this.isChangingInventory : this.showErrorCreatingOrSaving = true;
    },
    addItems(){
      let item = new Item();
      this.items.push(item)
    },
    setChartData(){
      return {
        labels: ['Week1', 'Week2', 'Week3', 'Week4'],
        datasets: [
          {
            label: 'Profits',
            data: this.analyticsProfits
          }
        ]
      };
    },
    setChartOptions(){
      let vm = this;
      return {
        responsive: true,
        onClick: function(evt, array) {
          if (array.length !== 0) {
            let position = array[0].index;
            let dataElement = this.data.datasets[0].data[position]
            let labelData = this.data.labels[position]
            vm.weekSelected = labelData
            vm.profitSelected = dataElement
            vm.barSelectedPosition = position
            if(vm.isBarClicked === false) {
              vm.isBarClicked = true;
            }
          }
        }
      };
    },
    backTo(){
      this.isBarClicked = false;
    }
  },
  created(){
    this.analyticsService = new AnalyticsApiService();
    this.analyticsService.getAnalyticsByMonth(10)
        .then((response) => {
          let profits = [];
          let incomes = [];
          let expenses = [];
          for (let i = 1; i <= 4; i++) {
            profits.push(response.data[i].profit);
            incomes.push(response.data[i].incomes);
            expenses.push(response.data[i].expenses);
          }
          this.analyticsProfits = profits;
          this.analyticsIncomes = incomes;
          this.analyticsExpenses = expenses;
          this.chartData = this.setChartData();
        })
    this.chartOptions = this.setChartOptions();
  }
}
</script>

<template>
  <div class="flex p-2 gap-1 text-5xl">
    <i class="pi pi-th-large" style="font-size: 2.5rem"></i>
    <span>Dashboard</span>
  </div>
  <div class="flex justify-content-center">
    <pv-card v-if="!isChangingInventory && !isBarClicked" class="w-5 p-2 m-2" style="height: 85%; background-color: #72B4EF;">
      <template #header>
        <div class="flex text-4xl gap-3">
          <i class="pi pi-briefcase" style="font-size: 2.5rem"></i>
          <span>Inventory</span>
        </div>
      </template>
      <template #content>
        <div v-if="inventoryCreated">
          <div class="flex justify-content-center text-2xl">
            <span class="mr-6">Component</span>
            <span class="ml-7">Amount</span>
          </div>
          <div class="flex flex-column p-3 gap-2">
              <div class="flex gap-8" v-for="item in items">
                <span class="w-7">{{item.component}}</span>
                <span class="flex align-items-center">{{item.amount}}</span>
              </div>
          </div>
          <div class="flex h-7rem align-items-end justify-content-end">
            <pv-button icon="pi pi-pencil" text icon-class="text-2xl" @click="createInventory"/>
          </div>
        </div>
        <div v-else class="flex h-30rem align-items-center justify-content-center">
          <pv-button class="h-4rem w-8 justify-content-center border-round-3xl" @click="createInventory">
            Create new inventory
          </pv-button>
        </div>
      </template>
    </pv-card>
    <pv-card v-if="!isChangingInventory && !isBarClicked" class="w-7 p-2 m-2" style="height: 85%; background-color: #72B4EF;">
      <template #header>
        <div class="flex text-4xl gap-3">
          <i class="pi pi-chart-line" style="font-size: 2.5rem"></i>
          <span>Analytics</span>
        </div>
      </template>
      <template #content>
        <div style="background-color: white" >
          <pv-chart type="bar" :data="chartData" :options="chartOptions"/>
        </div>
      </template>
    </pv-card>
    <pv-card v-if="isChangingInventory && !isBarClicked" class="w-10 p-2 m-2" style="height: 85%; background-color: #72B4EF;">
      <template #header>
        <div class="flex text-4xl gap-3">
          <i class="pi pi-briefcase" style="font-size: 2.5rem"></i>
          <span>Inventory</span>
        </div>
      </template>
      <template #subtitle>
        <div class="flex gap-5" style="font-size: 1.5rem">
          <span class="w-7">
            Component
          </span>
          <span class="w-2">
            Amount
          </span>
          <span class="w-2">
            Unit Price
          </span>
        </div>
      </template>
      <template #content>
        <div class="flex flex-column">
          <div class="flex p-1" v-for="item in items">
            <pv-input-text class="w-6 p-1 ml-4 mr-7" type="text" v-model="item.component"></pv-input-text>
            <pv-input-number class="w-1 ml-8 mr-5" input-class="w-full p-2" v-model="item.amount" inputId="integeronly" locale="en-US"></pv-input-number>
            <pv-input-number class="w-1 ml-8" input-class="w-full p-2" v-model="item.price" mode="currency" currency="PEN" locale="en-US"></pv-input-number>
          </div>
          <div class="flex justify-content-center mr-3">
            <pv-button icon="pi pi-plus-circle" text rounded icon-class="text-2xl" @click="addItems"/>
          </div>
        </div>
      </template>
      <template #footer>
        <div class="flex justify-content-end">
          <pv-button v-if="inventoryCreated" class="w-2 justify-content-center border-round-3xl" @click="saveInventory">
            Save
          </pv-button>
          <pv-button v-else class="w-2 justify-content-center border-round-3xl" @click="createInventory">
            Create
          </pv-button>
        </div>
      </template>
    </pv-card>
    <pv-card v-if="!isChangingInventory && isBarClicked" class="w-9 p-2 m-2" style="height: 85%; background-color: #72B4EF;">
      <template #header>
        <div class="flex text-4xl gap-3">
          <i class="pi pi-chart-line" style="font-size: 2.5rem"></i>
          <span>Analytics</span>
        </div>
      </template>
      <template #content>
        <div class="flex gap-4">
          <div style="background-color: white">
            <pv-chart type="bar" :data="chartData" :options="chartOptions" :canvas-props="{height: '450', width: '650'}"/>
          </div>
          <div class="flex flex-column gap-4 text-2xl">
            <span class="font-bold">Income</span>
            <span>In {{weekSelected}}, you got</span>
            <span class="font-bold">S/.{{analyticsIncomes[barSelectedPosition]}}</span>
            <span>In {{weekSelected}}, you wasted</span>
            <span class="font-bold">S/.{{analyticsExpenses[barSelectedPosition]}}</span>
            <span>Your total profit was</span>
            <span class="font-bold">S/.{{profitSelected}}</span>
            <div class="flex justify-content-center">
              <pv-button class="flex w-3 justify-content-center border-round-3xl" @click="backTo">Back</pv-button>
            </div>
          </div>
        </div>
      </template>
    </pv-card>
  </div>
</template>

<style scoped>

</style>