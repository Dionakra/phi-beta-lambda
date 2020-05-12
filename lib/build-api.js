const fs = require('fs')
const flatMap = require('lodash/flatMap')
const groupBy = require('lodash/groupBy')
const uniq = require('lodash/uniq')

const MIN_FITNESS = 1 / 3
const MAX_RELATED_COMEDIANS = 5

const trans = {
  'comedian-of-the-day': "#Cómic@DelDía",
  'thank-you': '#ThankYouForThisBeautifulComedy',
  'gira-de-festivales': '#GiraDeFestivales'
}
let comediansWithMentions = undefined

String.prototype.replaceAll = function (search, replacement) {
  var target = this;
  return target.replace(new RegExp(search, 'g'), replacement);
};

// Reading files
const episodes = JSON.parse(fs.readFileSync('../static/db/episodes.json'))
const comedians = JSON.parse(fs.readFileSync('../static/db/comedians.json'))
const culture = JSON.parse(fs.readFileSync('../static/db/culture.json'))
const hosts = JSON.parse(fs.readFileSync('../static/db/hosts.json'))
const sections = JSON.parse(fs.readFileSync('../static/db/sections.json'))
const comedyMap = JSON.parse(fs.readFileSync('../static/db/comedy-map.json'))
const subjects = JSON.parse(fs.readFileSync('../static/db/subjects.json'))
const genres = JSON.parse(fs.readFileSync('../static/db/genres.json'))
const BASE_PATH = '../static/api'

// Writing files
writeHosts()
writeSections()
writeComediansMain()
writeComedians()
writeCulture()
writeGenres()
writeSubjects()

const enrichedDB = enrichDB()
writeMainData(enrichedDB)
writeGuests(enrichedDB)
writeEpisodes(enrichedDB)
writeStats(enrichedDB)
writeComedyMap()

// Functions
function writeMainData(enrichedDB) {
  const info = enrichedDB.map(e => {
    return {
      id: e.id,
      title: e.title,
      season: e.season,
      episode: e.episode,
      link: e.link,
      hosts: e.hosts,
      guests: e.guests,
      sections: e.sections,
      special: e.special
    }
  })

  fs.writeFileSync(`${BASE_PATH}/main.json`, JSON.stringify(info))
}

function writeHosts() {
  fs.writeFileSync(`${BASE_PATH}/hosts.json`, JSON.stringify(hosts))
}

function writeSections() {
  const info = sections.map(s => {
    return {
      id: s.id,
      name: s.name,
      host: hosts.find(h => h.id == s.host),
      description: s.description
    }
  }).sort((a, b) => a.name.localeCompare(b.name))

  fs.writeFileSync(`${BASE_PATH}/sections.json`, JSON.stringify(info))
}

function writeGuests(enrichedDB) {
  const info = flatMap(enrichedDB, e => {
    return e.guests.map(g => {
      return {
        id: g.id,
        name: g.name,
        episode: e.id.toUpperCase() + " - " + e.title
      }
    })
  })
  fs.writeFileSync(`${BASE_PATH}/guests.json`, JSON.stringify(info))
}

function writeComediansMain() {
  const info = getComedianWithMentions().map(c => {
    return {
      id: c.id,
      name: c.name,
      tags: c.tags.map(t => trans[t.id]),
      mentions: c.tags.length + c.mentions.length,
      subjects: c.subjects,
      genres: c.genres
    }
  }).filter(c => c.mentions > 0)

  fs.writeFileSync(`${BASE_PATH}/comedians.json`, JSON.stringify(info))
}

function writeComedians() {
  getComedianWithMentions().map(c => {
    const cleanSubjects = c.subjects.map(s => {
      const subject = subjects.find(x => x.id == s)
      if (!subject) {
        console.log("Subject: " + JSON.stringify({ id: s, name: s }))
        return ""
      }
      return subject.name
    }).sort((a, b) => a.localeCompare(b))

    const cleanGenres = c.genres.map(s => {
      const genre = genres.find(x => x.id == s)
      if (!genre) {
        console.log("Genre: " + JSON.stringify({ id: s, name: s }))
        return ""
      }
      return genre.name
    }).sort((a, b) => a.localeCompare(b))

    return {
      id: c.id,
      name: c.name,
      vip: c.tags.map(x => { return { episodeId: x.episodeId, episodeTitle: x.episodeTitle, section: x.sectionName, ytID: x.ytID } }),
      mentions: c.mentions.sort((a, b) => b.season - a.season == 0 ? b.episode - a.episode : b.season - a.season).map(m => { return { episodeId: m.id, episodeTitle: m.title, ytID: m.link } }),
      recommended: getMostAppealingComedians(c),
      subjects: cleanSubjects,
      genres: cleanGenres
    }
  }).forEach(c => {
    fs.writeFileSync(`${BASE_PATH}/comedians/${c.id}.json`, JSON.stringify(c))
  })
}

function writeEpisodes(enrichedDB) {
  enrichedDB.forEach(e => fs.writeFileSync(`${BASE_PATH}/episodes/${e.id}.json`, JSON.stringify(e)))
}

function writeCulture() {
  const ordered = groupBy(culture.sort((a, b) => a.title.localeCompare(b.title)), 'type')

  const res = {}
  Object.keys(ordered).forEach(c => {
    res[c] = ordered[c].map(x => {
      return {
        id: x.id,
        title: x.title
      }
    })
  })

  fs.writeFileSync(`${BASE_PATH}/culture.json`, JSON.stringify(res))
}

function writeGenres() {
  const ordered = genres.sort((a, b) => a.name.localeCompare(b.name))
  fs.writeFileSync(`${BASE_PATH}/genres.json`, JSON.stringify(ordered))
}

function writeSubjects() {
  const ordered = subjects.sort((a, b) => a.name.localeCompare(b.name))
  fs.writeFileSync(`${BASE_PATH}/subjects.json`, JSON.stringify(ordered))
}

function writeComedyMap() {
  const res = comedyMap.map(e => {
    const sourceComedian = comedians.find(c => c.id == e.src)
    if (sourceComedian == undefined) console.log(`Missing: ${JSON.stringify({ id: e.src, name: capitalLetter(e.src.replaceAll('-', ' ')) })}`)

    const targetComedian = comedians.find(c => c.id == e.target)
    if (targetComedian == undefined) console.log(`Missing: ${JSON.stringify({ id: e.target, name: capitalLetter(e.target.replaceAll('-', ' ')) })}`)

    return {
      src: sourceComedian,
      target: targetComedian
    }
  })

  fs.writeFileSync(`${BASE_PATH}/comedy-map.json`, JSON.stringify(res))
}

// We reverse because the "natural" showing order is from most recent to most older, but in the chart it is the other way around
function writeStats(enrichedDB) {
  const cultureTypes = uniq(culture.map(c => c.type))

  const info = {
    axis: enrichedDB.map(e => e.id).reverse(),
    comedians: {
      perEpisode: enrichedDB.map(e => {
        return e.comedians.length + e.sections.filter(s => s.comedians && s.comedians.length > 0).map(s => s.comedians.length).reduce((a, b) => a + b, 0)
      }).reverse()
    },
    culture: {
      perEpisode: cultureTypes.map(c => {
        return {
          type: c,
          values: enrichedDB.map(e => {
            return e.culture.filter(x => x.type == c).length
          }).reverse()
        }
      })
    }
  }

  fs.writeFileSync(`${BASE_PATH}/statistics.json`, JSON.stringify(info))
}

// HELPER
function getComedianWithMentions() {
  if (comediansWithMentions == undefined) {
    comediansWithMentions = uniq(flatMap(episodes, e => {
      const comedians = e.comedians
      const guests = e.guests
      const comediansInSections = flatMap(e.sections, s => s.comedians)
      const special = e.special === undefined ? [] : [e.special]

      return uniq([].concat(guests).concat(comedians).concat(comediansInSections).concat(special))
    }).reverse())
      .map(comedianID => {
        const comedianInfo = comedians.find(comedian => comedian.id == comedianID)
        if(comedianInfo === undefined) console.log(`Missing: ${JSON.stringify({ id: comedianID, name: capitalLetter(comedianID.replaceAll('-', ' ')) })}`)
        const mentions = episodes.filter(e => e.comedians.includes(comedianID) || e.special == comedianID)
        const tags = episodes.filter(e => flatMap(e.sections, s => s.comedians).includes(comedianID))
          .sort((a, b) => b.season - a.season == 0 ? b.episode - a.episode : b.season - a.season)
          .map(e => {
            const sectionId = e.sections.find(s => s.comedians.includes(comedianID)).id
            return {
              id: sectionId,
              sectionName: trans[sectionId],
              episodeId: e.id,
              episodeTitle: e.title,
              ytID: e.link
            }
          })
        return {
          id: comedianID,
          name: comedianInfo.name,
          subjects: comedianInfo.subjects || [],
          genres: comedianInfo.genres || [],
          mentions: mentions,
          tags: tags
        }
      })
  }

  return comediansWithMentions
}

// ENRICH THE DATABASE FOR FURTHER RETRIEVAL
function enrichDB() {
  return episodes.map(e => {
    const sectionCulture = []
    return {
      id: e.id,
      season: e.season,
      episode: e.episode,
      title: e.title,
      link: e.link,
      hosts: e.hosts.map(h => {
        const host = hosts.find(x => x.id == h)
        return {
          id: host.id,
          name: host.name
        }
      }),
      guests: e.guests.map(g => comedians.find(x => x.id == g)),
      sections: e.sections.map(s => {
        const section = {
          id: s.id,
          name: sections.find(x => x.id == s.id).name
        }

        if (s.comedians != undefined) {
          section.comedians = mapComedians(s.comedians)
        }

        if (s.culture != undefined) {
          section.culture = mapCulture(s.culture)
          sectionCulture.push(section.culture)
        }

        return section
      }),
      comedians: mapComedians(uniq(e.comedians)),
      culture: [].concat(e.culture.map(mapCulture)).concat(sectionCulture).sort((a, b) => a.title.localeCompare(b.title)),
      special: e.special == undefined ? undefined : comedians.find(c => c.id == e.special)
    }
  }).sort((a, b) => b.season - a.season == 0 ? b.episode - a.episode : b.season - a.season)
}

function mapComedians(toMap) {
  return toMap.map(c => {
    const comedian = uniq(comedians).find(x => x.id == c)
    if (comedian == undefined) {
      console.log(`Missing: ${JSON.stringify({ id: c, name: capitalLetter(c.replaceAll('-', ' ')) })}`)
    }
    return comedian
  }).sort((a, b) => a.name.localeCompare(b.name))
}

function mapCulture(toMap) {
  const c = culture.find(x => x.id == toMap)
  if (c == undefined) {
    console.log(`Missing Culture: ${JSON.stringify({ id: toMap, title: capitalLetter(toMap.replaceAll('-', ' ')), type: 'tv-show' })}`)
  }
  return c
}

function capitalLetter(str) {
  str = str.split(" ");

  for (var i = 0, x = str.length; i < x; i++) {
    str[i] = str[i][0].toUpperCase() + str[i].substr(1);
  }

  return str.join(" ");
}

function getMostAppealingComedians(comedian) {
  return getComedianWithMentions()
    .filter(c => c.id != comedian.id)
    .map(c => {
      return {
        id: c.id,
        name: c.name,
        fitness: getComedianFitness(comedian, c)
      }
    })
    .filter(x => x.fitness >= MIN_FITNESS)
    .sort((a, b) => b.fitness - a.fitness)
    .slice(0, MAX_RELATED_COMEDIANS)
}

function getComedianFitness(source, target) {
  const genresLength = target.genres.length + source.genres.length
  const subjectsLength = target.subjects.length + source.subjects.length

  if (genresLength + subjectsLength == 0) {
    return 0
  }

  const commonSubjectsLength = source.subjects.filter(s => target.subjects.includes(s)).length
  const commonGenresLength = source.genres.filter(g => target.genres.includes(g)).length

  const fitness = (commonSubjectsLength + commonGenresLength) / Math.max(genresLength, subjectsLength)

  return (fitness * 100).toFixed(2)
}