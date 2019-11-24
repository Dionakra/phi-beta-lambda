export default {
  menu: {
    hosts: 'Hosts',
    guests: 'Guests',
    comedians: 'Comedians',
    sections: 'Sections'
  },
  comedian: {
    appeareances: {
      prefix: "Named in",
      suffix: "episodes"
    },
    searchTerm: "Search a comedian...",
    sort: {
      by: "Sort by",
      direction: "Direction",
      name: "Name",
      appeareances: "Times named",
      ascendent: "Ascendent",
      descendent: "Descendent"
    }
  },
  hosts: {
    "antonio-castelo": {
      description: "Antonio Castelo AKA <i class='pbl-red'>Mr. Fattie</i> AKA <i class='pbl-red'>Odamae Brown</i>, is the conductor of the show and one of the owners. He also works as a side host at <i class='pbl-red'>Todo es Mentira</i>, a Spanish TV Show aired on Cuatro.",
      sections: {}
    },
    "miguel-campos": {
      description: "Miguel Campos AKA <i class='pbl-red'>The other one</i> is one of the owners of the project. He is responsible of the sections <i><strong class='pbl-red'>Roast to the people</strong></i> and <i><strong class='pbl-red'>Pena mora</strong></i>, two sections based on the viewers' participation. He also works as a script coordinator at <i class='pbl-red'>La Resistencia</i>, a famous spanish late night.",
      sections: {
        roast: {
          title: "Roast to the people",
          description: "Phienas ask Miguel Campos to roast them based on their Instagram profiles. That means that Miguel gives mean opinions about the people based on their photos. <i><strong class='pbl-red'>WeOnlyRoastTheOnesWeLove</strong></i>"
        },
        penamora: {
          title: "Pena mora",
          description: "Phienas send Miguel Campos sad stories about themselves, breaking the program's comedy vibe."
        }
      }
    },
    "iggy-rubin": {
      description: "Iggy Rubin is the main comedy savvy of the show. He is responsible of the sections <i><strong class='pbl-red'>Thank you for this beautiful comedy</strong></i> and <i><strong class='pbl-red'>Gira de festivales</strong></i>.",
      sections: {
        thankyou: {
          title: "Thank you for this beautiful comedy",
          description: "Technical and formal analysis of a comedy special, where Iggy Rubin gives the key aspects of the show based on a comedian's perspective."
        }
      },
      festivales: {
        title: "Gira de festivales",
        description: "Iggy Rubin summarizes the life of a comedian that is currently dead. Usually he narrates the life of a problematic or troublesome comedian, who died in funny ways."
      }
    },
    "jorge-yorya": {
      description: "Jorge Yorya is a key element on this show. He does, basically, whatever he wants in <i><strong class='pbl-red'>My name is Giovani Giorgio, but everybody calls me Yorya</strong></i> in an akward way. He is like a car accident, it is not pleasant to contemplate it but you cannot stop looking at it. <i class='pbl-red'>#Yoryer</i> ",
      sections: {
        giorgio: {
          title: "My name is Giovani Giorgio, but everybody calls me Yorya.",
          description: "Jorge Yorya does whatever he wants in this section. Polls, social networks update, contests, betrayals, ashame people and, basically, he is a disaster. But he is a disaster we love."
        }
      }
    }
  }
}