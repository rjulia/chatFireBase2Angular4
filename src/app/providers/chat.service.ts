import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';

import { Mensaje } from "../interface/mensaje.interface";

import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';

@Injectable()
export class ChatService {

  private itemsCollection: AngularFirestoreCollection<Mensaje>;

  public chats: Mensaje[]=[];
  public usuario: any = {};

  constructor(private afs: AngularFirestore,
    public afAuth: AngularFireAuth) {
      this.afAuth.authState.subscribe(user =>{
        console.log('estado del usuario ', user)
        if(!user){
          return
        }

        this.usuario.nombre = user.displayName;
        this.usuario.uid = user.uid;
        this.usuario.photoURL = user.photoURL
      })
  }

  login(proveedor:string) {

    if(proveedor === 'google'){
      this.afAuth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
    }else {
      this.afAuth.auth.signInWithPopup(new firebase.auth.TwitterAuthProvider());
    }

  }
  logout() {
    this.usuario = {}
    this.afAuth.auth.signOut();
  }

  cargarMensajes(){
    this.itemsCollection = this.afs.collection<Mensaje>('chats',
      ref => ref.orderBy('data', 'desc')
      .limit(5));

    return this.itemsCollection.valueChanges()
      .map( (mensajes:Mensaje[]) => {
        console.log(mensajes);

        this.chats=[];
        for(let mensaje of mensajes){
          this.chats.unshift(mensaje)
        }
        return this.chats;
    })
  }

  agregarMensaje(texto:string){

    //todo del Id
    let mensaje: Mensaje = {
      nombre: this.usuario.nombre,
      mensaje: texto,
      data: new Date().getTime(),
      uid:this.usuario.uid
    }

    return this.itemsCollection.add(mensaje);
  }

}
