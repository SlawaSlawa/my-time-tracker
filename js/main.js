'use strict';

const app = new Vue({
	el: '.app',
	data: {
		showForm: false,
		taskList: [],
		executedTaskList: [],
		taskTitle: '',
		taskDescription: ''
	},
	methods: {
		addTask() {
			console.log('add task');
			this.taskList.push({
				title: this.taskTitle,
				description: this.taskDescription,
				time: '0',
				timerID: ''
			});
			this.taskTitle = '';
			this.taskDescription = '';
			this.showForm = false;
			localStorage.setItem('taskList', JSON.stringify(this.taskList));
		},
		startTimer(index) {
			this.taskList[index].timerID = setInterval(() => {
				this.taskList[index].time++;
			}, 1000);
			console.log(this.taskList[index].timerID);
		},
		pauseTimer(index) {
			console.log('pauseTimer ' + index);
			clearTimeout(this.taskList[index].timerID);
		},
		stopTimer(index) {
			console.log('stopTimer ' + index);
			clearTimeout(this.taskList[index].timerID);
			this.taskList[index].time = 0;
		}
	},
	mounted() {
   		if (localStorage.taskList) {
    		this.taskList = JSON.parse(localStorage.taskList);
    	}
  }
});

