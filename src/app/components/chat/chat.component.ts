import { Component } from '@angular/core';

import { ChatService } from "../../providers/chat.service";
import { messaging } from 'firebase/app';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styles: []
})
export class ChatComponent{

  mensaje:string = ''
  constructor(public _cs: ChatService ) {

    this._cs.cargarMensajes().subscribe(
     (mensajes:any[]) =>{
       console.log(mensajes)
     }
    )
  }

  enviarMesaje(){
    console.log(this.mensaje)
  }

}
