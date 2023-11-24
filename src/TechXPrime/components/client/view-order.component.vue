<script>
import {TasksApiService} from "@/TechXPrime/services/tasks-api.service";
import  {FilterMatchMode} from "primevue/api";

export default {
  name:"task-list",

  data(){
    return{
      tasks:[],
      task:{
        delivery_day: null,
        value_progress: null
      },
      selectTasks:null,
      tasksService: null,
      filters:{},
      taskDialog:false,
      submitted:false,
      statuses: [
        { label: "Finished", value: "finished" },
        { label: "Unfinished", value: "unfinished" },
      ],
      deleteTaskDialog: false,
      deleteTasksDialog: false,


    };
  },
  created() {
    this.tasksService = new TasksApiService();
    this.tasksService.getAll()
        .then((response)=>{
          this.tasks =response.data;
          console.log(this.tasks);
          this.tasks.forEach(
              (task) => this.getDisplayableTask(task)
          );
          console.log(this.tasks);
        });
    this.initFilters();
  },
  methods:{

    updateProgressBar() {

      this.task.value_progress = Math.min(100, Math.max(0, this.task.value_progress));


      this.$refs.progressBar.value = this.task.value_progress;
    },

    getDisplayableTask(task) {
      task.status = task.finished ? this.statuses[0].label :
          this.statuses[1].label;
      return task;
    },
    initFilters(){
      this.filters = {
        global: { value: null, matchMode: FilterMatchMode.CONTAINS },
      };
    },
    getStorableTask(getDisplayableTask) {
      return {
        id: getDisplayableTask.id,
        client_name: getDisplayableTask.client_name,
        phone_name: getDisplayableTask.phone_name,
        problem: getDisplayableTask.problem,
        components_to_use: getDisplayableTask.components_to_use,
        value_progress: getDisplayableTask.value_progress,
        delivery_day: getDisplayableTask.delivery_day,
        income: getDisplayableTask.income,
        investment:getDisplayableTask.investment,
        finished: getDisplayableTask.status.label === "Finished",
      };
    },

  },
};
</script>

<template>
  <div>
    <div class="card">

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
{totalRecords} tasks"
          responsiveLayout="scroll"
      >
        <template #header>
          <div class="table-header flex flex-column md:flex-row
                    md:justify-content-between">
            <h5 class="mb-2 md:m-0 p-as-md-center text-xl">List Task</h5>
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
        <pv-column
            field="status"
            header="Status"
            :sortable="true"
            style="min-width: 12rem"
        >
          <template #body="slotProps">
            <pv-tag v-if="slotProps.data.status === 'Finished'"
                    severity="success">
              {{ slotProps.data.status }}
            </pv-tag>
            <pv-tag v-else severity="info">{{ slotProps.data.status
              }}</pv-tag>
          </template>
        </pv-column>

        <pv-column
            field="status"
            header="Status"
            :sortable="true"
            style="min-width: 12rem"
        >
          <template #body="slotProps">
            <pv-tag v-if="slotProps.data.status === 'Finished'"
                    severity="success">
              {{ slotProps.data.status }}
            </pv-tag>
            <pv-tag v-else severity="info">{{ slotProps.data.status
              }}</pv-tag>
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
.contenedor-flexbox {
  display: flex;
  justify-content: space-between;

}

.confirmation-content {
  display: flex;
  align-items: center;
  justify-content: center;
}

</style>