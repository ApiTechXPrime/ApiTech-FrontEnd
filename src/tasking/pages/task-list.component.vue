<script>
import {TasksApiService} from "@/tasking/services/tasks-api.service";
import  {FilterMatchMode} from "primevue/api";

export default {
  name:"task-list",

  data(){
    return{
      tasks:[],
      task:{
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
    confirmDeleteTask(task) {
      this.task = task;
      this.deleteTaskDialog = true;
    },
    deleteTask() {
      this.tasksService.delete(this.task.id).then((response) => {
        this.tasks = this.tasks.filter(
            (t) => t.id !== this.task.id
        );
        this.deleteTaskDialog = false;
        this.task = {};
        this.$toast.add({
          severity: "success",
          summary: "Successful",
          detail: "Task Deleted",
          life: 3000,
        });
        console.log(response);
      });
    },
    findIndexById(id) {
      console.log(`current id: ${id}`);
      return this.task.findIndex((task) => task.id === id);
    },


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
    openNew() {
      this.task = {};
      this.submitted = false;
      this.taskDialog = true;
    },
    hideDialog() {
      this.taskDialog = false;
      this.submitted = false;
    },
    saveTask() {
      this.submitted = true;
      if (this.task.client_name.trim()) {
        if (this.task.id) {
          console.log(this.task);
          this.task = this.getStorableTask(this.task);
          this.tasksService
              .update(this.task.id, this.task)
              .then((response) => {
                console.log(response.data.id);
                this.tasks[this.findIndexById(response.data.id)] =
                    this.getDisplayableTask(response.data);
                this.$toast.add({
                  severity: "success",
                  summary: "Successful",
                  detail: "Task Updated",
                  life: 3000,
                });
                console.log(response);
              });
        } else {
          this.task.id = 0;
          console.log(this.task);
          this.task = this.getStorableTask(this.task);
          this.tasksService
              .create(this.task)
              .then((response) => {
                this.task =
                    this.getDisplayableTask(response.data);
                this.tasks.push(this.task);
                this.$toast.add({
                  severity: "success",
                  summary: "Successful",
                  detail: "Task Created",
                  life: 3000,
                });
                console.log(response);
              });
        }
        this.taskDialog = false;
        this.task = {};
      }
    },

    editTask(task) {
      console.log(task);
      this.task = { ...task };
      console.log(this.task);
      this.taskDialog = true;
    },
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
          @click="openNew"
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
      <pv-column :exportable="false" style="min-width: 8rem">
        <template #body="slotProps">
          <pv-button
              icon="pi pi-search"
              class="p-button-text p-button-rounded"
              @click=""
          />
          <pv-button
              icon="pi pi-pencil"
              class="p-button-text p-button-rounded"
              @click="editTask(slotProps.data)"
          />
          <pv-button
              icon="pi pi-trash"
              class="p-button-text p-button-rounded"
              @click="confirmDeleteTask(slotProps.data)"
          />
        </template>
      </pv-column>
    </pv-data-table>
      </div>
    <pv-dialog
        v-model:visible="taskDialog"
        :style="{ width: '450px' }"
        header="Task Information"
        :modal="true"
        class="p-fluid"
    >
      <div class="field mt-3">
          <span class="p-float-label">
            <pv-input-text
               type="text"
               id="client_name"
               v-model.trim="task.client_name"
              required="true"
              autofocus
              :class="{ 'p-invalid': submitted && !task.client_name }"
            />
            <label for="client_name">Client Name</label>
            <small class="p-error" v-if="submitted && !task.client_name">
            Client Name is required.
            </small>
          </span>
      </div>
      <div class="field mt-3">
        <span class="p-float-label">
          <pv-input-text
              type="text"
              id="phone_name"
              v-model.trim="task.phone_name"
              required="true"
              autofocus
              :class="{'p-invalid':submitted && !task.phone_name}"/>
          <label for="phone_name">Phone's name</label>
          <small class="p-error" v-if="submitted && !task.phone_name">Cellphone is required.</small>
        </span>
      </div>

      <div class="field">
        <span class="p-float-label">
        <pv-textarea
           id="problem"
           v-model="task.problem"
           required="false"
          rows="2"
          cols="20"
        />
        <label for="problem">Phone's Problem</label>
        <small class="p-error" v-if="submitted && !task.problem">Problem is required.</small>
        </span>
      </div>

      <div class="contenedor-flexbox" >
        <div class="field">
        <span class="p-float-label">
        <pv-input-text
            type="text"
            id="components_to_use"
            v-model.trim="task.components_to_use"
            required="true"
            autofocus
            :class="{'p-invalid':submitted && !task.components_to_use}"/>
        <label for="components_to_use">Components</label>
        <small class="p-error" v-if="submitted && !task.components_to_use">Components are required.</small>
        </span>
        </div>
        <div class="field">
        <span class="p-float-label">
            <pv-input-number
                id="money"
                v-model="task.investment"
                required="trust"
                autofocus
                :class="{'p-invalid': submitted && !task.investment}"
            />
        <label for="money">Money Investment</label>
          <small class="p-error" v-if="submitted && !task.investment">Investment is required.</small>
        </span>
        </div>
        <div class="field">
          <pv-button
              icon="pi pi-inbox"
              class="p-button-text p-button-rounded"
              @click=""
          />
        </div>
      </div>

      <div  class="field">
      <span class="p-float-label">
        <pv-calendar
            id="delivery_day"
            v-model="task.delivery_day"
            requerided="true"
            autofocus
            :class="{'p-invalid':submitted && !task.delivery_day}"/>
          <label for="delivery_day">Delivery Date</label>
          <small class="p-error" v-if="submitted && !task.delivery_day">
            Date is required.
          </small>
      </span>
      </div>

      <div>
        <div class="field">
          <pv-progressbar  ref="progressBar" :value="task.value_progress"></pv-progressbar>
        </div>
      <div class="field">
        <span class="p-float-label">
            <pv-input-number
                id="value_progress"
                v-model="task.value_progress"
                required="trust"
                autofocus
                :class="{'p-invalid': submitted && !task.value_progress}"
                @input="updateProgressBar"
            />
        <label for="value_progress">Value Progress</label>
          <small class="p-error" v-if="submitted && !task.value_progress">Value is required.</small>
        </span>
      </div>
      </div>

      <div class="field">
        <pv-dropdown
            id="finished"
            v-model="task.status"
            :options="statuses"
            optionLabel="label"
            placeholder="Select a Status"
        >
          <template #value="slotProps">
            <div v-if="slotProps.value && slotProps.value.value">
               <span :class="'task-badge status-' +
                slotProps.value.value">
                {{ slotProps.value.label}}
                 </span>
            </div>
            <div v-else-if="slotProps.value && !slotProps.value.value">
              <span :class=" 'task-badge status-' +
              slotProps.value.toLowerCase() ">
              {{ slotProps.value }}
                </span>
            </div>
            <span v-else>
              {{ slotProps.placeholder }}
            </span>
          </template>
        </pv-dropdown>
      </div>
      <template #footer>
        <pv-button
            :label="'Cancel'.toUpperCase()"
            icon="pi pi-times"
            class="p-button-text"
            @click="hideDialog"
        />
        <pv-button
            :label="'Save'.toUpperCase()"
            icon="pi pi-check"
            class="p-button-text"
            @click="saveTask"
        />
      </template>
    </pv-dialog>
    <pv-dialog
        v-model:visible="deleteTaskDialog"
        :style="{ width: '450px' }"
        header="Confirm"
        :modal="true"
    >
      <div class="confirmation-content">
        <i class="pi pi-exclamation-triangle mr-3" style="font-size:
2rem" />
        <span v-if="task">
Are you sure you want to delete <b>{{ task.client_name }}</b>?
</span>
      </div>
      <template #footer>
        <pv-button
            :label="'No'.toUpperCase()"
            icon="pi pi-times"
            class="p-button-text"
            @click="deleteTaskDialog = false"
        />
        <pv-button
            :label="'Yes'.toUpperCase()"
            icon="pi pi-check"
            class="p-button-text"
            @click="deleteTask"
        />
      </template>
    </pv-dialog>

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