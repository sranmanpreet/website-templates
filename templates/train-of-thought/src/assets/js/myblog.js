const postListElement = getPostListElement();

function initialize() {
    filterPostsByCategory(posts, 'All');
}

function renderPostList(posts) {

    if(postListElement)
        posts.forEach(post => {
            postListElement.innerHTML += getPostTemplate(post);
        });
}

function getPostListElement(){
    return document.getElementById('myblog-post-list');
}

function getPostTemplate(postData) {
    return `
        <div id="post-card-container" class="m-auto border border-black flex flex-col lg:w-[48%]">
            <img src="${postData.image}" alt="" class="object-cover h-48">
            <div id="post-card-content" class="flex flex-col h-full p-4">
                <p class="mb-4"><span class="text-xs text-gray-500 ">${postData.date} . ${postData.readTime} min</span></p>
                <a href="${postData.url}" class="hover:text-blue-700 mb-8">
                    <h3 class="mb-4 text-2xl text-black-900 font-semibold hover:text-blue-700 line-clamp-1">
                    ${postData.title}
                    </h3>
                    <p class="text-base line-clamp-3 lg:text-sm line-clamp-3">
                    ${postData.excerpt}
                    </p>
                </a>
            </div>
        </div>
    `;
}

function filterPostsByCategory(posts, category){
    let list = posts;
    if(!category || category == 'All') list = posts;
    else list = posts.filter(post => post.category == category);
    renderPostList(list);
}


function selectCategory(e){
    postListElement.innerHTML = "";
    filterPostsByCategory(posts, e.target.textContent);
}

initialize();