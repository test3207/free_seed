# free_seed

这个repo主要是写给自己用的，需要一定的编程基础，不适合所有pter。开源只是给有能力的朋友用的，本人不对代码负责，也不保证以后一定会更新出给代码零基础的朋友用的版本。勿催勿扰。

## 更新信息

[查看](https://github.com/test3207/free_seed/blob/main/changelog.md)

## 用法

首次使用需要安装node.js，仅支持18及以上版本。在[这里](https://nodejs.org/en/)找到最新版本下载，自行安装。

当前仅支持qbittorrent，在[这里](https://www.qbittorrent.org/download.php)自行下载。目前qt6版本有bug，请用qt5版本。

安装qb后，还需要手动打开webui。目前默认写死下载地址为`D:\pt`，你可能需要手动新建这个文件夹。

以下命令可在任意命令行完成，比如cmd/powershell。直接在开始菜单搜索，并右键使用管理员权限打开即可。

你可以自行选择路径，如果你不知道什么是路径，也可以暂时不用管这条。

克隆这个repo：`git clone https://github.com/test3207/free_seed.git`

后续请尽量使用release分支，main分支随时开发中，可能有问题。当然这一版是能用的，暂时就不折腾release了。

首次使用需要运行`npm i`安装依赖，需要一点点时间。

这里有一定概率无法安装，但是这是npm的bug，鄙人无能为力。

在`src\Config`文件夹内新建一个文件，名为`local.json`，内容首先复制`default.json`，`trackerHeaders`填写pt站对应的header，`passkey`填写对应的passkey，`qbittorrentHeaders`填写qb对应的header。header的获取方式为：

使用chrome打开pt站，按F12，点击`Network`，点击种子列表页面，这时候右边应该会出现一个`torrent.php`的项，右键这个项，选择copy->Copy request headers。这时候就可以删掉`local.json`中对应项目的大括号，并粘贴拿到的headers。qb的header获取方式类似。

`npm run dev` 运行。每次下载时会在命令行展示当次下载的种子信息，你可以通过观察面板信息确认是否成功。之后就会一直运行。当你关闭这个窗口或者关机的时候，自动下载就停止了。你需要再次运行`npm dev`来启动。

## 工作流程

每半小时获取首页feed流，解析筛选可用的免费种子，只筛选出尚未出种，且种子体积在100gb以下，且剩余免费时间大于2小时的种子。

将种子地址发送到qbittorrent的web端，开始下载。

## 一键保种

仅适用于tlf，运行 `npm run tlf`，自动下载符合保种条件的500GB种子。注意！此脚本只需要跑一次，另外脚本不识别免费种，注意流量。
