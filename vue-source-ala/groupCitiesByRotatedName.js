/*
Problem:
['Tokyo', 'London', 'Rome', 'Donlon', 'Kyoto', 'Paris']
// YOUR ALGORITHM
[
    [ 'Tokyo', 'Kyoto' ],
    [ 'London', 'Donlon' ],
    [ 'Rome' ],
    [ 'Paris' ]
]
*/

const getWordRotations = word =>
  [...word].reduce(
    acc => [acc[0].substring(1) + acc[0].substring(0, 1), ...acc],
    [word]
  );

const groupCitiesByRotatedNames = cities =>
  cities.reduce((acc, city) => {
    const cityGroup = acc.find(item =>
      getWordRotations(city.toLowerCase()).includes(item[0].toLowerCase())
    );

    cityGroup
      ? acc.splice(acc.indexOf(cityGroup), 1, [...cityGroup, city])
      : acc.push([city]);

    return acc;
  }, []);

const test = groupCitiesByRotatedNames([
  "Tokyo",
  "London",
  "Rome",
  "Donlon",
  "Kyoto",
  "Paris"
]);

console.log("test", test);