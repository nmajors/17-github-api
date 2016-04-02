import 'es6-promise';
import 'whatwg-fetch';

fetch("https://api.github.com/users/nmajors")
  .then((response) => {
    return response.json();
  })
  .then((response) => {
    console.log(response);

    document.querySelector("#profilePic").src = response.avatar_url;
    document.querySelector("#profilePicThumbnail").src = response.avatar_url;
    document.querySelector("#name").textContent = response.name;
    document.querySelector("#username").textContent = response.login;

    let blog = document.querySelector("#blog");
    let blogIcon = document.createElement("i");
      blogIcon.classList.add("fa");
      blogIcon.classList.add("fa-link");
      blog.appendChild(blogIcon);
    let blogText = document.createTextNode(response.blog);
      blog.appendChild(blogText);
      blog.href=(response.blog);

    let location = document.querySelector("#location");
    let map = document.createElement("i");
      map.classList.add("fa");
      map.classList.add("fa-map-marker");
      location.appendChild(map);
    let locationText = document.createTextNode(response.location);
      location.appendChild(locationText);

    let email = document.querySelector("#email");
    let emailIcon = document.createElement("i");
      emailIcon.classList.add("fa");
      emailIcon.classList.add("fa-envelope-o");
      email.appendChild(emailIcon);
    let emailText = document.createTextNode(response.email);
      email.appendChild(emailText);
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
