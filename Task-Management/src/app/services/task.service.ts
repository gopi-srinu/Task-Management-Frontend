import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Task } from '../Model/model';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  constructor(private http: HttpClient) { }
  private apiUrl = 'http://localhost:3000';

  getTasks(): Observable<Task[]> {
    return this.http.get<Task[]>(`${this.apiUrl}/tasks`);
  }

  getTaskbyName(name: string): Observable<Task> {
    return this.http.get<Task>(`${this.apiUrl}/tasks/${name}`);
  }

  postTask(newTaskinformation: Task): Observable<Task> {
    console.log(newTaskinformation);
    return this.http.post<Task>(`${this.apiUrl}/tasks`, newTaskinformation);
  }

  deleteTask(taskName: string): Observable<Task> {
    return this.http.delete<Task>(`${this.apiUrl}/tasks/${taskName}`);
  }

  updateTask(editedTaskname: string, updatedTaskinformation: Task): Observable<Task> {
    console.log(updatedTaskinformation);
    return this.http.put<Task>(`${this.apiUrl}/tasks/${editedTaskname}`, updatedTaskinformation);
  }
}
