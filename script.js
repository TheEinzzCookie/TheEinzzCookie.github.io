// Main application
document.addEventListener('DOMContentLoaded', function() {
    // Elements
    const overlay = document.getElementById('clickOverlay');
    const content = document.getElementById('content');
    const audio = document.getElementById('background-audio');
    const navButtons = document.querySelectorAll('.nav-btn');
    const pages = document.querySelectorAll('.page');
    
    // Set audio volume
    audio.volume = 0.05;
    
    // Click overlay handler
    overlay.addEventListener('click', () => {
        overlay.style.display = 'none';
        content.classList.remove('blurred');
        audio.play().catch(e => console.log('Audio play failed:', e));
    });
    
    // Navigation handlers
    navButtons.forEach(button => {
        button.addEventListener('click', function() {
            const targetPage = this.getAttribute('data-page');
            
            // Update active button
            navButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            // Switch page
            switchPage(targetPage);
        });
    });
    
    // Page switching function
    function switchPage(pageId) {
        // Hide all pages
        pages.forEach(page => {
            page.classList.remove('active');
            setTimeout(() => {
                page.style.display = 'none';
            }, 500);
        });
        
        // Show target page
        setTimeout(() => {
            const targetPage = document.getElementById(`${pageId}-page`);
            if (targetPage) {
                targetPage.style.display = 'flex';
                setTimeout(() => {
                    targetPage.classList.add('active');
                }, 50);
                
                // Load content if needed
                if (pageId === 'projects' && !targetPage.dataset.loaded) {
                    loadProjects();
                    targetPage.dataset.loaded = 'true';
                } else if (pageId === 'blog' && !targetPage.dataset.loaded) {
                    loadBlogPosts();
                    targetPage.dataset.loaded = 'true';
                }
            }
        }, 500);
    }
    
    // Load projects from JSON file
    async function loadProjects() {
        const projectsGrid = document.getElementById('projects-grid');
        projectsGrid.innerHTML = '<div class="loading">Loading projects...</div>';
        
        try {
            const response = await fetch('projects/projects.json');
            if (!response.ok) {
                throw new Error('Failed to load projects');
            }
            const projects = await response.json();
            displayProjects(projects);
        } catch (error) {
            console.error('Error loading projects:', error);
            projectsGrid.innerHTML = '<div class="loading">Error loading projects. Please try again later.</div>';
        }
    }
    
    // Display projects in the grid
    function displayProjects(projects) {
        const projectsGrid = document.getElementById('projects-grid');
        projectsGrid.innerHTML = '';
        
        if (projects.length === 0) {
            projectsGrid.innerHTML = '<div class="loading">No projects found.</div>';
            return;
        }
        
        projects.forEach(project => {
            const projectCard = document.createElement('div');
            projectCard.className = 'project-card';
            
            projectCard.innerHTML = `
                ${project.image ? `<img src="${project.image}" alt="${project.title}" class="project-image">` : ''}
                <h3 class="project-title">${project.title}</h3>
                <p class="project-description">${project.description}</p>
                <div class="project-links">
                    ${project.demoLink ? `<a href="${project.demoLink}" class="project-link" target="_blank">Demo</a>` : ''}
                    ${project.codeLink ? `<a href="${project.codeLink}" class="project-link" target="_blank">Code</a>` : ''}
                    ${project.private ? `<a class="project-link" target="_blank">Private</a>` : ''}
                </div>
            `;
            
            projectsGrid.appendChild(projectCard);
        });
    }
    
    // Load blog posts from JSON file
    async function loadBlogPosts() {
        const blogPostsContainer = document.getElementById('blog-posts');
        blogPostsContainer.innerHTML = '<div class="loading">Loading blog posts...</div>';
        
        try {
            const response = await fetch('blog/blog.json');
            if (!response.ok) {
                throw new Error('Failed to load blog posts');
            }
            const posts = await response.json();
            displayBlogPosts(posts);
        } catch (error) {
            console.error('Error loading blog posts:', error);
            blogPostsContainer.innerHTML = '<div class="loading">Error loading blog posts. Please try again later.</div>';
        }
    }
        
    // Display blog posts
    function displayBlogPosts(posts) {
        const blogPostsContainer = document.getElementById('blog-posts');
        blogPostsContainer.innerHTML = '';
        
        if (posts.length === 0) {
            blogPostsContainer.innerHTML = '<div class="loading">No blog posts found.</div>';
            return;
        }
        
        posts.forEach(post => {
            const postElement = document.createElement('article');
            postElement.className = 'blog-post';
            
            let imagesHTML = '';
            
            // Handle multiple images
            if (post.images && post.images.length > 0) {
                if (post.images.length === 1) {
                    // Single image
                    const img = post.images[0];
                    imagesHTML = `
                        <div class="blog-post-image">
                            <img src="${img.url}" alt="${img.alt || ''}" class="blog-image">
                            ${img.caption ? `<div class="blog-image-caption">${img.caption}</div>` : ''}
                        </div>
                    `;
                } else {
                    // Multiple images - use grid layout
                    imagesHTML = `
                        <div class="blog-images-grid">
                            ${post.images.map(img => `
                                <div class="blog-image-item">
                                    <img src="${img.url}" alt="${img.alt || ''}" class="blog-image">
                                    ${img.caption ? `<div class="blog-image-caption">${img.caption}</div>` : ''}
                                </div>
                            `).join('')}
                        </div>
                    `;
                }
            } 
            // Backward compatibility: handle single image field
            else if (post.image) {
                imagesHTML = `
                    <div class="blog-post-image">
                        <img src="${post.image}" alt="${post.imageAlt || ''}" class="blog-image">
                        ${post.imageCaption ? `<div class="blog-image-caption">${post.imageCaption}</div>` : ''}
                    </div>
                `;
            }
            
            postElement.innerHTML = `
                <h3 class="blog-post-title">${post.title}</h3>
                <div class="blog-post-meta">
                    <span>${formatDate(post.date)}</span>
                    ${post.category ? `<span>${post.category}</span>` : ''}
                    ${post.readTime ? `<span>${post.readTime} min read</span>` : ''}
                </div>
                ${imagesHTML}
                <div class="blog-post-content">
                    ${post.content}
                </div>
                ${post.tags ? `<div class="blog-post-tags">${post.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}</div>` : ''}
            `;
            
            blogPostsContainer.appendChild(postElement);
        });
    }
    
    // Helper function to format dates
    function formatDate(dateString) {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(dateString).toLocaleDateString(undefined, options);
    }
});