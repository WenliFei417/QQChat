package com.qqserver.service;
//该类用于管理和客户端通信的线程

import java.util.HashMap;
import java.util.Iterator;

public class ManageClientThreads {

    private static HashMap<String, ServerConnectClientThread> hm= new HashMap<>();

    //添加线程对象到hm集合
    public static void addClientThread(String userId, ServerConnectClientThread serverConnectClientThread){
        hm.put(userId, serverConnectClientThread);
    }

    //根据userId返回ServerConnectClientThread线程
    public static ServerConnectClientThread getServerConnectClientThread(String userId){
        return hm.get(userId);
    }

    //从集合中移除某个线程对象
    public static void removeServerConnectClientThread(String userId){
        hm.remove(userId);
    }

    //返回hm
    public static HashMap<String, ServerConnectClientThread> getHm(){
        return hm;
    }

    //编写方法，可以返回在线用户列表
    public static String getOnlineUser(){
        //遍历hashmap的key
        Iterator<String> iterator = hm.keySet().iterator();
        String onlineUserList = "";
        while(iterator.hasNext()){
            onlineUserList += iterator.next() + " ";
        }
        return onlineUserList;
    }

}
