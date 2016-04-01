import 'es6-promise';
import 'whatwg-fetch';

fetch("https://api.github.com/users/nmajors")
  .then((response) => {
    return response.json();
  })
  .then((response) => {
    console.log(response);

    document.querySelector("#profilePic").src = response.avatar_url;
    document.querySelector("#name").textContent = response.name;
    document.querySelector("#username").textContent = response.login;

    document.querySelector("#location").textContent = response.location;


    let blog = document.querySelector("#blog");
    blog.textContent = response.blog;
    blog.href = response.blog;

    let email = document.querySelector("#email");
    email.textContent = response.email;
    email.href = `mailto:${response.email}`;
  });

  fetch ('https://api.github.com/users/nmajors/repos')
    .then((response) => {
      return response.json();
    })
    .then((response) => {
      console.log(response);

      response.forEach((repo) => {

        let row = document.createElement("div");
        row.classList.add("repo");

        let repoName = document.createElement("a");
        repoName.textContent = repo.name;
        repoName.href = repo.html_url;

        let info = document.createElement("div");
        info.classList.add("info");

        let language = document.createTextNode(repo.language);
        info.appendChild(language);

        let star = document.createElement("i");
        star.classList.add("fa");
        star.classList.add("fa-star");
        info.appendChild(star);

        let stargazers = document.createTextNode(repo.stargazers_count);
        info.appendChild(stargazers);

        let fork = document.createElement("i");
        fork.classList.add("fa");
        fork.classList.add("fa-code-fork");
        info.appendChild(fork);

        let forks = document.createTextNode(repo.forks_count);
        info.appendChild(forks);


        row.appendChild(repoName);
        row.appendChild(info);

        document.querySelector("#repos").appendChild(row);


      })
    });
