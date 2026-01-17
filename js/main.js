/* ============================================================
   文件名: main.js
   描述: 包含 MathJax 配置、集合切换、图片预加载、底栏加载及初始化逻辑
   ============================================================ */

/* --- 1. MathJax 配置 (必须在 MathJax 库加载前定义) --- */
window.MathJax = {
    tex: { inlineMath: [['$', '$']] }
};

/* --- 2. 集合切换函数 (Tab Switching) --- */
function showCollection(collectionId, btnElement) {
    // 隐藏所有文章列表
    const lists = document.querySelectorAll('.article-list');
    lists.forEach(list => list.classList.remove('active'));
    
    // 显示目标列表
    const target = document.getElementById(collectionId);
    if (target) target.classList.add('active');

    // 移除所有按钮激活状态
    const btns = document.querySelectorAll('.collection-btn');
    btns.forEach(btn => btn.classList.remove('active'));
    
    // 激活当前按钮
    if (btnElement) btnElement.classList.add('active');
}

/* --- 3. 强制图片预加载函数 (Image Preloading) --- */
function preloadButtonImages() {
    const btns = document.querySelectorAll('.collection-btn');
    // console.log(`[System] 开始预加载 ${btns.length} 个按钮的图标...`);

    btns.forEach(btn => {
        const style = btn.getAttribute('style');
        if (!style) return;

        // 提取 url(...) 中的路径
        const matches = style.match(/url\(['"]?([^'"]+)['"]?\)/g);
        if (matches) {
            matches.forEach(urlFunc => {
                const src = urlFunc.replace(/url\(['"]?|['"]?\)/g, '');
                const img = new Image(); // 创建游离图片对象触发下载
                img.src = src;
            });
        }
    });
}

/* --- 4. 页面初始化统一入口 (DOMContentLoaded) --- */
window.addEventListener('DOMContentLoaded', () => {
    
    // A. 自动检查 URL 哈希并跳转 (例如 #data)
    const hash = window.location.hash.substring(1);
    if (hash) {
        // 通过 onclick 属性内容模糊匹配对应的按钮
        const targetBtn = document.querySelector(`button[onclick*="'${hash}'"]`);
        if (targetBtn) {
            showCollection(hash, targetBtn);
        }
    }

    // B. 执行图片预加载
    preloadButtonImages();

    // C. 加载底栏 (Footer)
    const footerPath = '../../footer.html'; 
    
    fetch(footerPath)
        .then(response => {
            if (!response.ok) throw new Error("Footer file not found");
            return response.text();
        })
        .then(data => {
            const placeholder = document.getElementById('footer-placeholder');
            if (placeholder) placeholder.innerHTML = data;
        })
        .catch(err => console.error('底栏加载失败:', err));
});