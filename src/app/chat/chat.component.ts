import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { WebSocketService } from '../services/web-socket.service';
import { ChatMessageDto } from '../models/chatMessageDto';

@Component({
  selector: 'cf-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit, OnDestroy {

  constructor(public webSocketService: WebSocketService) { }
  name:string;
  isConnected:boolean=false;

  ngOnInit(): void {
    
  }
  connect(connectForm: NgForm){
    console.log(connectForm.value.user);
    this.name=connectForm.value.user;
    this.webSocketService.openWebSocket(connectForm.value.user);
    this.isConnected=true;
  }

  ngOnDestroy(): void {
    this.webSocketService.closeWebSocket();
  }

  sendMessage(sendForm: NgForm) {
    console.log("send from",sendForm.value.message);
    const chatMessageDto = new ChatMessageDto("sendMsg", sendForm.value.message,this.name,sendForm.value.to);
    console.log("chatMessageDto-->",chatMessageDto);
    this.webSocketService.sendMessage(chatMessageDto);
    sendForm.controls.message.reset();
  }
}
