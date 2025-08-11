
const flexContainer1 = document.getElementById("flexContainer1");
const flexContainer = document.getElementById("flexContainer");
async function fetching_users(params) {
    let response = await fetch("https://jsonplaceholder.typicode.com/users");
    let users = await response.json();
    return users;
    /*for (user in users) {
        console.log(users[user].id);
        console.log(users[user].name);
    }*/

}
async function fetching_albums(user_id) {
    let response = await fetch(`https://jsonplaceholder.typicode.com/albums?userId=${user_id}`);
    let userAlbums = await response.json();
    //const  = albums.filter(album => album.userId === user_id);
    flexContainer.innerHTML="";
    userAlbums.forEach((album)=> {
        const flexItem = document.createElement("div");
        flexItem.textContent = `album ${album.id}`;
        flexItem.className="flex-items";
        flexItem.addEventListener("click", () => {
            fetching_photo(album.id);
        });
        flexContainer.appendChild(flexItem);
    }
    );
}
async function fetching_photo(album_id) {
    let response = await fetch(`https://jsonplaceholder.typicode.com/photos?albumId=${album_id}`);
    let photos = await response.json();
    flexContainer1.innerHTML = "";
    photos.forEach((photo)=>{
            const flexItem = document.createElement("div");
            const flexItem_id = document.createElement("div");
            const flexItem_title = document.createElement("div");
            flexItem_id.textContent = `Album :${album_id}`;
            flexItem_title.textContent = `${photo.title}`;
            flexItem_title.className="style_content";
            flexItem.appendChild(flexItem_id);
            flexItem.appendChild(flexItem_title);
            flexItem.className="photo-flex-items"
            flexContainer1.appendChild(flexItem);
    })
}
async function dropdown() {
    const select = document.getElementById('userSelect');
    const users = await fetching_users();
    users.forEach(user => {
        const option = document.createElement('option');
        option.value = user.id;
        option.textContent = user.name;
        select.appendChild(option);
    });
    /*return new Promise((resolve) => {
        select.addEventListener('change', () => {
            const selectedUserId = parseInt(select.value);
            console.log("Selected User ID:", selectedUserId);
            resolve(selectedUserId)
        });
    })*/
    select.addEventListener('change', () => {
        flexContainer.innerHTML="";
        flexContainer1.innerHTML="";
        fetching_albums(select.value);
    });
}
/*async function main() {
    let res1 = await dropdown();
    let res2 = await fetching_albums(res1);
}
main();*/
dropdown();