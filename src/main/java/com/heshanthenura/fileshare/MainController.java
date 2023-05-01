package com.heshanthenura.fileshare;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.InputStreamResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.multipart.MultipartFile;

import java.io.*;


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

    @RequestMapping(value = "/downloadFromServer/{fileName:.+}",method = RequestMethod.GET)
    public ResponseEntity<InputStreamResource> downloadFromServer(@PathVariable("fileName") String fileName) throws IOException {
        System.out.println("Download");
        System.out.println(fileName);
        File file = new File(System.getProperty("user.dir")+File.separator+"UPLOADS"+File.separator+fileName);
        System.out.println(file.getAbsolutePath());

        InputStreamResource resource = new InputStreamResource(new FileInputStream(file));

        HttpHeaders headers = new HttpHeaders();
        headers.add("Cache-Control", "no-cache, no-store, must-revalidate");
        headers.add("Pragma", "no-cache");
        headers.add("Expires", "0");
        return ResponseEntity.ok()
                .headers(headers)
                .contentLength(file.length())
                .contentType(MediaType.APPLICATION_OCTET_STREAM)
                .body(resource);
    }


}
