const loadServersCount = (element) => {

    fetch("https://bstats.org/api/v1/plugins/6555/charts/servers/data/?maxElements=1",
        {
            method: "GET"
        }
    ).then(function (response) {
        response.json().then(servers => {
            const serversCount = servers[0][1];

            if(serversCount){
                const rawElement = element.innerHTML;
                element.innerHTML = "";
                element.innerHTML = rawElement.replace("$servers", serversCount)
            }
        })
    });
}

const loadPlayersCount = (element) => {

    fetch("https://bstats.org/api/v1/plugins/6555/charts/players/data/?maxElements=1",
        {
            method: "GET"
        }
    ).then(function (response) {
        response.json().then(players => {
            const playersCount = players[0][1];

            if(playersCount){
                const rawElement = element.innerHTML;
                element.innerHTML = "";
                element.innerHTML = rawElement.replace("$players", playersCount)
            }
        })
    });
}

const loadStarsCount = (element) => {

    fetch("https://api.github.com/repos/CrucibleMC/Crucible",
        {
            method: "GET"
        }
    ).then(function (response) {
        response.json().then(stars => {
            const {stargazers_count} = stars;

            if(stargazers_count){
                const rawElement = element.innerHTML;
                element.innerHTML = "";
                element.innerHTML = rawElement.replace("$stars", stargazers_count)
            }
        })
    });
}

const loadStatistics = () => {
    const statistics = document.querySelector("#about .statistics-items");

    loadServersCount(statistics)
    loadPlayersCount(statistics)
    loadStarsCount(statistics)

}

const loadDownloadsVersions = () => {
    let downloads = document.querySelector("#downloads .downloads-items-container");
    
    fetch("https://raw.githubusercontent.com/brunoxkk0/crucible-version/master/versions/crucible/version.json",
        {
            method: "GET"
        }
    ).then(function (response) {
        response.json().then(versions => {

            const rawElement = downloads.innerHTML;

            downloads.innerHTML = "";
            downloads.innerHTML += replace(rawElement, versions.lastRelease);
            downloads.innerHTML += replace(rawElement, versions.lastDev);

        })
    })
}

const replace = (target, source) => {

    let type = (source.prerelease) ? "DEV BUILD" : "RELEASE"
    let version = (source.tag_name.length > 10) ? source.tag_name.substring(0, 10) : source.tag_name
    let releaseDate = new Date(source.published_at)

    target = target.replace("$type", type)
    target = target.replace("$title", "Crucible 1.7.10")
    target = target.replace("$version", version)
    target = target.replace("$released", `${releaseDate.getDate()}/${releaseDate.getMonth() + 1}/${releaseDate.getFullYear()}`)
    target = target.replace("$url", source.url)

    return target;
}

const onload = (event) => {
    loadStatistics();
    loadDownloadsVersions();
}

document.addEventListener("DOMContentLoaded", onload);