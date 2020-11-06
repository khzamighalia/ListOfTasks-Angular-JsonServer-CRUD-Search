import { Component, OnInit } from '@angular/core';
import { TaskService } from './../../services/task.service';
import { Task } from './../../models/task';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit {
  editForm = false;
  showForm= false;
  searchText ='';
  mytask :Task = {
      label : '',
      completed : false
    };
  tasks :Task[] = [];
  resulttasks :Task[] = [];

  constructor(private taskService: TaskService) { }

  ngOnInit(): void {
    this.getTasks();
  }
  getTasks(){
    this.taskService.findAll().subscribe(tasks => this.resulttasks = this.tasks = tasks)
  }
  deleteTask(id){
    return this.taskService.delete(id).subscribe(() => { this.tasks =this.tasks.filter(task => task.id!=id) })

  }
  persistTask(){
    this.taskService.persist(this.mytask).subscribe((task) => {this.tasks=[task,...this.tasks];
      this.resetTask();
      this.showForm =!this.showForm;
    })

  }
  resetTask(){
    this.mytask  = {
      label : '',
      completed : false
    };
  }
  toggleCompleted(task){
    this.taskService.completed(task.id,task.completed).subscribe(() => { task.completed=!task.completed;});
  }
  editTask(task){
    this.mytask=task;
    this.editForm=true;
    this.showForm =true;
  }
  updateTask(){
    this.taskService.update(this.mytask).subscribe((task) => { this.resetTask();
    this.editForm = false;
    
  })
  }
  searchTasks(){
    this.resulttasks = this.tasks.filter((task) => task.label.toLowerCase().includes(this.searchText.toLowerCase()))
  }
}
