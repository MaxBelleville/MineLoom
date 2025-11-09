import moo from 'moo'

export const lexer = moo.compile({
    ws: /[ \t]+/,
    comment: /\/\/.*?$/,
    num: /0|[1-9][0-9]*/,
    str: /"(?:\\["\\]|[^\n"\\])*"/,
    iden: {
        match: /[a-zA-Z][a-zA-Z_0-9]*/, type: moo.keywords({
            keyw: ['while', 'if', 'else', 'moo', 'cows'],
        })
    },
    lambda: '=>',
    nl: { match: /\n/, lineBreaks: true },
});

