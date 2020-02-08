import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.page.html',
  styleUrls: ['./user.page.scss'],
})
export class UserPage implements OnInit {
  token: string;

  constructor(
    private auth: AuthService
  ) { }

  ngOnInit() {
  }

  showToken() {
    this.token = this.auth.accessToken;
    console.log(this.token);
  }

}
