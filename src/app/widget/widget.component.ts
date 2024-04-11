import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { Observable, catchError, from, map, of, tap, throwError, timer } from 'rxjs';
import { Task } from '../task.model';
import { WidgetDataService } from './widget-data.service';
import { WidgetErrorComponent } from './widget-error/widget-error.component';

@Component({
  selector: 'app-widget',
  standalone: true,
  imports: [
    MatIconModule,
    CommonModule,
    MatDividerModule,
    MatButtonModule,
    WidgetErrorComponent,
  ],
  templateUrl: './widget.component.html',
  styleUrls: ['./widget.component.scss'],
})
export class WidgetComponent implements OnInit {
  tasks$!: Observable<Task[]>;
  error: Error | null = null;

  constructor(private widgetData: WidgetDataService) {}

  ngOnInit(): void {
    this.tasks$ = this.widgetData.load().pipe(
      tap({
        error: (error) => {
          this.error = error;
          console.log(
            `Update component's 'error' property showing the error banner`
          );
        },
      }),
      catchError((error) => {
        // this.error = error;
        console.log(`Replacing the failed observable  with an empty array`);
        return of([]);
        // return throwError(() => new Error('error'))
      })
    )
  }

  addTask() {
    // ({} as any).someMethod();
    //??? Если в try происходит асинхронная операция типа setTimeout, то код в catch не отрабатывает и обработка ошибки уходит в глобальную область
    try {
      setTimeout(() => {
        this.widgetData.addTaskSync({ id: 0, title: 'New Task' });
      }, 0);
    } catch (error) {
      if (error instanceof Error) {
        this.error = error;
        throw error;
      }
    }
  }
}
