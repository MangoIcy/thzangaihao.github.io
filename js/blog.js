/* ============================================================
   文件名: article.js
   描述: 博客文章页专用脚本 (MathJax配置 + 底栏加载)
   ============================================================ */

/* --- 1. MathJax 配置 --- */
// 必须在加载 MathJax 库之前定义
window.MathJax = {
    tex: {
        inlineMath: [['$', '$'], ['\\(', '\\)']],
        displayMath: [['$$', '$$'], ['\\[', '\\]']]
    }
};

/* --- 2. 页面初始化逻辑 --- */
window.addEventListener('DOMContentLoaded', () => {
    
    // --- 加载底栏 (Footer) ---
    // 逻辑：优先读取页面定义的 window.footerPath，否则尝试默认路径
    // 对于文章页，建议始终在 HTML 里定义 path，因为层级太深容易错
    const path = window.footerPath || '../../footer.html'; 
    
    fetch(path)
        .then(response => {
            if (!response.ok) throw new Error("Footer file not found: " + path);
            return response.text();
        })
        .then(data => {
            const placeholder = document.getElementById('footer-placeholder');
            if (placeholder) {
                placeholder.innerHTML = data;
            }
        })
        .catch(err => console.error('底栏加载失败:', err));

    // --- (可选) 可以在这里添加其他文章页通用逻辑 ---
    // 比如：自动生成目录(TOC)、代码块复制按钮等
});