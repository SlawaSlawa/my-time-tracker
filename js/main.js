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
                utcTime: 0,
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
        deleteTask(index) {
            console.log('deleteExecutedTask');
            clearTimeout(this.taskList[index].timerID);
            this.taskList.splice(index, 1);
            localStorage.setItem('taskList', JSON.stringify(this.taskList));
        },
        startTimer(index) {
            console.log('startTimer');
            let sec, min, hour;

            this.taskList[index].utcTime = new Date().getTime();

            if (this.taskList[index].time === 0) {
                sec = 0;
                min = 0;
                hour = 0;
            } else {
                sec = +this.taskList[index].sec;
                min = +this.taskList[index].min;
                hour = +this.taskList[index].hour;
            }

            this.taskList[index].disabled = true;

            this.taskList[index].timerID = setInterval(() => {
                this.taskList[index].time++;
                this.taskList[index].utcTime += 1000;

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

                if (sec >= 59) {
                    min++;
                    sec = '00';
                }

                if (min >= 59) {
                    hour++;
                    min = '00';
                }

                sec++;
                
                localStorage.setItem('taskList', JSON.stringify(this.taskList));
            }, 1000);
        },
        pauseTimer(index) {
            console.log('pauseTimer');
            clearTimeout(this.taskList[index].timerID);
            this.taskList[index].disabled = false;
            localStorage.setItem('taskList', JSON.stringify(this.taskList));
        },
        stopTimer(index) {
            console.log('stopTimer');
            clearTimeout(this.taskList[index].timerID);
            this.taskList[index].time = 0;
            this.taskList[index].sec = '00';
            this.taskList[index].min = '00';
            this.taskList[index].hour = '00';
            this.taskList[index].disabled = false;
            this.taskList[index].timerID = '';
            localStorage.setItem('taskList', JSON.stringify(this.taskList));
        },
        addExecutedTask(index) {
            console.log('addExecutedTask');
            this.executedTaskList.unshift(this.taskList[index]);
            clearTimeout(this.taskList[index].timerID);
            this.taskList.splice(index, 1);
            localStorage.setItem('taskList', JSON.stringify(this.taskList));
            localStorage.setItem('executedTaskList', JSON.stringify(this.executedTaskList));
        },
        deleteExecutedTask(index) {
            this.executedTaskList.splice(index, 1);
            localStorage.setItem('executedTaskList', JSON.stringify(this.executedTaskList));
        },
        returnExecutedTask(index) {
            this.executedTaskList[index].disabled = false;
            this.taskList.push(this.executedTaskList[index]);
            this.executedTaskList.splice(index, 1);
            localStorage.setItem('taskList', JSON.stringify(this.taskList));
            localStorage.setItem('executedTaskList', JSON.stringify(this.executedTaskList));
        },
        setDateForTimer(task) {
            console.log('setDateForTimer');
            const currentTime = new Date().getTime();
            const startTimerTime = currentTime - task.utcTime;

            let seconds = Math.floor((startTimerTime / 1000) % 60);
            let minutes = Math.floor((startTimerTime / (1000 * 60)) % 60);
            let hours = Math.floor((startTimerTime / (1000 * 60 * 60)) % 24);

            task.hour = +task.hour;
            task.min = +task.min;
            task.sec = +task.sec;

            task.hour += +hours;
            task.min += +minutes;
            task.sec += +seconds;

            if (task.sec >= 60) {
                task.min++;
                task.sec -= 60;
            }

            if (task.min >= 60) {
                task.hour++;
                task.min -= 60;
            }

            task.hour = (task.hour < 10) ? "0" + task.hour : task.hour;
            task.min = (task.min < 10) ? "0" + task.min : task.min;
            task.sec = (task.sec < 10) ? "0" + task.sec : task.sec;

            localStorage.setItem('taskList', JSON.stringify(this.taskList));
        }
    },
    mounted() {
        console.log('mounted');
        if (localStorage.taskList) {
            this.taskList = JSON.parse(localStorage.taskList);
            if (this.executedTaskList.length !== 0) {
                this.executedTaskList = JSON.parse(localStorage.executedTaskList);
            }

            this.taskList.forEach(item => {
                this.taskList.forEach((item, index) => {

                    this.setDateForTimer(item);

                    if (item.disabled === true) {
                        this.startTimer(index);
                    }
                });
            });
        }
    }
});