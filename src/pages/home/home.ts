import { Attendance } from './../../models/Attendance';

import { Component, NgZone  } from '@angular/core';
import { NavController, ToastController } from 'ionic-angular';

//ble plugin
import { BLE } from '@ionic-native/ble';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  // deviceObj:Attendance = {
  //   id: '',
  //   attendance:false
  // };
  deviceList = {
    qwerty123: {
      attendance: false
    },
    zxcvb123: {
      attendance: false
    },
    LKLFXHlnim75fzNeUxw: {
      attendance:false
    },
    F1: {
      attendance:false
    }    
  };
  // device;
  // device1;



  devices: any[] = [];
  statusMessage: string;

  // device = {
  //   name
  // }


  constructor(
    private navCtrl: NavController,
    private toastCtrl: ToastController,
    private ble: BLE,
    private ngZone: NgZone
  ) {


  }

  scan() {
    this.setStatus('Scanning for Bluetooth LE Devices');
    this.devices = [];  // clear list
    this.ble.scan([], 5).subscribe(
      device => this.onDeviceDiscovered(device), 
      error => this.scanError(error)
    );

    setTimeout(this.setStatus.bind(this), 5000, 'Scan complete');
  }

  onDeviceDiscovered(device) {
    console.log('Discovered ' + JSON.stringify(device, null, 2));
    this.ngZone.run(() => {
      
      let test = device.name;
      if(this.deviceList[test]){
        console.log('Matched'+ device.name);
        Object.assign(this.deviceList[test], {attendance: true});
        console.log(this.deviceList);
        if(this.deviceList[test].attendance == true){
          console.log('True yey!');
        }
      }
      else {
        console.log('No matches'+ device.name);

      }
      this.devices.push(device);
    });
  }

  // If location permission is denied, you'll end up here
  scanError(error) {
    this.setStatus('Error ' + error);
    let toast = this.toastCtrl.create({
      message: 'Error scanning for Bluetooth low energy devices',
      position: 'middle',
      duration: 5000
    });
    toast.present();
  }

  setStatus(message) {
    console.log(message);
    this.ngZone.run(() => {
      this.statusMessage = message;
    });
  }

  // logic(){
  //   this.device = 'LKLFXHlnim75fzNeUxw';
  //   this.device1 = {
  //     asdf123: {
  //       attendance: false
  //     }  
  //   };
  //   if(this.deviceList[this.device]){
  //     console.log('Matched');
  //     Object.assign(this.deviceList[],this.device1);
  //     console.log(this.deviceList);
  //   }
  //   else {
  //     console.log('No matches')
  //   }
  // }
}
