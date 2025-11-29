// Total number of images
const totalImages = 22;

// Initialize page on load
document.addEventListener('DOMContentLoaded', () => {
    loadStoryContent();
    initScrollEffects();
    initIntersectionObserver();
});

// Load all story images
function loadStoryContent() {
    const storyContent = document.getElementById('storyContent');

    for (let i = 0; i < totalImages; i++) {
        const section = document.createElement('div');
        section.className = 'story-section';
        section.setAttribute('data-index', i);

        const imageWrapper = document.createElement('div');
        imageWrapper.className = 'story-image-wrapper';

        const img = document.createElement('img');
        img.src = `${i}.png`;
        img.alt = `Journey Chapter ${i + 1}`;
        img.className = 'story-image';
        img.loading = i < 3 ? 'eager' : 'lazy'; // Eager load first 3 images

        const caption = document.createElement('div');
        caption.className = 'image-caption';
        caption.innerHTML = `
            <div class="image-number">Chapter ${String(i + 1).padStart(2, '0')}</div>
            <h3 class="image-title">${getChapterTitle(i)}</h3>
        `;

        imageWrapper.appendChild(img);
        imageWrapper.appendChild(caption);
        section.appendChild(imageWrapper);
        storyContent.appendChild(section);
    }
}

// Get chapter titles (you can customize these)
function getChapterTitle(index) {
    const titles = [
        "起点：华尔街的繁华",
        "思考：价值的本质",
        "转折：内心的召唤",
        "决定：勇敢的选择",
        "启程：踏上新旅途",
        "发现：自然的智慧",
        "探索：未知的领域",
        "沉思：生命的意义",
        "领悟：简单的力量",
        "成长：心灵的蜕变",
        "连接：人与自然",
        "平衡：两个世界",
        "和谐：内外统一",
        "智慧：经验的积累",
        "分享：价值的传递",
        "影响：涟漪效应",
        "传承：精神的延续",
        "希望：未来的愿景",
        "信念：坚持的力量",
        "圆满：旅程的升华",
        "新生：另一个开始",
        "永恒：价值的回归"
    ];

    return titles[index] || `Journey Part ${index + 1}`;
}

// Scroll to story section
function scrollToStory() {
    const story = document.getElementById('story');
    story.scrollIntoView({ behavior: 'smooth' });
}

// Scroll to top
function scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Initialize scroll effects
function initScrollEffects() {
    const navbar = document.getElementById('navbar');
    const progressBar = document.getElementById('progressBar');

    window.addEventListener('scroll', () => {
        // Show/hide navbar
        if (window.scrollY > window.innerHeight * 0.3) {
            navbar.classList.add('visible');
        } else {
            navbar.classList.remove('visible');
        }

        // Update progress bar
        const windowHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrolled = (window.scrollY / windowHeight) * 100;
        progressBar.style.width = `${scrolled}%`;
    });
}

// Intersection Observer for fade-in animations
function initIntersectionObserver() {
    const observerOptions = {
        threshold: 0.15,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // Optionally unobserve after animation
                // observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe all story sections
    setTimeout(() => {
        document.querySelectorAll('.story-section').forEach(section => {
            observer.observe(section);
        });
    }, 100);
}

// Smooth scroll for all internal links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
        }
    });
});

// Keyboard navigation
document.addEventListener('keydown', (e) => {
    if (e.key === 'Home') {
        e.preventDefault();
        scrollToTop();
    }
    if (e.key === 'End') {
        e.preventDefault();
        window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
    }
});

// Add parallax effect to hero
window.addEventListener('scroll', () => {
    const hero = document.querySelector('.hero');
    if (hero && window.scrollY < window.innerHeight) {
        const scrolled = window.scrollY;
        hero.style.transform = `translateY(${scrolled * 0.5}px)`;
        hero.style.opacity = 1 - (scrolled / window.innerHeight) * 0.8;
    }
});

// Preload next images for better performance
function preloadNextImages(currentIndex, count = 2) {
    for (let i = 1; i <= count; i++) {
        const nextIndex = currentIndex + i;
        if (nextIndex < totalImages) {
            const img = new Image();
            img.src = `${nextIndex}.png`;
        }
    }
}

// Trigger preload when user scrolls near an image
const preloadObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const index = parseInt(entry.target.getAttribute('data-index'));
            preloadNextImages(index);
        }
    });
}, { rootMargin: '500px' });

// Start observing sections for preloading
setTimeout(() => {
    document.querySelectorAll('.story-section').forEach(section => {
        preloadObserver.observe(section);
    });
}, 500);
