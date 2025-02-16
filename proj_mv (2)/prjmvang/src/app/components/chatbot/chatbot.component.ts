import { Component, OnInit } from '@angular/core';
import { ChatbotService } from './../../services/chatbot.service';

@Component({
  selector: 'app-chatbot',
  templateUrl: './chatbot.component.html',
  styleUrls: ['./chatbot.component.css']
})
export class ChatbotComponent implements OnInit {
  userId: string = 'user1';  
  userMessage: string = '';
  chatHistory: { sender: string, message: string }[] = [];

  constructor(private chatbotService: ChatbotService) {}

  ngOnInit(): void {}

  sendMessage(): void {
    if (this.userMessage.trim()) {
      // Add the user's message to the chat history
      this.chatHistory.push({ sender: 'User', message: this.userMessage });

      // Call the backend to get the bot's response
      this.chatbotService.talkToBot(this.userId, this.userMessage).subscribe(response => {
        // Ensure the response is correctly handled as text
        const botResponse = response && typeof response === 'string' ? response : 'Sorry, I couldn\'t understand.';
        this.chatHistory.push({ sender: 'Bot', message: botResponse });
        this.userMessage = '';  // Clear the input field
      }, error => {
        console.error('Error:', error);
        this.chatHistory.push({ sender: 'Bot', message: 'Sorry, there was an error. Please try again later.' });
      });
    }
  }
}
