# QQChat (Java Socket Chat Project)

本项目是一个基于 **Java Socket** 的简易即时通讯系统，模仿 QQ 的基本功能，包含 **客户端 (QQClient)** 和 **服务端 (QQServer)** 两个部分。  
通过多线程和 I/O 流实现用户登录、私聊、群聊、消息收发及文件传输。

---

## 🚀 功能特性

- **用户登录 / 注销**
  - 客户端输入账号密码，向服务端验证
  - 服务端校验后允许用户上线

- **单人聊天**
  - 一个用户可以向另一个用户发送消息
  - 消息通过服务端转发

- **群聊功能**
  - 向所有在线用户广播消息

- **查看在线用户**
  - 客户端可以请求获取当前在线用户列表

- **文件传输**
  - 支持客户端之间通过服务端中转文件

---

## 📂 项目结构

```
QQChat/
│── QQClient/                # 客户端模块
│   ├── src/com/qqclient/
│   │   ├── service/         # 客户端业务逻辑（连接、消息、文件等）
│   │   ├── utils/           # 工具类
│   │   ├── view/            # 客户端界面交互（命令行界面）
│   │   └── qqcommon/        # 公共类（Message, User）
│
│── QQServer/                # 服务端模块
│   ├── src/com/qqserver/
│   │   ├── service/         # 服务端业务逻辑（线程管理、消息转发）
│   │   └── qqcommon/        # 公共类（与客户端共享）
│
│── out/                     # 编译后的 class 文件（可忽略）
│── .gitignore
│── README.md
```

---

## ⚙️ 技术栈

- **Java SE**
- **Socket / ServerSocket**（网络通信）
- **多线程**（支持多用户并发）
- **序列化**（对象传输）

---

## 🖥️ 运行方法

### 1. 启动服务端
进入 `QQServer` 模块，运行主类（比如 `QQServerMain` 或包含 `main()` 的服务端入口类）：

```bash
cd QQServer/src
javac com/qqserver/**/*.java
java com.qqserver.service.QQServer
```

服务端会启动并监听指定端口，等待客户端连接。

### 2. 启动客户端
进入 `QQClient` 模块，运行客户端主类（比如 `QQView`）：

```bash
cd QQClient/src
javac com/qqclient/**/*.java
java com.qqclient.view.QQView
```

然后在命令行输入账号、密码，进入客户端界面。

### 3. 功能演示
- 输入 `1` → 登录并进入二级菜单  
- 输入 `2` → 请求在线用户列表  
- 输入 `3` → 私聊（指定用户 ID）  
- 输入 `4` → 群发消息  
- 输入 `5` → 发送文件  
- 输入 `9` → 退出登录  

---

## 📌 注意事项

- 运行前请先启动 **QQServer**，再启动 **QQClient**。  
- `out/` 文件夹是 IDEA 自动生成的编译结果，可以忽略。  
- 账号密码在服务端中定义（比如 `HashMap` 中写死），需要自行修改。

---

## 🏗️ 后续改进

- 使用数据库保存用户信息（替代硬编码）  
- 使用 GUI 界面代替命令行交互  
- 支持更多消息类型（图片、语音等）  
- 优化异常处理与日志管理  

---

## 📜 License

MIT License © 2025 Wenli
