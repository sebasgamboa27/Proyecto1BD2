import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  isInWalkingPage: boolean = true;
  isInVisualizingPage: boolean = false;

  constructor(private router: Router) { }

  ngOnInit(): void {
    console.log(this.isInWalkingPage);
  }

  goHome(){
    this.isInVisualizingPage = false;
    this.isInWalkingPage = true;
  }

  goToVisualizer(){
    this.isInWalkingPage = false;
    this.isInVisualizingPage = true;
    
  }

}
