package com.qqclient.service;
//该类/对象，提供和消息相关的服务方法

import com.qqcommon.Message;
import com.qqcommon.MessageType;

import java.io.IOException;
import java.io.ObjectOutputStream;
import java.util.Date;

public class MessageClientService {

    public void sendMessageToOne(String content, String senderId, String getterId){
        //构建message
        Message message = new Message();
        message.setMesType(MessageType.MESSAGE_COMM_MES);
        message.setSender(senderId);
        message.setGetter(getterId);
        message.setContent(content);
        message.setSendTime(new Date().toString());  //发送时间设置到Message对象
        System.out.println("用户(" + senderId + ")对用户(" + getterId + ")说" + content);
        //发送给服务端
        try {
            //通过管理线程的集合，先根据用户Id找到对应线程，再获取该线程的socket输出流并构造对象输出流
            ObjectOutputStream oos = new ObjectOutputStream
                    (ManageClientConnectServerThread.getClientConnectServerThread(senderId)
                            .getSocket().getOutputStream());
            oos.writeObject(message);
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    public void sendMessageToAll(String content, String senderId){
        //构建message
        Message message = new Message();
        message.setMesType(MessageType.MESSAGE_TO_ALL_MES);
        message.setSender(senderId);
        message.setContent(content);
        message.setSendTime(new Date().toString());  //发送时间设置到Message对象
        System.out.println("用户(" + senderId + ")对大家说" + content);
        //发送给服务端
        try {
            //通过管理线程的集合，先根据用户ID找到对应线程，再获取该线程的socket输出流并构造对象输出流
            ObjectOutputStream oos = new ObjectOutputStream
                    (ManageClientConnectServerThread.getClientConnectServerThread(senderId)
                            .getSocket().getOutputStream());
            oos.writeObject(message);
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}
