# Reception System
- クライアントの入退室情報をRaspberry Pi 5側に通知
- Raspberry Pi 5側でLEDテープの点灯消灯を制御

# Installation
```bash
npm install
```

# Initialize
/jsonに`config.json`を作成  
IP, ポートを設定してください  

```json:config.json
{
    "CARD_READER_IP": "your ip address",
    "SERVER_PORT": 1111,
    "RASPBERRY_PI_IP": "your raspberry pi ip",
    "RASPBERRY_PI_PORT": 1111
}
```

# Usage
フロントエンド側  
- index.htmlをLive Serverで起動  
<br>
バックエンド側

```bash
# /backendディレクトリに移動

user@userMacBook-Air ReceptionSystem% cd ./backend

# nodeサーバを起動
# SERVER_PORTはユーザ設定のポート番号 
user@userMacBook-Air ReceptionSystem/backend% node index.js
Example app listening on port SERVER_PORT

# Control + Cでサーバ停止
^C
```
