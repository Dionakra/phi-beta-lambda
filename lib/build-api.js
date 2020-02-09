const fs = require('fs')
const flatMap = require('lodash/flatMap')
const countBy = require('lodash/countBy')
const groupBy = require('lodash/groupBy')
const uniq = require('lodash/uniq')

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

// Transformations
const enrichedDB = enrichDatabase()

writeMainData(enrichedDB)
writeHosts()
writeSections()
writeGuests(enrichedDB)
writeComediansMain(enrichedDB)
writeComedians(enrichedDB)
writeEpisodes(enrichedDB)
writeCulture()
writeStats()


// Writing
function enrichDatabase() {
  return episodes.map(e => {
    // Hosts
    e.hosts = e.hosts.map(h => {
      const host = hosts.find(x => x.id == h);
      return {
        id: host.id,
        name: host.name
      };
    });

    // Guests
    e.guests = e.guests.map(g => {
      const res = comedians.find(c => c.id == g)
      if (!res) console.log(`Missing: ${JSON.stringify({ id: g, name: capitalLetter(g.replaceAll('-', ' ')) })}`)
      return res
    });

    // Sections
    let sectionCulture = []
    e.sections = e.sections.map(s => {
      s.section = sections.map(x => {
        return {
          id: x.id,
          name: x.name
        }
      }).find(x => x.id == s.section);

      if (s.extra && s.extra.comedians && s.extra.comedians.length > 0) {
        s.extra.comedians = s.extra.comedians.map(c => {
          const res = comedians.find(x => x.id == c)
          if (!res) console.log(`Missing: ${JSON.stringify({ id: c, name: capitalLetter(c.replaceAll('-', ' ')) })}`)
          return res
        });

        if (s.extra && s.extra.culture && s.extra.culture.length > 0) {
          s.extra.culture = s.extra.culture.map(c => {
            const res = culture.find(x => x.id == c)
            if (!res) console.log(`Missing Culture: ${JSON.stringify({ id: c, title: capitalLetter(c.replaceAll('-', ' ')), type: 'tv-show' })}`)
            return res
          });

          sectionCulture = sectionCulture.concat(s.extra.culture.map(c => {
            const clone = Object.assign({}, c)
            clone.section = s.section.name
            return clone
          }))
        }
      }
      return s;
    });

    // Comedians
    e.comedians = e.comedians.map(c => {
      const res = comedians.find(x => x.id == c)
      if (!res) console.log(`Missing: ${JSON.stringify({ id: c, name: capitalLetter(c.replaceAll('-', ' ')) })}`)
      return res
    }).sort((a, b) => a.name.localeCompare(b.name));

    // Special
    e.special = comedians.find(c => c.id == e.special)

    // Culture
    //console.log(e.culture)
    e.culture = (e.culture || []).map(c => {
      const res = culture.find(x => x.id == c)
      if (!res) console.log(`Missing Culture: ${JSON.stringify({ id: c, title: capitalLetter(c.replaceAll('-', ' ')), type: 'tv-show' })}`)
      return res
    }).concat(sectionCulture).sort((a, b) => a.title.localeCompare(b.title))

    return e
  })
}

function writeStats() {
  /*
 {
   "axis": ["s01e01", "s01e02", ...],
   "comedians": {
     "perEpisode": [1, 2, 3],
     "newPerEpisode": [1, 2, 3]
   },
   "culture": {
     "perEpisode": [{
       "type": "whatever",
       "values": [1, 2, 3]
     }],
     "newPerEpisode": [{
       "type": "whatever",
       "values": [1, 2, 3]
     }]
   }
 }    
 */

  // Comedians
  const axis = []
  const comediansPerEpisode = []
  const newComediansPerEpisode = []
  let comediansDB = []

  for (let i in episodes) {
    const episode = episodes[i]
    const id = episode.id

    const com = uniq(flatMap([].concat(episode.comedians).concat(episode.special).concat(episode.sections.filter(s => s.extra && s.extra.comedians).map(s => s.extra.comedians)))).filter(x => x != undefined).map(x => x.id)
    const newComedians = com.filter(value => !comediansDB.includes(value))

    comediansDB = comediansDB.concat(newComedians)

    axis.push(id)
    comediansPerEpisode.push(com.length)
    newComediansPerEpisode.push(newComedians.length)
  }

  // Culture
  let cultureDB = []
  const cultureTypes = uniq(culture.map(c => c.type))
  const culturePerEpisode = []
  const newCulturePerEpisode = []
  for (let i in cultureTypes) {
    const type = cultureTypes[i]

    const newCultureCount = []
    const cultureCount = []

    for (let i in episodes) {
      const episode = episodes[i]
      const cult = [].concat(episode.culture).concat(episode.sections.filter(s => s.extra && s.extra.culture).map(s => s.extra.culture)).filter(x => x != undefined && x.type == type)
      const newCulture = uniq(cult.filter(c => !cultureDB.includes(c.id)).map(c => c.id))

      cultureDB = cultureDB.concat(newCulture)

      cultureCount.push(uniq(cult.map(x => x.id)).length)
      newCultureCount.push(newCulture.length)
    }

    culturePerEpisode.push({
      type: type,
      values: cultureCount
    })

    newCulturePerEpisode.push({
      type: type,
      values: newCultureCount
    })
  }


  const stats = {
    axis,
    comedians: {
      perEpisode: comediansPerEpisode,
      newPerEpisode: newComediansPerEpisode
    },
    culture: {
      perEpisode: culturePerEpisode,
      newPerEpisode: newCulturePerEpisode
    }
  }

  fs.writeFileSync(`${BASE_PATH}/statistics.json`, JSON.stringify(stats))
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

function writeEpisodes(enrichedDB) {
  enrichedDB.forEach(e => fs.writeFileSync(`${BASE_PATH}/episodes/${e.id}.json`, JSON.stringify(e)))
}

function writeComedians(enrichedDB) {
  comedians.map(c => c.id).forEach(id => {
    const comedian = comedians.find(c => c.id == id);

    // Episodes that the comedian was mentioned
    const mentions = enrichedDB
      .filter(e => {
        return e.comedians.includes(comedian)
      })
      .map(e => {
        return {
          id: e.id,
          season: e.season,
          episode: e.episode,
          link: e.link,
          title: e.title
        };
      });

    // Episodes that the comedian was part of something special
    const vip = enrichedDB
      .filter(e => {
        return flatMap(e.sections, s => {
          const special = e.special || []
          if (s.extra && s.extra.comedians) {
            return s.extra.comedians.concat(special)
          } else {
            return special;
          }
        }).includes(comedian)
      })
      .map(e => {
        return {
          id: e.id,
          season: e.season,
          episode: e.episode,
          link: e.link,
          title: e.title,
          section: e.sections.find(
            s =>
              s.extra &&
              s.extra.comedians &&
              s.extra.comedians.includes(comedian)
          ),
          special: e.special
        };
      });

    const info = {
      mentions,
      vip,
      comedian
    };

    fs.writeFileSync(`${BASE_PATH}/comedians/${id}.json`, JSON.stringify(info))
  })
}

function writeComediansMain() {
  const comediansOnEpisodes = flatMap(enrichedDB, e => {
    return flatMap(e.sections, s => {
      if (s.extra != undefined && s.extra.comedians != undefined) {
        return s.extra.comedians
      } else {
        return [];
      }
    }).concat(e.comedians)
  })

  // Count occurrences per comedian
  const stats = countBy(comediansOnEpisodes, "id");

  // Add info with comedian names and appearences
  const comediansInfo = Object.keys(stats).map(k => {
    const details = comediansOnEpisodes.filter(c => c.id == k).map(c => {
      return {
        id: c.id,
        name: c.name,
        thank: findComedianOnSection(k, 'thank-you'),
        day: findComedianOnSection(k, 'comedian-of-the-day')
      }
    })[0]

    return {
      details: details,
      appeareances: stats[k]
    };
  });

  fs.writeFileSync(`${BASE_PATH}/comedians.json`, JSON.stringify(comediansInfo))
}

function findComedianOnSection(comedianID, sectionId) {
  return enrichedDB.find(e => {
    let res = false;
    const section = e.sections.find(s => s.section.id == sectionId)

    if (section) {
      res = section.extra.comedians.filter(c => c.id == comedianID).length > 0
    }

    return res;
  })
}

function writeGuests(enrichedDB) {
  const info = flatMap(enrichedDB, e => {
    return e.guests.map(g => {
      return {
        id: g.id,
        name: g.name,
        episode: {
          id: e.id,
          season: e.season,
          episode: e.episode,
          title: e.title
        }
      };
    })
  })
    .sort((a, b) => {
      let res = b.episode.season - a.episode.season;

      if (res == 0) {
        res = b.episode.episode - a.episode.episode;
      }

      return res;
    });

  fs.writeFileSync(`${BASE_PATH}/guests.json`, JSON.stringify(info))
}

function writeSections() {
  const info = sections.map(s => {
    s.host = hosts.find(h => h.id == s.host)
    return s
  }).sort((a, b) => a.name.localeCompare(b.name))

  fs.writeFileSync(`${BASE_PATH}/sections.json`, JSON.stringify(info))
}

function writeHosts() {
  fs.writeFileSync(`${BASE_PATH}/hosts.json`, JSON.stringify(hosts))
}

function writeMainData(enrichedDB) {
  const info = enrichedDB
    .sort((a, b) => b.season - a.season == 0 ? b.episode - a.episode : b.season - a.season)

  fs.writeFileSync(`${BASE_PATH}/main.json`, JSON.stringify(info))
}

function capitalLetter(str) {
  str = str.split(" ");

  for (var i = 0, x = str.length; i < x; i++) {
    str[i] = str[i][0].toUpperCase() + str[i].substr(1);
  }

  return str.join(" ");
}