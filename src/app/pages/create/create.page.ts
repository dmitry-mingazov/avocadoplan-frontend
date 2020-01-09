import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-create',
  templateUrl: './create.page.html',
  styleUrls: ['./create.page.scss'],
})
export class CreatePage implements OnInit {

  constructor(private alertController: AlertController) { }

  async confirm() {
    const alert = await this.alertController.create({
      header: 'Confrim',
      message: 'Do you want to confirm?',
      buttons: ['cancel', 'OK']
    });
    await alert.present();
  }

  ngOnInit() {
  }

}
