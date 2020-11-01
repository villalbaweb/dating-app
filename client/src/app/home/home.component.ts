import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  registerMode: boolean = false;
  users: any;

  constructor(private _httpClient: HttpClient) { }

  ngOnInit(): void {
    this.getUsers();
  }

  registerToggle() {
    this.registerMode = !this.registerMode;
    console.log(this.registerMode);
  }

  getUsers() {
    this._httpClient.get('https://localhost:5001/api/users')
      .subscribe(response => {
        this.users = response;
      },
      error => {
        console.log(error);
      });
  }

}
