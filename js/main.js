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
                time: 0,
                timerID: '',
                hour: '00',
                min: '00',
                sec: '00',
                disabled: false
            });
            this.taskTitle = '';
            this.taskDescription = '';
            this.showForm = false;
            localStorage.setItem('taskList', JSON.stringify(this.taskList));
        },
        startTimer(index) {
        	let sec, min, hour;

        	if (this.taskList[index].time === 0) {
        		sec = 0;
	            min = 0;
	            hour = 0;
        	}else {
        		sec = +this.taskList[index].sec;
        		min = +this.taskList[index].min;
        		hour = +this.taskList[index].hour;
        	}

        	this.taskList[index].disabled = true;

            this.taskList[index].timerID = setInterval(() => {
                sec++;
                this.taskList[index].time++;

                if (sec < 10) {
                    this.taskList[index].sec = '0' + sec;
                } else {
                    this.taskList[index].sec = sec;
                }

                if (min < 10) {
                    this.taskList[index].min = '0' + min;
                } else {
                    this.taskList[index].min = min;
                }

                if (hour < 10) {
                    this.taskList[index].hour = '0' + hour;
                } else {
                    this.taskList[index].hour = hour;
                }

                if (sec >= 60) {
                    min++;
                    sec = '00';
                }

                if (min >= 60) {
                    hour++;
                    min = '00';
                }

                localStorage.setItem('taskList', JSON.stringify(this.taskList));
            }, 1000);
        },
        pauseTimer(index) {
            console.log('pauseTimer ' + index);
            clearTimeout(this.taskList[index].timerID);
        	this.taskList[index].disabled = false;
        },
        stopTimer(index) {
            console.log('stopTimer ' + index);
            clearTimeout(this.taskList[index].timerID);
            this.taskList[index].time = 0;
            this.taskList[index].sec = '00';
            this.taskList[index].min = '00';
            this.taskList[index].hour = '00';
        	this.taskList[index].disabled = false;
        }
    },
    mounted() {
        if (localStorage.taskList) {
        	console.log('mounted');
            this.taskList = JSON.parse(localStorage.taskList);
        	
        	this.taskList.forEach(item => {
        		console.log(item);
        		item.disabled = false;
        	});
        }
    }
});