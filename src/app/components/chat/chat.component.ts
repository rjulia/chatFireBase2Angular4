import { Component, OnInit } from '@angular/core';

import { ChatService } from "../../providers/chat.service";
import { messaging } from 'firebase/app';


@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styles: []
})
export class ChatComponent implements OnInit{

  alertSuccess:string ='';
  alertFaild:string = ''
  mensaje:string = '';
  elemento:any;
  constructor(public _cs: ChatService ) {

    this._cs.cargarMensajes().subscribe(
      ()=>{
        setTimeout(()=>{

          this.elemento.scrollTop = this.elemento.scrollHeight
        },20);
      }
    )
  }
  ngOnInit(){
    this.elemento = document.getElementById('app-mensajes')

  }
  enviarMensaje(){
    console.log(this.mensaje)

    if(this.mensaje.length === 0){
      return
    }

    this._cs.agregarMensaje(this.mensaje)
      .then(()=>{
          this.alertSuccess = 'sent successfully';
          this.mensaje = ' ';

          setTimeout(()=>{
            this.alertSuccess = '';
          },1000);

      })
      .catch((err)=>{
        this.alertFaild = err;
        setTimeout(()=>{
          this.alertFaild = '';
        },1000);

    })


  }


}
