import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import {AgmMap,MapsAPILoader } from '@agm/core';
import { DatabaseService } from 'src/app/database.service';
import {Constants} from 'src/common/index'

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

  password: string;
  passwordShowState: boolean = false;
  failed: boolean = false;
  finishedWalk: boolean = false;
  @Input() typedPassword: string;

  feedback: string = '';
  feedbackModalState: boolean = false;




  @ViewChild(AgmMap,{static: true}) public agmMap: AgmMap;

  ngOnInit(): void 
  {
    this.getLocation()
    this.agmMap.triggerResize(true);
    this.zoom = Constants.MAP_ZOOM;
    this.ID = '_' + Math.random().toString(36).substr(2, 9); // TODO: Esto tiene que ser un GUID
    this.showModal();
    //this.password = Math.random().toString(36).substr(2, 9);
  }

  async getLocation()
  {

    if (navigator.geolocation)
    {
      navigator.geolocation.getCurrentPosition(
        async (position : Position) => 
        {
          if (position) 
          {
            this.lat = position.coords.latitude;
            this.lng = position.coords.longitude;
            this.getAddress = (this.lat, this.lng)
            console.log(position);
            this.apiloader.load()
            .then(
              () => 
              {
                let geocoder = new google.maps.Geocoder;
                let latlng = 
                {
                  lat: this.lat, lng: this.lng
                };
                let that = this;
                geocoder.geocode({'location': latlng}, 
                  (results, status) => 
                  {
                    if (results[0])
                    {
                      let currentLocation = results[0].formatted_address;
                      this.currentAdressString = currentLocation;

                      console.log(this.currentAdressString);

                      //esta es la llamada para la base de datos
                      let newAddressString = this.currentAdressString.split(Constants.LOCATION_SPLIT_CHARS);
                      console.log(newAddressString,'yesss');
                      
                      let province = newAddressString[Constants.PROVINCE_LOCATION_INDEX];
                      let canton = newAddressString[Constants.CANTON_LOCATION_INDEX];

                      let status = Constants.STATUS_INPROGRESS;

                      if(!this.isWalking)
                      {
                        status = Constants.STATUS_INPROGRESS;
                      }

                      console.log([this.ID,this.lat.toString(),this.lng.toString(),province,canton],'Esto se envia a la bd');
                      this.database.insertLocation(this.ID, this.lat.toString(), this.lng.toString(), province, canton, status, null);
                    } 
                    else 
                    {
                      console.log('Not found');
                    }
                  }
                );
              }
            );
          }
        }
      )
    }
  }


  startWalking(minutesQuantity: number)
  {

    console.log('estoy caminando',minutesQuantity);

    this.passwordShowState = true;

    setTimeout(
    () => 
    {
      this.passwordShowState = false;
    }
    , Constants.PASSWORD_SHOWN_TIME_MS);

    let interval = Constants.INSERTION_INTERVAL_SECONDS;

    let locationsPerMinute = 60 / interval;

    this.timeLeft = minutesQuantity * 60;

    this.timeInterval = setInterval(this.decreaseTime, 1000, this);

    for (let counter = 0; counter < minutesQuantity * locationsPerMinute; counter++) 
    {
      setTimeout(
        () => 
        {
          if(counter + 1 >= minutesQuantity * locationsPerMinute || !this.isWalking )
          {
            this.stop.emit(false);
            this.finishedWalk = true;
            this.showModal();
          }
          else
          {
            this.getLocation();
          }
        }
        ,interval * 1000 * counter);
    }
  }

  decreaseTime(that: any)
  {

    that.minutesLeft = Math.floor(that.timeLeft / 60);
    that.secondsLeft = that.timeLeft % 60;

    that.minString = that.minutesLeft.toString().padStart(2,'0');
    that.secString = that.secondsLeft.toString().padStart(2,'0');


    if(that.timeLeft === 0)
    {
      clearInterval(that.timeInterval);
    }
    else
    {
      that.timeLeft -= 1;
    }
  }

  showModal()
  {
    
    ($('#staticBackdrop')as any).modal('show'); 
  }

  checkPassword()
  {
    if(!this.isWalking && !this.finishedWalk)
    {
      this.password = this.typedPassword;
      $('#staticBackdrop')
      .on('hidden.bs.modal', 
        function (e) 
        {
          $(this)
            .find("input,textarea,select")
              .val('')
              .end()
            .find("input[type=checkbox], input[type=radio]")
              .prop("checked", "")
              .end();
        }
      )
    }
    else if(this.password === this.typedPassword)
    {
      console.log('listo')
    }
    else
    {
      console.log('incorrecta');
    }
  }
}
