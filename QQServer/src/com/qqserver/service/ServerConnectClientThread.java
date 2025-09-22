package com.qqserver.service;
//该类的对象和某个客户端保持通信

import com.qqcommon.Message;
import com.qqcommon.MessageType;

import java.io.IOException;
import java.io.ObjectInputStream;
import java.io.ObjectOutputStream;
import java.net.Socket;
import java.util.HashMap;
import java.util.Iterator;

public class ServerConnectClientThread extends Thread{

    private Socket socket;
    private  String userId;  //连接到服务端的用户id

    public ServerConnectClientThread(Socket socket, String userId) {
        this.socket = socket;
        this.userId = userId;
    }

    public Socket getSocket(){
        return socket;
    }

    @Override
    //这里线程处于run的状态，可以发送/接收消息
    public void run(){
        while(true){
            try {
                System.out.println("服务端和客户端" + userId + "保持通讯，读取数据...");
                ObjectInputStream ois = new ObjectInputStream(socket.getInputStream());
                Message message = (Message) ois.readObject();

                //根据message类型，作相应业务处理
                if(message.getMesType().equals(MessageType.MESSAGE_GET_ONLINE_FRIEND)){
                    //客户端要在线用户列表
                    System.out.println("用户(" + message.getSender() + ")要在线用户列表");
                    String onlineUser = ManageClientThreads.getOnlineUser();
                    //构建一个Message对象，返回给客户端
                    Message message2 = new Message();
                    message2.setMesType(MessageType.MESSAGE_GET_ONLINE_FRIEND);
                    message2.setContent(onlineUser);
                    message2.setGetter(message.getSender());
                    //返回给客户端
                    ObjectOutputStream oos = new ObjectOutputStream(socket.getOutputStream());
                    oos.writeObject(message2);

                }else if(message.getMesType().equals(MessageType.MESSAGE_COMM_MES)){
                    //根据message获取getterId，然后从集合中得到服务端对应getter的线程
                    ServerConnectClientThread serverConnectClientThread =
                            ManageClientThreads.getServerConnectClientThread(message.getGetter());
                    //得到getter的socket的对象输出流，将message对象转发给指定的客户端
                    ObjectOutputStream oos = new ObjectOutputStream
                            (serverConnectClientThread.getSocket().getOutputStream());
                    //转发，如果getter的客户端不在线，可以保存到数据库，可以实现离线留言
                    oos.writeObject(message);

                }else if(message.getMesType().equals(MessageType.MESSAGE_TO_ALL_MES)){
                    //需要遍历管理线程的集合，把所有线程的socket都得到，然后把message进行转发
                    HashMap<String, ServerConnectClientThread> hm = ManageClientThreads.getHm();
                    Iterator<String> iterator = hm.keySet().iterator();
                    while(iterator.hasNext()){
                        //取出在线用户的id
                        String onlineUserId = iterator.next();
                        //排除群发消息的这个用户
                        if(!onlineUserId.equals(message.getSender())){
                            //进行转发message
                            ObjectOutputStream oos = new ObjectOutputStream
                                    (hm.get(onlineUserId).getSocket().getOutputStream());
                            oos.writeObject(message);
                        }
                    }

                }else if(message.getMesType().equals(MessageType.MESSAGE_FILE_MES)){
                    //根据message获取getterId，然后从集合中得到服务端对应getter的线程
                    ServerConnectClientThread serverConnectClientThread =
                            ManageClientThreads.getServerConnectClientThread(message.getGetter());
                    //得到getter的socket的对象输出流，将message对象转发给指定的客户端
                    ObjectOutputStream oos = new ObjectOutputStream
                            (serverConnectClientThread.getSocket().getOutputStream());
                    //转发
                    oos.writeObject(message);

                }else if(message.getMesType().equals(MessageType.MESSAGE_CLIENT_EXIT)){
                    System.out.println("用户(" + message.getSender() + ")退出");
                    //关闭连接，关闭该线程所持有的socket
                    socket.close();
                    //将这个客户端对应线程，从集合中删除
                    ManageClientThreads.removeServerConnectClientThread(message.getSender());
                    //退出while循环，退出run()方法，退出线程
                    break;

                }else{
                    System.out.println("其他类型message暂时不处理...");
                }

            } catch (Exception e) {
                e.printStackTrace();
            }
        }
    }
}
