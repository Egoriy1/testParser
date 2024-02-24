const prompts = require('prompts');
const sade = require('sade');
const { getProductInfo } = require("./srv/index");


const cli = sade('choose-region');


cli.command('run')
  .describe('Выбрать регион')
  .example('https://www.example.com')
  .action(async () => {
    const response = await prompts([
      {
        type: 'text',
        name: 'url',
        message: 'Введите URL продукта:'
      },
      {
        type: 'select',
        name: 'region',
        message: 'Выберите регион: ',
        choices: [
          { title: 'Москва и область', value: 1 },
          { title: 'Санкт-Петербург и область', value: 2 },
          { title: 'Владимирская обл.', value: 3 },
          { title: 'Калужская обл.', value: 4 },
          { title: 'Рязанская обл.', value: 5 },
          { title: 'Тверская обл', value: 6 },
          { title: 'Тульская обл.', value: 7 },
        ]
      }
    ]);

    await getProductInfo(response.url, response.region)
  });

cli.parse(process.argv);