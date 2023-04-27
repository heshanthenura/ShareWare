package com.heshanthenura.fileshare;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;


@Controller
public class MainController {
    @Autowired
    SimpMessagingTemplate simpMessagingTemplate;

    @RequestMapping(value = "/", method = RequestMethod.GET)
    public String Index() {
        return "index";
    }

    @RequestMapping(value = "/uploadToServer", method = RequestMethod.POST)
    public ResponseEntity<?> uploadToServer(@RequestParam("file") MultipartFile[] multipartFiles) throws IOException {

        for (MultipartFile multipartFile : multipartFiles) {
            File file = new File(System.getProperty("user.dir")+File.separator+"UPLOADS"+File.separator+multipartFile.getOriginalFilename());
            System.out.println(file.getAbsolutePath());
            multipartFile.transferTo(file);
            simpMessagingTemplate.convertAndSend("/topic/uploaded",multipartFile.getOriginalFilename());
        }


        return ResponseEntity.ok().build();
    }


}
