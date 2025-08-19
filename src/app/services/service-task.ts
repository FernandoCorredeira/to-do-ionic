import { Injectable } from '@angular/core';
import { Preferences } from '@capacitor/preferences';

@Injectable({
  providedIn: 'root',
})
export class ServiceTask {
  private tasks: any[] = [];

  constructor() {}

  public async setTasks() {
    {
      await Preferences.set({
        key: 'task',
        value: JSON.stringify(this.tasks),
      });
    }
  }
  public getTasks(): Task[] {
    return this.tasks;
  }

  public addTask(value: string, date: string) {
    date = date.replace('-', '/');
    let task: Task = { value: value, date: new Date(date), done: false };
    this.tasks.push(task);
    //console.log(this.tasks)
    let resp = this.setTasks();
    console.log(resp);
  }

  public async delTask(index: number) {
    this.tasks.splice(index, 1);
    await this.setTasks();
  }

  public updateTask(index: number, value: string, date: string) {
    let task: Task = this.tasks[index];
    task.value = value;
    date = date.replace('-', '/');
    task.date = new Date(date);
    this.tasks.splice(index, 1, task);
  }

  public async getTasksToInterface() {
    const { value } = await Preferences.get({ key: 'task' });
    let teste: any[] = value ? JSON.parse(value) : [];

    if (teste && teste.length > 0) {
      for (let t of teste) {
        if (t.date != null) {
          t.date = t.date.substring(0, 10);
          t.date = t.date.replace(/-/g, '/');
        } else {
          t.date = '';
        }

        let task: Task = {
          value: t.value,
          date: new Date(t.date),
          done: t.done,
        };
        this.tasks.push(task);
        console.log(t);
      }
    } else {
      console.log('deu ruim');
    }
  }
}

export interface Task {
  value: string;
  date: Date;
  done?: boolean;
}
