<script>
import {TasksApiService} from "@/tasking/services/tasks-api.service";
import  {FilterMatchMode} from "primevue/api";

export default {
  name:"task-list",
  data(){
    return{
      tasks:[],
      task:{},
      selectTasks:null,
      tasksService: null,
      filters:{},

    };
  },
  created() {
    this.tasksService = new TasksApiService();
    this.tasksService.getAll()
        .then((response)=>{
          this.tasks =response.data;
          console.log(this.tasks);
        });
    this.initFilters();
  },
  methods:{
    initFilters(){
      this.filters = {
        global: { value: null, matchMode: FilterMatchMode.CONTAINS },
      };
    }
  },
};
</script>

<template>
  <div>
    <div class="card">
      <pv-toolbar class="mb-4">
      <template #start>
        <pv-button
          label="New"
          icon="pi pi-plus"
          class="p-button-success mr-2"
          @click=""
        />
        <pv-button
          label="Delete"
          icon="pi pi-trash"
          class="p-button-danger"
          @click=""
          :disabled="true"
        />
      </template>
      <template #end>

      </template>
  </pv-toolbar>

      <pv-data-table
        ref="dt"
        :value="tasks"
        v-model:selection="selectTasks"
        dataKey="id"
        :paginator="true"
        :rows="10"
        :filters="filters"
        paginatorTemplate="FirstPageLink PrevPageLink PageLinks
NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
        :rowsPerPageOptions="[5, 10, 25]"
        currentPageReportTemplate="Showing {first} to {last} of
{totalRecords} tutorials"
        responsiveLayout="scroll"
    >
      <template #header>
        <div class="table-header flex flex-column md:flex-row
                    md:justify-content-between">
          <h5 class="mb-2 md:m-0 p-as-md-center text-xl">Manage
            Tutorials</h5>
          <span class="p-input-icon-left">
            <i class="pi pi-search" />
            <pv-input-text
            v-model="filters['global'].value"
            placeholder="Search..."
             />
          </span>
        </div>
      </template>
      <pv-column
          selectionMode="multiple"
          style="width: 3rem"
          :exportable="false"
      ></pv-column>
      <pv-column
          field="id"
          header="Id"
          :sortable="true"
          style="min-width: 12rem"
      ></pv-column>
      <pv-column
          field="client_name"
          header="Name"
          :sortable="true"
          style="min-width: 16rem"
      ></pv-column>
      <pv-column
          field="phone_name"
          header="Phone"
          :sortable="true"
          style="min-width: 16rem"
      ></pv-column>
      <pv-column
          field="delivery_day"
          header="Date"
          :sortable="true"
          style="min-width: 12rem"
      ></pv-column>
      <pv-column :exportable="false" style="min-width: 8rem">
        <template #body="slotProps">
          <pv-button
              icon="pi pi-pencil"
              class="p-button-text p-button-rounded"
              @click=""
          />
          <pv-button
              icon="pi pi-trash"
              class="p-button-text p-button-rounded"
              @click=""
          />
        </template>
      </pv-column>
    </pv-data-table>
      </div>
  </div>



</template>

<style lang="css" scoped>

.table-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  @media screen and (max-width: 960px) {
    align-items: start;
  }
}
@media screen and (max-width: 960px) {
  ::v-deep(.p-toolbar) {
    flex-wrap: wrap;
    .p-button {
      margin-bottom: 0.25rem;
    }
  }
}

</style>