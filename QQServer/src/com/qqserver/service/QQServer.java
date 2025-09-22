package com.qqserver.service;
//这是服务器，在监听9999，等待客户端的连接，并保持通信

import com.qqcommon.Message;
import com.qqcommon.MessageType;
import com.qqcommon.User;

import java.io.IOException;
import java.io.ObjectInputStream;
import java.io.ObjectOutputStream;
import java.net.ServerSocket;
import java.net.Socket;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.concurrent.ConcurrentHashMap;

public class QQServer {

    private ServerSocket ss = null;
    //创建一个集合，存放多个用户，如果是这些用户登录，就认为是合法的
    //这里也可以使用ConcurrentHashMap，可以处理并发的集合，没有线程安全
    private static ConcurrentHashMap<String, User> validUsers = new ConcurrentHashMap<>();
    //拓展离线接收消息功能，offlineDb存放离线消息
    //private static ConcurrentHashMap<String, ArrayList<Message>> offlineDb = new ConcurrentHashMap<>();

    //在静态代码块，初始化validUsers
    static{
        validUsers.put("100", new User("100", "123456"));
        validUsers.put("200", new User("200", "123456"));
        validUsers.put("300", new User("300", "123456"));
        validUsers.put("Tom", new User("Tom", "123456"));
        validUsers.put("Jerry", new User("Jerry", "123456"));
    }
    //验证用户是否有效的方法
    private boolean checkUser(String userId, String passwd){
        User user = validUsers.get(userId);
        if(user == null){  //说明userId没有存在validUsers的key中
            return false;
        }
        if(!user.getPasswd().equals(passwd)){  //userId存在，但密码错误
            return false;
        }
        return true;
    }

    public QQServer(){
        //注意，端口可以写在配置文件
        try {
            System.out.println("服务端在9999端口监听...");
            //启动推送新闻的线程
            new Thread(new SendNewsToAllService()).start();
            ss = new ServerSocket(9999);
            //当和某个客户端建立连接后，会循环监听，因此用while
            while (true) {
                //如果没有客户端来连接服务端，则会阻塞在这里
                Socket socket = ss.accept();
                //得到socket关联的对象输入流
                ObjectInputStream ois = new ObjectInputStream(socket.getInputStream());
                //得到socket关联的对象输出流
                ObjectOutputStream oos = new ObjectOutputStream(socket.getOutputStream());
                //读取客户端发送的User对象
                User u = (User)ois.readObject();
                //创建一个Message对象，准备回复客户端
                Message message = new Message();
                //验证
                if(checkUser(u.getUserId(), u.getPasswd())){  //登录成功
                    message.setMesType(MessageType.MESSAGE_LOGIN_SUCCEED);
                    //将message对象回复给客户端
                    oos.writeObject(message);
                    //登录成功，要创建一个线程和客户端保持通信，该线程需要持有socket对象
                    ServerConnectClientThread serverConnectClientThread =
                            new ServerConnectClientThread(socket, u.getUserId());
                    //启动该线程
                    serverConnectClientThread.start();
                    //把线程对象放入一个集合中，进行管理
                    ManageClientThreads.addClientThread(u.getUserId(), serverConnectClientThread);

                }else{  //登录失败
                    System.out.println("用户(" + u.getUserId() + ")验证失败");
                    message.setMesType(MessageType.MESSAGE_LOGIN_FAIL);
                    oos.writeObject(message);
                    //登录失败，要关闭socket
                    socket.close();
                }
            }
        } catch (Exception e) {
            throw new RuntimeException(e);
        } finally {
            //如果服务端退出while循环，说明服务端不再监听，因此关闭ServerSocket
            try {
                ss.close();
            } catch (IOException e) {
                throw new RuntimeException(e);
            }
        }
    }
}
