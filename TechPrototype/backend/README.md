# AI-assistant(UniGPT) 后端仓库
## 组员信息

1. 陈启炜   522031910299
2. 叶懿芯   520030910136
3. 韦东良   522031910516
4. 黄峻涛   522031910456

## 描述
与[UniGPT前端](https://github.com/kiwi142857/ISE-AI-assistant-Frontend)配合使用
## 配置环境变量
```
export DB_URL="jdbc:mysql://10.119.12.131:3306/unigpt"
export DB_USERNAME="xxx"
export DB_PASSWORD="xxx"
export OPENAI_API_BASE_URL="https://api.chatgptid.net"
export OPENAI_API_KEY="sk-OhenOiFqJC5rjzCI5793C1B0B7804bF3967eB776847809E2"
```
## 运行
Linux 和 MacOS:
```
./mvnw spring-boot:run
``` 
Windows:
```
./mvnw.cmd spring-boot:run
```
后端URL为http://localhost:8080
## 构建
Linux 和 MacOS:
```
./mvnw package
```
Windows:
```
./mvnw.cmd package
```
