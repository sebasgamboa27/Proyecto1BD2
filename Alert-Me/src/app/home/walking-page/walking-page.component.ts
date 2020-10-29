import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-walking-page',
  templateUrl: './walking-page.component.html',
  styleUrls: ['./walking-page.component.css']
})
export class WalkingPageComponent implements OnInit {

  walkingTime: number = 0;
  @Input() customTime: number;
  isWalking: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

  changeWalkingTime(num: number){
    this.walkingTime = num;
  }

  customTimeSetter(){
    this.walkingTime = this.customTime;
  }

  startWalking(){
    this.isWalking = true;
  }

}
