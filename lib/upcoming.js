const axios = require('axios')
const fs = require('fs')

const PAGE_SIZE = 50
const OFFSET = 1
const NOW = Date.now()
const FILE_PATH = '../static/db/specials.json'

retrieveUpcomingComedySpecials()

async function retrieveUpcomingComedySpecials() {
  const savedSpecials = await getSavedUpcomingComedySpecials()
  const imdbSpecials = await getComedySpecialsFromIMDB()
  

  for (const index in imdbSpecials) {
    const special = imdbSpecials[index]
    const savedSpecial = savedSpecials.find(s => s.url == special.url)
    special.platform = savedSpecial == undefined ? undefined : savedSpecial.platform
  }

  fs.writeFileSync(FILE_PATH, JSON.stringify(imdbSpecials))
}

/**
 * Retrieves previously saved information from disk
 */
function getSavedUpcomingComedySpecials() {
  return new Promise((resolve) => {
    const data = fs.readFileSync(FILE_PATH, 'utf8')
    resolve(JSON.parse(data))
  })
}

/**
 * Retrieves all comedy specials to be published in the future
 */
function getComedySpecialsFromIMDB() {
  return new Promise(async (resolve) => {
    let specials = []
    let page = 0

    while (true) {
      console.log(`Retrieving page ${page}`)
      const retrievedSpecials = await getComedySpecialsForPage(page++)
      specials = specials.concat(retrievedSpecials)
      if (retrievedSpecials.length != PAGE_SIZE) break
    }

    resolve(specials)
  })
}

function getComedySpecialsForPage(page) {
  return new Promise(async (resolve) => {
    const url = getIMDBUrl(page)
    const { data } = await axios.get(url)

    const specials = await extractInfoFromHTML(data)
    resolve(specials)
  })
}

function extractInfoFromHTML(str) {
  return new Promise(async resolve => {
    const specials = []
    const regexItems = /(<div class="lister-item mode-advanced">.*?<img.*?<h3 class="lister-item-header".*?<\/div>)/gms;
    let m;

    while ((m = regexItems.exec(str)) !== null) {
      if (m.index === regexItems.lastIndex) {
        regexItems.lastIndex++;
      }

      if (m != null) {
        const specialDetail = await getSpecialDetail(m[1])
        if (specialDetail == undefined) break
        specials.push(specialDetail)
      }

    }

    resolve(specials)
  })
}

function getSpecialDetail(str) {
  return new Promise(async (resolve) => {
    const regexInformation = /<img.*?src="(.*?)".*<h3 class="lister-item-header">.*?<a href="(.*?)".*?>(.*?)<\/a>/gms;
    const info = regexInformation.exec(str)

    const title = info[3]
    const url = `https://www.imdb.com${info[2]}`

    console.log(`Processing ${title}`)
    const extra = await getSpecialExtraInfo(url)

    if (extra.date != undefined && extra.date.length > 8 && Date.parse(extra.date) < NOW) {
      resolve(undefined)
    } else {
      resolve({
        url: url,
        title: title,
        img: extra.img || info[1],
        date: extra.date
      })
    }
  })
}

function getSpecialExtraInfo(url) {
  return new Promise(async resolve => {
    const regexDate = /<a.*?title="See more release dates".*?>(.*?)<\/a>/gms
    const regexImg = /<div class="poster">.*?<img.*?src="(.*?)"/gms
    const { data } = await axios.get(url)

    const dateStr = regexDate.exec(data);
    let date = undefined
    if (dateStr != null) {
      const cleanDate = dateStr[1].replace("TV Special", "").trim()
      if (cleanDate.length > 0) {
        date = cleanDate
      }
    }

    const imgStr = regexImg.exec(data)
    let img = undefined
    if (imgStr != null) {
      img = imgStr[1]
    }

    resolve({
      img: img,
      date: date
    })
  })
}

function getIMDBUrl(currentPage) {
  const start = (currentPage * PAGE_SIZE) + OFFSET
  return `https://www.imdb.com/search/title/?title_type=tv_special&genres=comedy&sort=release_date,desc&start=${start}&explore=title_type,genres&view=advanced`
}
