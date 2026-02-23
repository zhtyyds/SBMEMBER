const audioFiles = [
    {
         name: "原七里香伴奏",
         filename: "原七里香伴奏.mp3",
         description: "原七里香伴奏",
         icon: "🎸"
    },
    {
         name: "原七里香人声",
         filename: "原七里香人声.mp3",
         description: "原七里香人声",
         icon: "🎤"
    },
    {
         name: "周杰伦陈源是我儿",
         filename: "周杰伦陈源是我儿.mp3",
         description: "周杰伦陈源是我儿",
         icon: "icons/666.png"
    },
    {
         name: "AI曼波花海",
         filename: "AI曼波花海.mp3",
         description: "AI曼波花海",
         icon: "🌸"
    },
    {
         name: "AI周浩天年轮",
         filename: "AI周浩天年轮.mp3",
         description: "AI周浩天年轮",
         icon: "🌳"
    }
];

// 默认图标
const DEFAULT_ICON = "🎵";

// ============================================
// 获取图标 HTML
// 支持 emoji 和图片路径
// ============================================
function getIconHtml(icon) {
    if (!icon) {
        return DEFAULT_ICON;
    }
    
    // 如果是图片路径（包含 .png, .jpg, .jpeg, .gif, .svg, .webp）
    if (/\.(png|jpg|jpeg|gif|svg|webp)$/i.test(icon)) {
        return `<img src="${icon}" alt="icon" style="width: 30px; height: 30px; object-fit: cover; border-radius: 5px;">`;
    }
    
    // 否则返回 emoji 或文本
    return icon;
}

// 当前播放的音频索引
let currentAudio = null;

// ============================================
// 渲染音频列表
// ============================================
function renderAudioList() {
    const audioList = document.getElementById('audioList');
    
    if (audioFiles.length === 0) {
        audioList.innerHTML = `
            <div class="empty-state">
                <h3>暂无音频文件</h3>
                <p>请在 script.js 中添加音频文件配置，<br>并将音频文件放入 audio 文件夹</p>
            </div>
        `;
        return;
    }
    
    audioList.innerHTML = audioFiles.map((audio, index) => `
        <div class="audio-item" data-index="${index}">
            <div class="audio-info">
                <div class="audio-icon">${getIconHtml(audio.icon)}</div>
                <div class="audio-details">
                    <h3>${audio.name}</h3>
                    <p>${audio.description || audio.filename}</p>
                </div>
            </div>
            <div class="audio-actions">
                <button class="play-btn" onclick="togglePlay(${index})" data-index="${index}">
                    <span class="play-icon">▶️</span>
                    <span class="btn-text">播放</span>
                </button>
                <a href="audio/${audio.filename}" download class="download-btn">
                    <span>⬇️</span>
                    <span>下载</span>
                </a>
            </div>
        </div>
        <div class="audio-player-container" id="player-${index}" style="display: none;">
            <audio controls class="audio-player" preload="metadata">
                <source src="audio/${audio.filename}" type="audio/wav">
                您的浏览器不支持音频播放。
            </audio>
        </div>
    `).join('');
}

// ============================================
// 切换播放/暂停
// ============================================
function togglePlay(index) {
    const audioItem = document.querySelector(`.audio-item[data-index="${index}"]`);
    const playBtn = audioItem.querySelector('.play-btn');
    const playIcon = playBtn.querySelector('.play-icon');
    const btnText = playBtn.querySelector('.btn-text');
    const playerContainer = document.getElementById(`player-${index}`);
    const audioPlayer = playerContainer.querySelector('audio');
    
    // 如果点击的是当前正在播放的音频
    if (currentAudio === index) {
        if (audioPlayer.paused) {
            audioPlayer.play();
            playIcon.textContent = '⏸️';
            btnText.textContent = '暂停';
        } else {
            audioPlayer.pause();
            playIcon.textContent = '▶️';
            btnText.textContent = '播放';
        }
    } else {
        // 停止其他正在播放的音频
        if (currentAudio !== null) {
            const prevPlayerContainer = document.getElementById(`player-${currentAudio}`);
            const prevAudioItem = document.querySelector(`.audio-item[data-index="${currentAudio}"]`);
            if (prevPlayerContainer && prevAudioItem) {
                const prevAudioPlayer = prevPlayerContainer.querySelector('audio');
                const prevPlayBtn = prevAudioItem.querySelector('.play-btn');
                const prevPlayIcon = prevPlayBtn.querySelector('.play-icon');
                const prevBtnText = prevPlayBtn.querySelector('.btn-text');
                
                prevAudioPlayer.pause();
                prevAudioPlayer.currentTime = 0;
                prevPlayerContainer.style.display = 'none';
                prevPlayIcon.textContent = '▶️';
                prevBtnText.textContent = '播放';
            }
        }
        
        // 播放新音频
        currentAudio = index;
        playerContainer.style.display = 'block';
        
        // 确保音频元数据已加载后再播放
        if (audioPlayer.readyState >= 1) {
            audioPlayer.play();
            playIcon.textContent = '⏸️';
            btnText.textContent = '暂停';
        } else {
            audioPlayer.addEventListener('loadedmetadata', function() {
                audioPlayer.play();
                playIcon.textContent = '⏸️';
                btnText.textContent = '暂停';
            }, { once: true });
        }
        
        // 监听音频结束事件
        audioPlayer.onended = function() {
            playIcon.textContent = '▶️';
            btnText.textContent = '播放';
        };
        
        // 监听播放错误
        audioPlayer.onerror = function() {
            console.error('音频加载失败');
            playIcon.textContent = '▶️';
            btnText.textContent = '播放';
        };
    }
}

// 页面加载完成后渲染列表
document.addEventListener('DOMContentLoaded', renderAudioList);
