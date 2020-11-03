import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MapComponent } from './map/map.component';

@Component({
  selector: 'app-walking-page',
  templateUrl: './walking-page.component.html',
  styleUrls: ['./walking-page.component.css']
})
export class WalkingPageComponent implements OnInit {

  walkingTime: number = 0;
  @Input() customTime: number;
  isWalking: boolean = false;

  @ViewChild(MapComponent) map:MapComponent;

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
    this.map.startWalking(this.walkingTime);
  }

  stopWalking(){
    this.isWalking = false;
    console.log('stop walking, arrived');
  }

  

}
