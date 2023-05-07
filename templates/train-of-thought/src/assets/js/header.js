let menuOverlay;

function openMenuOverlay() {
    menuOverlay.classList.toggle('menu-open');
    document.body.classList.add('overflow-hidden');
}


function closeMenuOverlay() {
    menuOverlay.classList.toggle('menu-open');
    document.body.classList.remove('overflow-hidden');
}

function setHeader() {
    const header = document.createElement('header');
    header.classList.add('flex');
    header.classList.add('flex-col');
    header.innerHTML = getHeaderContent().trim();
    document.body.insertBefore(header, document.body.firstElementChild);

    const menuIconImg = document.getElementById('menu-icon');
    const menuCloseIconImg = document.getElementById('close-menu-icon');
    menuOverlay = document.getElementById('menu-overlay');
    menuIconImg.addEventListener('click', openMenuOverlay);
    menuCloseIconImg.addEventListener('click', closeMenuOverlay);
}


function getHeaderContent() {
    return `
    <!-- Mobile Menu View -->
    <div id="search-menu-bar" class="h-16 flex border-b border-black lg:hidden">
        <div id="search"
            class="w-4/5 flex justify-center border border-black border-t-0 border-b-0 border-l-0 overflow-hidden">
            <div id="search-form"
                class="w-[90%] m-auto flex items-center border-black hover:border-b focus:border-b flex">
                <form action="" class=" w-[85%]">
                    <input type="text" name="search" id="search-mob" placeholder="Search..."
                        class="h-10 w-full text-sm outline-0">
                </form>
                <img id="search-icon-mob" src="/src/assets/icons/search-icon.svg"
                    class=" w-[10%] m-auto px-1 h-5 hover:cursor-pointer ">
            </div>
            <div class="search-results hidden"></div>
        </div>
        <div id="menu-icon-container" class="w-1/5 m-auto">
            <img id="menu-icon" src="/src/assets/icons/icon-menu.svg" class="m-auto w-8 hover:cursor-pointer">
        </div>
    </div>

    <!-- Mobile Menu Open View  -->
    <div id="menu-overlay"
        class="opacity-0 w-[100vw] h-[100vh] fixed lg:hidden bg-white z-30 transform translate-x-full transition-all duration-1000 ease-in-out">
        <img id="close-menu-icon" src="/src/assets/icons/icon-close.svg"
            class="m-4 mr-8 w-8 ml-auto hover:cursor-pointer">
        <ul id="menu-items" class="m-auto mt-[10vh] flex flex-col space-y-8 justify-center">
            <li class="m-auto hover:text-blue-700 hover:cursor-pointer"><a href="/src/index.html">Home</a></li>
            <li class="m-auto hover:text-blue-700 hover:cursor-pointer"><a href="/src/page/about.html">About</a></li>
            <li class="m-auto hover:text-blue-700 hover:cursor-pointer"><a href="/src/page/myblog.html">My Blog</a></li>
            <li class="m-auto hover:text-blue-700 hover:cursor-pointer"><button onclick="closeMenuOverlay(), scrollToContactSection()">Contact</button></li>
            <li class="m-auto">
                <ul class="m-auto py-2 flex">
                    <li class="p-2"><a href="https://google.com"><img src="/src/assets/icons/icon-facebook.svg"
                                width="26" height="26"></a></li>
                    <li class="p-2"><a href="https://google.com"><img src="/src/assets/icons/icon-twitter.svg"
                                width="26" height="26"></a></li>
                    <li class="p-2"><a href="https://google.com"><img src="/src/assets/icons/icon-instagram.svg"
                                width="26" height="26"></a></li>
                    <li class="p-2"><a href="https://google.com"><img src="/src/assets/icons/icon-pinterest.svg"
                                width="26" height="26"></a></li>
                </ul>
            </li>
        </ul>
    </div>

    <div id="site-header-titles"
        class="container px-4 m-auto mt-10 flex flex-col space-y-8 lg:flex-col-reverse lg:mt-4 lg:space-y-12 lg:space-y-reverse">
        <div id="site-title">
            <p class="font-serif text-smSiteTitle text-center lg:text-mdSiteTitle"><a href="/src/index.html">Train of Thought</a>
            </p>
        </div>
        <div id="site-sub-title">
            <p class="text-smSiteSubTitle text-center uppercase lg:text-mdSiteSubTitle">Everything is personal.
                Including this blog.</p>
        </div>
    </div>
    <!-- Desktop Menu View -->
    <hr class="hidden lg:mt-16 mb-[-1px] border-black lg:block">
    <div id="bar" class="hidden h-13 m-auto text-base font-light lg:flex container ">
        <div id="search" class="w-[18%] m-auto py-1 order-20 border border-black relative">
            <div id="search-form"
                class="m-auto mx-4 h-12 flex items-center border-black hover:border-b focus:border-b flex border-box">
                <form action="" class=" w-[85%] p-1">
                    <input type="text" name="search" id="search-input-desktop" placeholder="Search..."
                        class="h-10 w-full text-sm outline-0" oninput="onSearchInputChangeDesktop()" onfocus="showSearchResultsDesktop()">
                </form>
                <img src="/src/assets/icons/search-icon.svg" class="m-auto px-1 h-5 hover:cursor-pointer ">
                <img src="/src/assets/icons/icon-cancel.svg" class="hidden m-auto px-1 h-5 hover:cursor-pointer" id="clear-search-icon-desktop" onclick="clearSearchInputDesktop()">
            </div>
            <div id="search-results-container" class="hidden absolute l-0 t-0 h-fit p-4 w-[16rem] border-b border-black drop-shadow-lg bg-white">
                <label class="text-xs" id="search-label-desktop">Trending Search Results</label>
                <div id="search-results-desktop" class="mt-4">
                    <div id="search-post" class="cursor-pointer items-center flex space-x-4 h-12 hover:bg-slate-100" onclick="window.location.href='/src/page/post.html'">
                        <img src="${posts[0].image}" class="basis-1/3 p-1 w-8 h-8">
                        <div id="search-post-text" class="basis-2/3 p-1 overflow-hidden"> 
                            <p id="search-post-content" class=" text-xs font-medium truncate" >${posts[0].title}</p>    
                            <p id="search-post-content" class="text-xs truncate">${posts[0].excerpt}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <nav class="w-[65%] order-10">
            <ul class="flex place-content-evenly">
                <li
                    class="-mx-[0.5px] p-4 w-full text-center border border-black border-r-0 hover:cursor-pointer hover:text-blue-700">
                    <a href="/src/index.html" class="">Home</a>
                </li>
                <li
                    class="-mx-[0.5px] p-4 w-full text-center border border-black border-r-0 hover:cursor-pointer hover:text-blue-700">
                    <a href="/src/page/about.html">About</a>
                </li>
                <li
                    class="-mx-[0.5px] p-4 w-full text-center border border-black border-r-0 hover:cursor-pointer hover:text-blue-700">
                    <a href="/src/page/myblog.html">My Blog</a>
                </li>
                <li
                    class="-mx-[0.5px] p-4 w-full text-center border border-black border-r-0 hover:cursor-pointer hover:text-blue-700">
                    <button onclick="scrollToContactSection()">Contact</button>
                </li>
            </ul>
        </nav>
        <div class="order-30 flex justify-center">
            <ul class="m-auto py-2 flex border border-black border-l-0">
                <li class="p-[0.44rem]"><a href="https://facebook.com" target="_blank"><img src="/src/assets/icons/icon-facebook.svg"
                            width="26" height="26"></a></li>
                <li class="p-[0.44rem]"><a href="https://twitter.com" target="_blank"><img src="/src/assets/icons/icon-twitter.svg"
                            width="26" height="26"></a></li>
                <li class="p-[0.44rem]"><a href="https://instagram.com" target="_blank"><img src="/src/assets/icons/icon-instagram.svg"
                            width="26" height="26"></a></li>
                <li class="p-[0.44rem]"><a href="https://pinterst.com" target="_blank"><img src="/src/assets/icons/icon-pinterest.svg"
                            width="26" height="26"></a></li>
            </ul>
        </div>
    </div>
    <hr class="hidden lg:block mt-[-1px] border-black">
    `;
}

function scrollToContactSection() {
    const section = document.getElementById("contact-me");
    section.scrollIntoView({ behavior: "smooth" });
}


function onSearchInputChangeDesktop() {
    const searchInputDesktop = document.getElementById('search-input-desktop');
    const clearChatIcon = document.getElementById('clear-search-icon-desktop');
    if (searchInputDesktop.value) {
        clearChatIcon.classList.remove('hidden');       
        showSearchResultsDesktop(searchInputDesktop.value);
    } else {
        clearChatIcon.classList.add('hidden');
    }
}

function clearSearchInputDesktop() {
    const searchInputDesktop = document.getElementById('search-input-desktop');
    const clearChatIcon = document.getElementById('clear-search-icon-desktop');
    searchInputDesktop.value = "";
    clearChatIcon.classList.add('hidden');
}

function showSearchResultsDesktop(query = "") {
    const searchResultsContainer = document.getElementById('search-results-container');
    searchResultsContainer.classList.remove('hidden');

    if(query){
        const searchLabel = document.getElementById('search-label-desktop');
        searchLabel.innerHTML = "Blog Posts";

    }
}

function listenToClicksOutsideSearchbox() {
    const searchInputDesktop = document.getElementById("search-input-desktop");
    document.addEventListener("click", function (event) {
        if (!searchInputDesktop.contains(event.target)) {
            const searchResultsContainer = document.getElementById('search-results-container');
            searchResultsContainer.classList.add('hidden');
        }
    });
}


setHeader();
listenToClicksOutsideSearchbox();
