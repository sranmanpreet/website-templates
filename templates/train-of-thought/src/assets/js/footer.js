function getFooterTemplate(){
    return `
    <footer class="w-full mt-16 p-4 text-sm bg-gray-300 text-center">
        <p class="leading-normal">© 2023 by Train of Thoughts. <br> Design & Images by Wix. Developed by Sran Manpreet</p>
    </footer>
    `;
}

function renderFooter(){
    document.body.insertAdjacentHTML('beforeend', getFooterTemplate());
}

renderFooter();