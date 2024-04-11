import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { Task } from '../task.model';

@Injectable({
  providedIn: 'root',
})
export class WidgetDataService {
  constructor(private http: HttpClient) {}

  load() {
    return this.http
      .get<Task[]>(
        `https://jsonplaceholder.typicode.com/todosa?_start=0&_limit=3`
      )
      .pipe(
        catchError((error) => {
          console.warn('Error Handled by Widget Service ...');
          // Можем пробросить стандартную ошибку или вернуть новую со своим текстом
          // return throwError(() => error);
          return throwError(() => {
            console.warn('Error rethrown by Widget Service ...');
            return new Error(`Couldn't load data...`)
          });
        })
      );
  }

  addTaskSync(task: Task): Task | never {
    if (task.id === 0) {
      throw Error(`Value zero (0) is not allowed as a task id`);
    }
    return task;
  }
}
