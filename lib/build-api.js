const fs = require('fs')
const flatMap = require('lodash/flatMap')
const groupBy = require('lodash/groupBy')
const uniq = require('lodash/uniq')

const trans = {
  'comedian-of-the-day': "#Cómic@DelDía",
  'thank-you': '#ThankYouForThisBeautifulComedy',
  'gira-de-festivales': '#GiraDeFestivales'
}

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
const BASE_PATH = '../static/api'

// Writing files
writeHosts()
writeSections()
writeComediansMain()
writeComedians()
writeCulture()

const enrichedDB = enrichDB()
writeMainData(enrichedDB)
writeGuests(enrichedDB)
writeEpisodes(enrichedDB)
writeStats(enrichedDB)

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
      mentions: c.tags.length + c.mentions.length
    }
  })

  fs.writeFileSync(`${BASE_PATH}/comedians.json`, JSON.stringify(info))
}

function writeComedians() {
  const info = getComedianWithMentions().map(c => {
    return {
      id: c.id,
      name: c.name,
      vip: c.tags.map(t => t.episode + " | " + trans[t.id]),
      mentions: c.mentions.map(m => m.id.toUpperCase() + " - " + m.title)
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
  return comedians.map(c => {
    const tags = flatMap(episodes, e => {
      return e.sections.map(s => {
        return {
          episode: e.id.toUpperCase() + " - " + e.title,
          id: s.id,
          comedians: s.comedians
        }
      })
    }).filter(s => {
      if (s.comedians) {
        return s.comedians.includes(c.id)
      } else {
        return false
      }
    })

    return {
      id: c.id,
      name: c.name,
      tags: tags,
      mentions: episodes.filter(e => e.comedians.includes(c.id) || e.special == c.id)
    }
  })
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
      comedians: mapComedians(e.comedians),
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
    console.log(`Missing Culture: ${JSON.stringify({ id: c, title: capitalLetter(c.replaceAll('-', ' ')), type: 'tv-show' })}`)
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