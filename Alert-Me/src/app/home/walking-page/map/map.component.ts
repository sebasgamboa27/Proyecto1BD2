import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import {AgmMap,MapsAPILoader } from '@agm/core';
import { DatabaseService } from 'src/app/database.service';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {

  constructor(private apiloader:MapsAPILoader,private database: DatabaseService) { }

  currentAdressString: string;
  @Input() lat: number;
  @Input() lng: number;
  @Input() zoom: number;
  getAddress: any;
  @Input() isWalking: boolean;
  @Output() stop = new EventEmitter<boolean>();

  timeLeft: number;
  minutesLeft: number;
  secondsLeft: number;

  minString: number;
  secString: number;

  timeInterval: any;

  ID: string;

  feedback: string = '';
  feedbackModalState: boolean = false;




  @ViewChild(AgmMap,{static: true}) public agmMap: AgmMap;

  ngOnInit(): void {
    this.getLocation()
    this.agmMap.triggerResize(true);
    this.zoom = 16;
    this.ID = '_' + Math.random().toString(36).substr(2, 9);
  }

  async getLocation(){

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(async (position: Position) => {
        if (position) {
          this.lat = position.coords.latitude;
          this.lng = position.coords.longitude;
          this.getAddress=(this.lat,this.lng)
          console.log(position);


          this.apiloader.load().then(() => {
            let geocoder = new google.maps.Geocoder;
            let latlng = {lat: this.lat, lng: this.lng};
            let that = this;

            geocoder.geocode({'location': latlng}, (results, status) => {
                if (results[0]) {
                  let currentLocation = results[0].formatted_address;
                  this.currentAdressString = currentLocation;

                  console.log(this.currentAdressString);

                  //esta es la llamada para la base de datos
                  let newAddressString = this.currentAdressString.split(', ');
                  console.log(newAddressString,'yesss');
                  let province = newAddressString[1];
                  let canton = newAddressString[2];

                  let status = 'In Progress';

                  if(!this.isWalking){
                    status = 'Finished';
                  }

                  console.log([this.ID,this.lat.toString(),this.lng.toString(),province,canton],'Esto se envia a la bd');
                  this.database.insertLocation(this.ID,this.lat.toString(),this.lng.toString(),province,canton,status,' ');
                } else {
                  console.log('Not found');
                }
            });

          });
        }

      })
    }
  }


  //aqui esta la funcion con el timer

  startWalking(max: number){

    console.log('estoy caminando',max);

    let interval = 12;

    let timeXminute = 60 / interval;

    this.timeLeft = max * 60;

    this.timeInterval = setInterval(this.decreaseTime, 1000,this);

    for (let i = 0; i < max * timeXminute; i++) {
      setTimeout(() => {
        if(i+1 >= max * timeXminute || !this.isWalking ){
          this.stop.emit(false);
        }
        else{
          this.getLocation();
        }

      }, interval * 1000 * i);
    }

  }

  decreaseTime(that: any){

    that.minutesLeft = Math.floor(that.timeLeft / 60);
    that.secondsLeft = that.timeLeft % 60;

    that.minString = that.minutesLeft.toString().padStart(2,'0');
    that.secString = that.secondsLeft.toString().padStart(2,'0');


    if(that.timeLeft === 0){
      clearInterval(that.timeInterval);
    }
    else{
      that.timeLeft-= 1;

    }
  }

}
