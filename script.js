const input = document.querySelector(".input");
const button = document.querySelector(".button-submit");
const divCard = document.querySelector(".card-principal");


button.addEventListener("click", (e) => {
    e.preventDefault();
    const userName = input.value.trim();
    if (userName) {
        getGitHubData(userName);
    } else {
        alert('Digite algum usuário!');
    }
    input.value = '';
});


const getGitHubData = async (user) => {
    const url = `https://api.github.com/users/${user}`;
    try {
        const response = await fetch(url);
        if (response.ok) {
            const data = await response.json();
            divCard.innerHTML = createCard(data);
        } else {
            alert("esta usuária não existe no github!");
            throw new Error();
    
        }
    }
    catch (err) {
        console.error("a requisição não foi bem-sucedida", err);
    }
};

function createCard(user) {
    const { name, avatar_url, bio, public_repos, login, followers } = user;
    return `
    <img class="img-github" src="${avatar_url}" alt="minha foto do github" />
    <h2 class="name">${name}</h2>
    <h3 class="login">${login}</h3>
    <p class="bio">${bio ? bio : ''}</p>
    <div class="container-icon">
    <div class="box-icons">
    <img class="icone1" src="./assets/repo.png"/>
    <p class="public-repos">${public_repos}</p>
    </div>
    <div class="box-icons">
    <img class="icone2" src="./assets/people.png"/>
    <p class="followers">${followers}</p> 
    </div>
    </div>
   
   `
};

