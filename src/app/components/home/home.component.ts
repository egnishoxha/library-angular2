import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";
import { User } from "../../dataModel/User";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  phones: any[] = [];
  cars: any[] = [];
  computers: any[] = [];
  item: string;
  arr:any[] = [];

  currentUser: User; 

  constructor(
      private _route: ActivatedRoute,
      private _router: Router,
  ) { 
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
  }

  ngOnInit() {
      this.item = "car";
      
      this.arr = this.cars;
      this.phones = [
          "nokia",
          "samsung",
          "asus",
          "apple"
      ];

      this.cars = [
          "volkswagen",
          "mercedes",
          "peugeot",
          "renault",
          "opel"
      ];
      
      this.computers = [
          "dell",
          "hp",
          "lenovo",
          "acer"
      ];
  }

}
