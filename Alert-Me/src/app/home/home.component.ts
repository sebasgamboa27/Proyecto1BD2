import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  isInWalkingPage: boolean = true;
  isInVisualizingPage: boolean = false;

  constructor() { }

  ngOnInit(): void {
    console.log(this.isInWalkingPage);
  }

}
