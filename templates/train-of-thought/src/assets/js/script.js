
initialize();


function initialize() {
    renderPostList(posts);
}

function renderPostList(posts) {
    const postListElement = document.getElementById('post-list');

    posts.forEach(post => {
        postListElement.innerHTML += getPostTemplate(post);
    });
}

function getPostTemplate(postData) {
    return `
        <div id="post-card-container" class="relative -top-8 border border-black flex flex-col lg:flex-row">
            <img src="${postData.image}" alt="" class="object-cover lg:w-2/5">
            <div id="post-card-content" class="flex flex-col h-full p-4">
                <p class="mb-4"><span class="text-xs text-gray-500">${postData.date} . ${postData.readTime} min</span></p>
                <h3 class="mb-4 text-2xl text-black-900 font-semibold hover:text-blue-700">
                <a href="${postData.url}">${postData.title}</a>
                </h3>
                <p class="text-base line-clamp-3 lg:text-sm">
                ${postData.excerpt}
                </p>
                <div id="response-container" class="mt-auto pt-4">
                    <hr class="border-b border-gray-400">
                    <div id="post-response" class="mt-4 flex text-xs">
                        <div id="pr-1" class="flex space-x-1">
                            <img src="./assets/icons/icon-eye.svg" alt="Views" class="w-4 xl:hidden">
                            <span class="">${postData.views}</span>
                            <span class="hidden xl:inline-block">views</span>
                        </div>
                        <div id="pr-2" class="ml-8 flex space-x-1">
                            <img src="./assets/icons/icon-message.svg" alt="Views" class="w-4 xl:hidden">
                            <span class="">${postData.comments}</span>
                            <span class="hidden xl:inline-block">comments</span>
                        </div>
                        <div id="pr-3" class="flex space-x-1 ml-auto">
                            <span class="">${postData.likes}</span>
                            <img src="./assets/icons/icon-heart.svg" alt="Views" class="w-4">
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
}