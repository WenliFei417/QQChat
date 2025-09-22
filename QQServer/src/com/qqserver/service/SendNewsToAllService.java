package com.qqserver.service;

import com.qqcommon.Message;
import com.qqcommon.MessageType;
import com.utils.Utility;

import java.io.IOException;
import java.io.ObjectOutputStream;
import java.util.*;

public class SendNewsToAllService implements Runnable{

    @Override
    public void run(){

        //为了可以多次推送新闻，使用while循环
        while(true) {
            System.out.println("请输入服务器要推送的新闻[输入exit退出推送服务线程]: ");
            String news = Utility.readString(100);
            if("exit".equals(news)){
                break;
            }
            //构建一个消息，群发消息
            Message message = new Message();
            message.setSender("服务器");
            message.setMesType(MessageType.MESSAGE_TO_ALL_MES);
            message.setContent(news);
            message.setSendTime(new Date().toString());
            System.out.println("服务器推送新闻给所有人，说: " + news);
            //遍历当前所有通信线程，得到socket，并发送message
            HashMap<String, ServerConnectClientThread> hm = ManageClientThreads.getHm();
            Iterator<String> iterator = hm.keySet().iterator();
            while (iterator.hasNext()) {
                String onlineUserId = iterator.next();
                ServerConnectClientThread serverConnectClientThread = hm.get(onlineUserId);
                try {
                    ObjectOutputStream oos = new ObjectOutputStream
                            (serverConnectClientThread.getSocket().getOutputStream());
                    oos.writeObject(message);
                } catch (IOException e) {
                    e.printStackTrace();
                }
            }
        }
    }
}
