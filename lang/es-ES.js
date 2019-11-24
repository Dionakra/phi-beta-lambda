export default {
  menu: {
    hosts: 'Presentadores',
    guests: 'Invitados',
    comedians: 'Cómicos',
    sections: 'Secciones'
  },
  comedian: {
    appeareances: {
      prefix: "Nombrado en",
      suffix: "programas"
    },
    searchTerm: "Busca un/a cómico/a...",
    sort: {
      by: "Ordenar por",
      direction: "Sentido",
      name: "Nombre",
      appeareances: "Veces nombrado",
      ascendent: "Ascendente",
      descendent: "Descendente"
    }
  },
  hosts: {
    "antonio-castelo": {
      description: "Antonio Castelo AKA <i class='pbl-red'>Don Gordo</i> AKA <i class='pbl-red'>Odamae Brown</i>, es el presentador del programa y uno de los dueños. También trabaja como copresentador en <i class='pbl-red'>Todo es Mentira</i>, un programa de TV emitido en Cuatro.",
      sections: {}
    },
    "miguel-campos": {
      description: "Miguel Campos AKA <i class='pbl-red'>El otro</i> es uno de los dueños del proyecto. Es responsable de la sección <i><strong class='pbl-red'>Roast to the people</strong></i> y <i><strong class='pbl-red'>Pena mora</strong></i>, dos secciones basadas en la participación de los espectadores. También trabaja como coordinador de guiones en <i class='pbl-red'>La Resistencia</i>.",
      sections: {
        roast: {
          title: "Roast to the people",
          description: "Las phienas solicitan a Miguel Campos a rostearles en base al perfil de Instagram. Esto significa que Miguel da opiniones hirientes de los espectadores en base a sus fotos. #WeOnlyRoastTheOnesWeLove"
        },
        penamora: {
          title: "Pena mora",
          description: "Las phienas envían a Miguel Campos historias tristonas sobre ellos mismos, rompiendo el ambiente de comedia del programa."
        }
      }
    },
    "iggy-rubin": {
      description: "Iggy Rubin es el empollón de comedia del programa. Es responsable de las secciones <i><strong class='pbl-red'>Thank you for this beautiful comedy</strong></i> y <i><strong class='pbl-red'>Gira de festivales</strong></i>.",
      sections: {
        thankyou: {
          title: "Thank you for this beautiful comedy",
          description: "Análisis técnico y formal sobre un especial de comedia, en el cual Iggy Rubín da aspectos clave sobre el especial desde una perspectiva de cómico."
        }
      },
      festivales: {
        title: "Gira de festivales",
        description: "Iggy Rubín resume la vida de un cómico que ya no está entre nosotros. Normalmente narra la vida de cómicos problemáticos con muertes o circunstancias respecto a ellas curiosas."
      }
    },
    "jorge-yorya": {
      description: "Jorge Yorya es un elemento clave en el programa. Hace, básicamente, lo que le apetece en <i><strong class='pbl-red'>My name is Giovani Giorgio, but everybody calls me Yorya</strong></i> de unas formas un poco rarunas. Es como un accidente de coche, no es agradable de ver pero no puedes dejar de mirarlo. <i class='pbl-red'>#Yoryer</i>",
      sections: {
        giorgio: {
          title: "My name is Giovani Giorgio, but everybody calls me Yorya.",
          description: "Jorge Yorya hace lo que le da la gana en sus secciones. Encuestas, actualización de redes sociales, concursos, traiciones, dar algo de vergüenza ajena y, básicamente, ser un desastre. Pero es el desastre que amamos."
        }
      }
    }
  }
}