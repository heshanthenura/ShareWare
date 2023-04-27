package com.heshanthenura.fileshare.WebSocket;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;

import java.io.File;

@Controller
public class WebSocketController {

    @Autowired
    SimpMessagingTemplate simpMessagingTemplate;

    @MessageMapping("/listFiles")
    public void listFiles(String msg){
        System.out.println(msg);
        File folder = new File(System.getProperty("user.dir")+File.separator+"UPLOADS");
        File[] listOfFiles = folder.listFiles();
        for (File file: listOfFiles) {
            System.out.println(file.getName());
            simpMessagingTemplate.convertAndSend("/topic/listFiles/"+msg,file.getName());
        }
        System.out.println("Done Listing files");

    }

}
