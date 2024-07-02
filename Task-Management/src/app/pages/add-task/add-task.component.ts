import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from "../../components/navbar/navbar.component";
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { provideNativeDateAdapter } from '@angular/material/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { LocalStorageService } from '../../services/local-storage.service';
import { TaskService } from '../../services/task.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Task } from '../../Model/model';
@Component({
    selector: 'app-add-task',
    standalone: true,
    templateUrl: './add-task.component.html',
    styleUrl: './add-task.component.scss',
    providers: [provideNativeDateAdapter()],
    imports: [NavbarComponent, MatSelectModule, MatInputModule, MatFormFieldModule, MatDatepickerModule, FormsModule, ReactiveFormsModule]
})
export class AddTaskComponent implements OnInit {
    ngOnInit(): void {
        this.route.paramMap.subscribe((routeParams) => {
            this.editedTaskname = routeParams.get('name') || '';
            console.log(this.editedTaskname);
            if (this.editedTaskname == ':name') {
                this.editMode = false
            } else {
                this.editMode = true;
            }
            if (this.editMode) {
                this.service.getTaskbyName(this.editedTaskname).subscribe((selectedTask) => {
                    console.log(selectedTask);
                    this.taskForm.patchValue(selectedTask);
                })
            }
        })
    }
    taskForm!: FormGroup;
    editedTaskname!: string;
    editMode: boolean = false;
    constructor(private fb: FormBuilder, private localStorage: LocalStorageService, private service: TaskService, private router: Router, private route: ActivatedRoute) {
        this.taskForm = this.fb.group({
            taskId: Math.floor(Math.random() * 100) + 1,
            taskName: ['', Validators.required],
            taskDescription: ['', Validators.required],
            taskStartdate: ['', Validators.required],
            taskEnddate: ['', Validators.required],
            taskPrioritylevel: ['', Validators.required],
            taskCategory: ['', Validators.required]
        })
    }
    onSubmit(event: Event) {
        event.preventDefault();
        if (this.taskForm.valid) {
            console.log(this.taskForm.value);
            if (this.editMode) {
                this.service.updateTask(this.editedTaskname, this.taskForm.value).subscribe((newTask) => {
                    console.log("updatedTask>>>>>>>>>>>>>>>>>>>", newTask);
                })
                this.localStorage.setItem('task', JSON.stringify(this.taskForm.value));
                this.taskForm.reset();
                this.router.navigateByUrl('home');
            } else {
                this.service.postTask(this.taskForm.value).subscribe((postingTask) => {
                    console.log("postingTask", postingTask);
                    this.taskForm.reset();
                    this.router.navigateByUrl('home');
                })
            }
        } else {
            alert('Please Enter your details to submit the form!');
        }
    }
}