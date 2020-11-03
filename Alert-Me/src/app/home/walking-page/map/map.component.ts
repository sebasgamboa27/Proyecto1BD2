import { Component, Input, OnInit, ViewChild } from '@angular/core';
import {AgmMap,MapsAPILoader } from '@agm/core';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {
  latitude: any;
  longitude: any;

  constructor(private apiloader:MapsAPILoader) { }

  @Input() lat: number;
  @Input() lng: number;
  @Input() zoom: number;
  getAddress: any;

  @ViewChild(AgmMap,{static: true}) public agmMap: AgmMap;

  ngOnInit(): void {
    this.getLocation()
    this.agmMap.triggerResize(true);
    this.zoom = 16;
  }

  getLocation(){
   
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position: Position) => {
        if (position) {
          this.lat = position.coords.latitude;
          this.lng = position.coords.longitude;
          this.getAddress=(this.lat,this.lng)
          console.log(position);
          
    
          this.apiloader.load().then(() => {
            let geocoder = new google.maps.Geocoder;
            let latlng = {lat: this.lat, lng: this.lng};
          
            geocoder.geocode({'location': latlng}, function(results) {
                if (results[0]) {
                  let currentLocation = results[0].formatted_address;
                  console.log(currentLocation);
                } else {
                  console.log('Not found');
                }
            });
          });
        }
      })
    }
  }


}
