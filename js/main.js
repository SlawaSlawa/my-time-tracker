'use strict';

const app = new Vue({
	el: '.app',
	data: {
		showForm: false,
		taskList: [],
		executedTaskList: [],
		taskTitle: '',
		taskDescription: '',
	},
	methods: {
		addTask() {
			console.log('add task');
			this.taskList.push({
				title: this.taskTitle,
				description: this.taskDescription
			});
			this.taskTitle = '';
			this.taskDescription = '';
			this.showForm = false;
			localStorage.setItem('taskList', JSON.stringify(this.taskList));
		}
	},
	mounted() {
   		if (localStorage.taskList) {
    		this.taskList = JSON.parse(localStorage.taskList);
    	}
  }
});

