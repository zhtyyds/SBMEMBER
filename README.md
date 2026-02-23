# 🎵 音频下载站

一个简洁美观的音频文件下载页面，支持部署到 GitHub Pages。

## 📁 项目结构

```
.
├── index.html      # 主页面
├── style.css       # 样式文件
├── script.js       # 配置文件（添加音频信息）
├── audio/          # 音频文件存放目录
└── README.md       # 说明文档
```

## 🚀 快速开始

### 1. 添加音频文件

将你的音频文件（.mp3, .wav, .ogg 等）放入 `audio/` 文件夹。

### 2. 配置音频列表

编辑 `script.js` 文件，在 `audioFiles` 数组中添加你的音频信息：

```javascript
const audioFiles = [
    {
        name: "我的音乐",
        filename: "my-music.mp3",
        description: "这是一首很好听的音乐"
    },
    {
        name: "背景音乐",
        filename: "bgm.mp3",
        description: "适合用作背景音乐"
    }
];
```

### 3. 部署到 GitHub Pages

1. 在 GitHub 创建一个新仓库
2. 将所有文件上传到仓库
3. 进入仓库 **Settings** → **Pages**
4. Source 选择 **Deploy from a branch**
5. Branch 选择 **main** 和 **/(root)**
6. 点击 **Save**
7. 等待几分钟后，访问提供的链接即可

## 📝 自定义

### 修改网站标题

编辑 `index.html` 中的 `<title>` 和 `<h1>` 标签。

### 修改颜色主题

编辑 `style.css` 中的渐变色值：

```css
background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
```

## 📄 许可证

MIT License
