
const photoContainer = document.getElementById("photoContainer");
const albumContainer = document.getElementById("albumContainer");
const fetchUsers = async () => {
    try {
        let userResponse = await fetch("https://jsonplaceholder.typicode.com/users");
        let users = await userResponse.json();
        return users;
    } catch (error) {
        console.error();
    }
}
async function fetchAlbums(userId) {
    try {
        let albumResponse = await fetch(`https://jsonplaceholder.typicode.com/albums?userId=${userId}`);
        let userAlbums = await albumResponse.json();
        albumContainer.innerHTML = "";
        userAlbums.forEach((album) => {
            const flexItem = document.createElement("div");
            flexItem.textContent = `album ${album.id}`;
            flexItem.className = "flex-items";
            flexItem.addEventListener("click", () => {
                fetchPhotos(album.id);
            });
            albumContainer.appendChild(flexItem);
        }
        );
    } catch (error) {
        console.error();
    }
}
async function photo(albumId) {
    try {
        let photoResponse = await fetch(`https://jsonplaceholder.typicode.com/photos?albumId=${albumId}`);
        let photos = await photoResponse.json();
        return photos;
    } catch (error) {
        console.error();
    }
}
async function fetchPhotos(albumId) {
    try {
        let photos = await photo(albumId);
        photoContainer.innerHTML = "";
        photos.forEach((photo) => {
            const flexItem = document.createElement("div");
            const flexItem_id = document.createElement("div");
            const flexItem_title = document.createElement("div");
            flexItem_id.textContent = `Album :${albumId}`;
            flexItem_title.textContent = `${photo.title}`;
            flexItem_title.className = "style_content";
            flexItem.appendChild(flexItem_id);
            flexItem.appendChild(flexItem_title);
            flexItem.className = "photo-flex-items"
            photoContainer.appendChild(flexItem);
        })
    } catch (error) {
        console.error();
    }
}
const handleUserChange = () => {
    albumContainer.innerHTML = "";
    photoContainer.innerHTML = "";
    fetchAlbums(userSelect.value);
}
async function dropdown() {
    try {
        const userSelect = document.getElementById('userSelect');
        userSelect.removeEventListener('change', handleUserChange);
        const users = await fetchUsers();
        users.forEach(user => {
            const option = document.createElement('option');
            option.value = user.id;
            option.textContent = user.name;
            userSelect.appendChild(option);
        });
        userSelect.addEventListener('change', handleUserChange);
    } catch (error) {
        console.error();
    }
}
dropdown();