initialize();

const searchInputMob = document.getElementById('search-mob');
const searchIconMob = document.getElementById('search-icon-mob');

function clearSearchBox() {
    searchOverlayInputMob.value = "";
    cancelSearchIconMob.classList.toggle('hidden');
    debounce(performSearch, 300)();
}

function showCleanSearchIcon() {
    if (cancelSearchIconMob.classList.contains('hidden')) {
        cancelSearchIconMob.classList.remove('hidden');
    }
}

function hideCleanSearchIcon() {
    if (!cancelSearchIconMob.classList.contains('hidden')) {
        cancelSearchIconMob.classList.add('hidden');
    }
}

function debounce(func, delay) {
    let timeoutId;
    
    return function () {
        clearTimeout(timeoutId);
        const searchResultsContainer = document.getElementById('search-results-container');
        searchResultsContainer.classList.add('hidden');
        const loadingSpinner = document.getElementById('loading-spinner');
        loadingSpinner.classList.remove('hidden');
        timeoutId = setTimeout(() => {
            func.apply(null, arguments);
        }, delay);
    }
}

function performSearch() {
    const searchTerm = searchOverlayInputMob.value;
    if (searchTerm) {
        cancelSearchIconMob.classList.remove('hidden');
        showSearchAllButton(true);
    } else {
        cancelSearchIconMob.classList.add('hidden');
        showSearchAllButton(false);
    }
    const searchResults = searchPosts(searchTerm);
    (() => {
        setSearchResults(searchResults);
        showSearchResultsContainer();
    })();
}

function showSearchResultsContainer(){
    const searchResultsContainer = document.getElementById('search-results-container');
        searchResultsContainer.classList.remove('hidden');
}

function hideSearchResultsContainer(){
    const searchResultsContainer = document.getElementById('search-results-container');
        searchResultsContainer.classList.add('hidden');
}

function setSearchResults(searchResults){
    const postListElement = document.getElementById('search-results');
    postListElement.innerHTML = ""
    searchResults.forEach(post => {
        postListElement.innerHTML += getSearchResultPost(post);
    });
}

function setSearchAllButtonText(){
    const searchOverlayInputMob = document.getElementById('overlay-search-mob');
    const searchText = searchOverlayInputMob.value;
    const searchAllTextElement  = document.getElementById('search-all-text');
    searchAllTextElement.innerHTML = `Search all "${searchText}"`;
}

function setSearchTitleElement(value){
    const searchTitleElement = document.getElementById('search-title');
    searchTitleElement.innerHTML = value;
}

function searchPosts(searchTerm) {
    const lowerSearchTerm = searchTerm.toLowerCase().trim();
    let searchResults = [];

    const loadingSpinner = document.getElementById('loading-spinner');
    loadingSpinner.classList.add('hidden');

    if (lowerSearchTerm) {
        searchResults = posts.filter(post => {
            const postTitle = post.title.toLowerCase();
            return postTitle.indexOf(lowerSearchTerm) !== -1;
        });
        setSearchTitleElement(searchResults.length ? 'Blog Posts' : '');
    } else {
        setSearchTitleElement('Trending Blog Posts');
        searchResults.push(posts[0]);
    }
    return searchResults;
}

searchInputMob.addEventListener('focus', () => toggleSearchOverlayForMobile(false));

let searchOverlayBackIcon;
let searchOverlayInputMob;
let cancelSearchIconMob;

function toggleSearchOverlayForMobile(flag) {
    if (flag) {
        const searchOverlayTemplate = document.getElementById('search-overlay-container');
        searchOverlayTemplate.remove();
        document.body.classList.remove('overflow-hidden');
        searchOverlayBackIcon.removeEventListener('click', undefined);
    } else {
        const searchOverlayTemplate = document.getElementById('search-overlay-mobile');
        const searchOverlay = searchOverlayTemplate.content.cloneNode(true);
        document.body.classList.add('overflow-hidden');
        document.body.appendChild(searchOverlay);
        cancelSearchIconMob = document.getElementById('cancel-search-icon-mob');
        searchOverlayInputMob = document.getElementById('overlay-search-mob');
        searchOverlayBackIcon = document.getElementById('search-overlay-back-icon');
        searchOverlayBackIcon.addEventListener('click', () => toggleSearchOverlayForMobile(true));
        searchOverlayInputMob.addEventListener('input', debounce(performSearch, 300));
        cancelSearchIconMob.addEventListener('click', clearSearchBox);
        getTrendingPosts();
    }
}


function toggleCancelSearchIcon() {
    if (searchOverlayInputMob.value) {
        showCleanSearchIcon();
    } else {
        hideCleanSearchIcon();
    }
}

function initialize() {
    renderSearchResults(posts);
}

function renderSearchResults(posts) {
    const postListElement = document.getElementById('post-list');

    if(postListElement)
        posts.forEach(post => {
            postListElement.innerHTML += getPostTemplate(post);
        });
}

function getSearchResultPost(postData) {
    return `
            <div id="search-result" class="flex m-1 p-1 h-20">
                    <img src="${postData.image}" alt="" class="m-1 p-1 h-16 w-20 object-cover">
                    <div id="search-result-content" class="flex flex-col m-1 p-1">
                        <a id="search-result-title" class="text-base line-clamp-1" href="${postData.url}">
                            ${postData.title}
                        </a>
                        <p id="search-result-excerpt" class="text-sm line-clamp-2 font-light">
                            ${postData.excerpt}
                        </p>
           </div>
    `;
}

function getTrendingPosts(){
    const trendingPosts = [
        {
            id: 0,
            title: "Back to Fiction: What I'm Reading This Summer",
            content: "Content Goes Here",
            excerpt: "Create a blog post subtitle that summarizes your post in a few short, punchy sentences and entices your audience to continue reading.",
            url: "/src/page/post.html",
            date: 'Mar 23',
            readTime: 2,
            image: '/src/assets/images/featured-post-image.webp',
            views: 156,
            likes: 32,
            comments: 11,
            category: 'My Top 5'
        }
    ];
    setSearchTitleElement("Trending Blog Posts");
    setSearchResults(trendingPosts);
    showSearchAllButton(false);
}

function showSearchAllButton(show){
    const searchAllButton = document.getElementById('search-all-button');
    if(show){
        setSearchAllButtonText();
        searchAllButton.classList.remove('hidden');
    } else {
        searchAllButton.classList.add('hidden');
    }
}

function getSearchPostTemplate(postData) {
    return `
        <div id="post-card-container" class="relative -top-8 border border-black flex flex-col lg:flex-row">
            <div id="post-card-content" class="flex flex-col h-full p-4">
                <p class="mb-4"><span class="text-xs text-gray-500">${postData.date} . ${postData.readTime} min</span></p>
                <a href="" class="hover:text-blue-700 mb-8">
                    <h3 class="mb-4 text-2xl text-black-900 font-semibold hover:text-blue-700">
                    ${postData.title}
                    </h3>
                    <p class="text-base line-clamp-3 lg:text-sm">
                    ${postData.excerpt}
                    </p>
                </a>
                <div id="response-container" class="mt-auto">
                    <hr class="border-b border-gray-400">
                    <div id="post-response" class="mt-4 flex text-xs">
                        <div id="pr-1" class="flex space-x-1">
                            <img src="/src/assets/icons/icon-eye.svg" alt="Views" class="w-4 xl:hidden">
                            <span class="">${postData.views}</span>
                            <span class="hidden xl:inline-block">views</span>
                        </div>
                        <div id="pr-2" class="ml-8 flex space-x-1">
                            <img src="/src/assets/icons/icon-message.svg" alt="Views" class="w-4 xl:hidden">
                            <span class="">${postData.comments}</span>
                            <span class="hidden xl:inline-block">comments</span>
                        </div>
                        <div id="pr-3" class="flex space-x-1 ml-auto">
                            <span class="">=${postData.likes}</span>
                            <img src="/src/assets/icons/icon-heart.svg" alt="Views" class="w-4">
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
}

function getSearchOverlayMobileTemplate(){
    const template = `
        <template id="search-overlay-mobile">
            <div id="search-overlay-container"
                class="fixed top-0 w-[100vw] h-[100vh] bg-white flex flex-col overflow-hidden z-30">
                <div id="search-bar" class="m-2 flex items-center space-x-2">
                    <button>
                        <img id="search-overlay-back-icon" src="/src/assets/icons/icon-back.svg"
                            class="basis-1/5  p-1 m-1 h-8 hover:cursor-pointer">
                    </button>
                    <div id="search-form" class="basis-4/5 p-1 m-1 flex items-center border border-black flex">
                        <img id="search-icon-mob" src="/src/assets/icons/search-icon.svg"
                            class=" w-[10%] m-auto px-1 h-5 hover:cursor-pointer ">
                        <form action="" class=" w-[85%]">
                            <input type="text" name="search" id="overlay-search-mob" placeholder="Search..."
                                class="h-8 w-full text-sm outline-0">
                        </form>
                        <img id="cancel-search-icon-mob" src="/src/assets/icons/icon-cancel.svg"
                            class="hidden w-[10%] m-auto px-1 h-5 hover:cursor-pointer ">
                    </div>
                </div>
                <div class="flex flex-col m-1 p-1">
                    <div id="search-results-container">
                        <p id="search-title" class="m-2 mb-1 p-2 pb-1 text-xl"></p>
                        <div id="search-results" class="flex flex-col m-1 p-1">

                        </div>
                        <a id="search-all-button" class="block container w-full m-auto mt-8 p-1 px-auto bg-gray-700 text-white font-light"
                            href="/src/page/search.html">
                            <span class="block text-center" id="search-all-text"></span>
                        </a>
                    </div>
                    <div id="loading-spinner"
                        class="hidden self-center animate-spin rounded-full border-t-2 border-r-2 border-b-2 border-black border-solid h-6 w-6">
                    </div>
                </div>
            </div>
        </template>
    `;

    return template;
}

function insertSearchOverlayMobileTemplate(){
    document.body.insertAdjacentHTML('beforeend', getSearchOverlayMobileTemplate());
}

function getTrendingPosts(){
    const trendingPosts = [
        {
            id: 0,
            title: "Back to Fiction: What I'm Reading This Summer",
            content: "Content Goes Here",
            excerpt: "Create a blog post subtitle that summarizes your post in a few short, punchy sentences and entices your audience to continue reading.",
            url: "/src/page/post.html",
            date: 'Mar 23',
            readTime: 2,
            image: '/src/assets/images/featured-post-image.webp',
            views: 156,
            likes: 32,
            comments: 11,
            category: 'My Top 5'
        }
    ];
    setSearchTitleElement("Trending Blog Posts");
    setSearchResults(trendingPosts);
    showSearchAllButton(false);
}

insertSearchOverlayMobileTemplate();