const JWT = `\\b(ey[A-Za-z0-9-_=]+)\\.(ey[A-Za-z0-9-_=]+)\\.[A-Za-z0-9-_.+/=]+\\b`;

export const defaultRegex = [
  [
    {
      regex: new RegExp(JWT, "g"),
      replacement: `$1.$2.redacted`,
    },
  ],
];

export function buildRegex(word) {
  const fullWord = `([\\s";,&?]+${word}=)([\\w+-_/=#|.%&:!*()\`~'"]+?)(&|\\\\",|",|"\\s|"}}|;){1}`;
  const valueNotAfterName = `("name": "${word}",[\\s\\w+:"-\\%!*()\`~'.,#]*?"value": ")([\\w+-_:&\\+=#~/$()\\.\\,\\*\\!|%"'\\s;{}]+?)("[\\s]+){1}`;
  const nameAfterValue = `("value": ")([\\w+-_:&+=#$~/()\\\\.\\,*!|%"\\s;]+)("[,\\s}}]+)([\\s\\w+:"-\\\\%!*\`()~'#.]*"name": "${word}")`;

  return [
    {
      regex: new RegExp(fullWord, "g"),
      replacement: `$1[${word} redacted]$3`,
    },
    {
      regex: new RegExp(valueNotAfterName, "g"),
      replacement: `$1[${word} redacted]$3`,
    },
    {
      regex: new RegExp(nameAfterValue, "g"),
      replacement: `$1[${word} redacted]$3$4`,
    },
  ];
}
