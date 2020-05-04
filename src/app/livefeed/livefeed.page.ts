import { Component, OnInit } from '@angular/core';
import { StreamingMedia, StreamingVideoOptions } from '@ionic-native/streaming-media/ngx';

@Component({
  selector: 'app-livefeed',
  templateUrl: './livefeed.page.html',
  styleUrls: ['./livefeed.page.scss'],
})
export class LivefeedPage implements OnInit {

  

  constructor(private streamingMedia: StreamingMedia) { }


 
  
 
  ngOnInit() {
   
  }


  startVideo(){
    let options: StreamingVideoOptions = {
      successCallback: () => { console.log('Video played') },
      errorCallback: (e) => { console.log('Error streaming') },
      orientation: 'portrait',
      shouldAutoClose: true,
      controls: false
    };

    
    this.streamingMedia.playVideo('http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4', options);
  console.log('Stream ')
  }

  

}
