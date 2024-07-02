import { Component, OnInit } from '@angular/core';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { provideNativeDateAdapter } from '@angular/material/core';
import { FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { Task } from '../../Model/model';
import { TaskService } from '../../services/task.service';
import { NavbarComponent } from "../../components/navbar/navbar.component";
import { MatCardModule } from '@angular/material/card';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
@Component({
  selector: 'app-home',
  standalone: true,
  providers: [provideNativeDateAdapter()],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  imports: [MatSelectModule, MatInputModule, MatFormFieldModule, MatCardModule, MatButtonModule, MatDatepickerModule, FormsModule, ReactiveFormsModule, CommonModule, MatTableModule, NavbarComponent, RouterModule]
})
export class HomeComponent implements OnInit {
  ngOnInit(): void {
    this.getAlltasks();
  }
  constructor(private service: TaskService, private router: Router, private route: ActivatedRoute) { }
  tasks: Task[] = [];

  getAlltasks() {
    this.service.getTasks().subscribe((tasksList) => {
      this.tasks = tasksList;
    })
  }

  deleteElement(task: Task) {
    const index = this.tasks.indexOf(task);
    if (index > -1) {
      this.tasks.splice(index, 1);
    }
    this.service.deleteTask(task.taskName).subscribe((deletingElement) => {
      console.log(deletingElement);
    })
  }

  editTask(taskName: string, task: Task, Id: number) {
    this.router.navigateByUrl(`addTask/${task.taskName}`);
    this.service.getTaskbyName(taskName).subscribe((selectedTask) => {
      console.log(selectedTask);
    })
  }
}
