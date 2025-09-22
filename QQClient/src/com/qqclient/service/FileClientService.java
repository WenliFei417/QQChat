package com.qqclient.service;
//该类完成文件传输服务

import com.qqcommon.Message;
import com.qqcommon.MessageType;

import java.io.*;
import java.util.Date;

public class FileClientService {

    public void sendFileToOne(String src, String dest, String senderId, String getterId){

        //读取src文件，封装到message对象
        Message message = new Message();
        message.setMesType(MessageType.MESSAGE_FILE_MES);
        message.setSender(senderId);
        message.setGetter(getterId);
        message.setSrc(src);
        message.setDest(dest);

        //需要将文件读取
        FileInputStream fileInputStream = null;
        byte[] fileBytes = new byte[(int)new File(src).length()];
        try {
            fileInputStream = new FileInputStream(src);
            //将src文件读入到byte[]数组中
            fileInputStream.read(fileBytes);
            //将文件对应的字节数组设置到message对象
            message.setFileBytes(fileBytes);
        } catch (Exception e) {
            e.printStackTrace();
        }finally {
            //关闭
            if(fileInputStream != null){
                try {
                    fileInputStream.close();
                } catch (IOException e) {
                    e.printStackTrace();
                }
            }
        }
        //发送到服务端
        try {
            //通过管理线程的集合，先根据用户Id找到对应线程，再获取该线程的socket输出流并构造对象输出流
            ObjectOutputStream oos = new ObjectOutputStream
                    (ManageClientConnectServerThread.getClientConnectServerThread
                            (senderId).getSocket().getOutputStream());
            oos.writeObject(message);
        } catch (IOException e) {
            e.printStackTrace();
        }
        //提示信息
        System.out.println("\n用户(" + senderId + ")给用户(" + getterId + ")发送文件"
                + src + "到对方电脑目录: " + dest);
    }
}
