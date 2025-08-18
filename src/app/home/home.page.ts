import { Component } from '@angular/core';
import {
  AlertController,
  PopoverController,
  ToastController,
} from '@ionic/angular';
import { ServiceTask, Task } from '../services/service-task';
import { PopoverComponent } from '../popover/popover.component';
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: false,
})
export class HomePage {
  type: string = 'pending';

  constructor(
    public alertController: AlertController,
    public serviceTask: ServiceTask,
    public toastController: ToastController,
    public popoverController: PopoverController,
  ) {}

    ngOnInit(): void {
      //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
      //Add 'implements OnInit' to the class.
      this.serviceTask.getTasksToInterface();
    }


  async presentAlertPromptAdd() {
    const alert = await this.alertController.create({
      header: 'Adicionar task',
      inputs: [
        {
          name: 'task',
          type: 'text',
          placeholder: 'Tarefa',
        },
        {
          name: 'date',
          type: 'date',
          min: '2025-01-01',
          max: '2037-01-01',
        },
      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
        },
        {
          text: 'Salvar',
          handler: (data) => {
            console.log('OK');
            if (data != '') this.serviceTask.addTask(data.task, data.date);
            else {
              this.presentToast();
              this.presentAlertPromptAdd();
            }
          },
        },
      ],
    });
    await alert.present();
  }

  async presentAlertPromptUpdate(index: number, task: Task) {
    const alert = await this.alertController.create({
      header: 'Atualizar tarefa',
      inputs: [
        {
          name: 'task',
          type: 'text',
          placeholder: 'Tarefa',
          value: task.value,
        },
        {
          name: 'date',
          type: 'date',
          min: '2025-01-01',
          max: '2037-01-01',
          value:
            task.date.getFullYear() +
            '-' +
            (task.date.getMonth() + 1 < 10
              ? '0' + task.date.getMonth() + 1
              : task.date.getMonth() + 1) +
            '-' +
            (task.date.getDay() + 1 < 10
              ? '0' + task.date.getDay()
              : task.date.getDay()),
        },
      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
        },
        {
          text: 'Salvar',
          handler: (data) => {
            console.log('OK');
            if (data != '')
              this.serviceTask.updateTask(index, data.task, data.date);
            else {
              this.presentToast();
              this.serviceTask.updateTask(index, data.task, data.date);
            }
          },
        },
      ],
    });
    await alert.present();
  }

  async presentAlertPromptDelete(index: number) {
    const alert = await this.alertController.create({
      header: 'Remover tarefa',
      message: 'Deseja realmente excluir a tarefa?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
        },
        {
          text: 'Excluir',
          handler: () => this.serviceTask.delTask(index),
        },
      ],
    });
    await alert.present();
  }

  async presentToast() {
    const toast = await this.toastController.create({
      message: 'Preencha os campos',
      duration: 2000,
    });
    toast.present();
  }
  async presentPopover(ev: any) {
    const popover = await this.popoverController.create({
      component: PopoverComponent,
      event: ev,
      translucent: true
    });

    return await popover.present();

  }
}
