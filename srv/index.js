const puppeteer = require('puppeteer');
const fs = require("fs");
const path = require('path');

async function getProductInfo(url, region) {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  try {
    await page.goto('https://www.vprok.ru', { waitUntil: 'domcontentloaded' });
    await page.waitForSelector('body')
    await page.waitForSelector('#__next > div > main > div:nth-child(3) > div > div.Address_wrapper__Wir0b.FeaturePageHomeBase_block__sQ6LW.FeaturePageHomeBase_mobile__mgDqq', { timeout: 9000 }).catch(() => console.log('1'));
    await page.screenshot({ path: new Date().getTime()+'.png', fullPage: true})
    await page.waitForSelector('#__next > div.Modal_root__kPoVQ.Modal_open__PaUmT > div > div', { timeout: 3000 }).catch(() => console.log('Всплывающее окно рекламы не найдено'));
    await page.screenshot({ path: new Date().getTime()+'.png', fullPage: true})
    await page.click('#__next > div.Modal_root__kPoVQ.Modal_open__PaUmT > div > div > div.Content_root__7DKIP.Content_modal__gAOHB > button');
    await page.waitForSelector('#__next > div > main > div:nth-child(3) > div > div.Address_wrapper__Wir0b.FeaturePageHomeBase_block__sQ6LW.FeaturePageHomeBase_mobile__mgDqq', { timeout: 3000 }).catch(() => console.log('Элемент 2 не найден'));
    await page.waitForSelector('#__next > div > main > div:nth-child(3) > div > div.Address_wrapper__Wir0b.FeaturePageHomeBase_block__sQ6LW.FeaturePageHomeBase_mobile__mgDqq > div.Address_address__QJ20h > div > div.FeatureAddressSettingMobile_regionWrapper__PVKLR > span.FeatureAddressSettingMobile_text__R1icU', { timeout: 3000 }).catch(() => console.log('Элемент 3 не найден'))
    await page.screenshot({ path: new Date().getTime()+'.png', fullPage: true})
    await page.click('#__next > div > main > div:nth-child(3) > div > div.Address_wrapper__Wir0b.FeaturePageHomeBase_block__sQ6LW.FeaturePageHomeBase_mobile__mgDqq > div.Address_address__QJ20h > div > div.FeatureAddressSettingMobile_regionWrapper__PVKLR');

    await page.waitForSelector('#__next > div.Modal_root__kPoVQ.Modal_open__PaUmT > div > div > div.UiRegionListBase_root__Z4_yT > div.UiRegionListBase_listWrapper__Iqbd5', { timeout: 3000 }).catch(() => console.log('Элемент 4 не найден'))
    await page.waitForSelector(`#__next > div.Modal_root__kPoVQ.Modal_open__PaUmT > div > div > div.UiRegionListBase_root__Z4_yT > div.UiRegionListBase_listWrapper__Iqbd5 > ul > li:nth-child(${region})`)
    await page.screenshot({ path: new Date().getTime()+'.png', fullPage: true})
    await page.click(`#__next > div.Modal_root__kPoVQ.Modal_open__PaUmT > div > div > div.UiRegionListBase_root__Z4_yT > div.UiRegionListBase_listWrapper__Iqbd5 > ul > li:nth-child(${region})`);
    await page.screenshot({ path: new Date().getTime()+'.png', fullPage: true})


    await page.goto('https://www.vprok.ru/product/domik-v-derevne-dom-v-der-moloko-ster-3-2-950g--309202', { waitUntil: 'domcontentloaded' });
    await page.waitForSelector('#bottomPortal-buyBlock > div > div > div.PriceInfo_root__GX9Xp > span', { timeout: 3000 }).catch(() => console.log('Элемент с ценой не найден'));
    await page.waitForSelector('#bottomPortal-buyBlock > div > div > div.PriceInfo_root__GX9Xp > div > span.Price_price__QzA8L.Price_size_XS__ESEhJ.Price_role_old__r1uT1', { timeout: 3000 }).catch(() => console.log('Элемент с предыдущей ценой не найден'));
    await page.waitForSelector('#__next > div > main > div:nth-child(2) > div > div.ProductPage_title__3hOtE > div.ProductPage_actionsRow__KE_23 > div > div.ActionsRow_reviewsWrapper__D7I6c > div.ActionsRow_stars__EKt42 > div > span', { timeout: 3000 }).catch(() => console.log('Элемент с рейтингом не найден'));
    await page.waitForSelector('#__next > div > main > div:nth-child(2) > div > div.ProductPage_title__3hOtE > div.ProductPage_actionsRow__KE_23 > div > div.ActionsRow_reviewsWrapper__D7I6c > div.ActionsRow_reviews__AfSj_ > button > span', { timeout: 3000 }).catch(() => console.log('Элемент с количеством отзывов не найден'));

    // Извлекаем данные о цене
    const priceElement = await page.$('#bottomPortal-buyBlock > div > div > div.PriceInfo_root__GX9Xp > span');
    const price =  priceElement ? await page.evaluate(element => element?.textContent.trim(), priceElement) : '';

    // Извлекаем данные о старой цене
    const priceOldElement = await page.$('#bottomPortal-buyBlock > div > div > div.PriceInfo_root__GX9Xp > div > span.Price_price__QzA8L.Price_size_XS__ESEhJ.Price_role_old__r1uT1');
    const priceOld = priceOldElement ? await page.evaluate(element => element?.textContent.trim(), priceOldElement) : '';

    // Извлекаем данные о рейтинге
    const ratingElement = await page.$('#__next > div > main > div:nth-child(2) > div > div.ProductPage_title__3hOtE > div.ProductPage_actionsRow__KE_23 > div > div.ActionsRow_reviewsWrapper__D7I6c > div.ActionsRow_stars__EKt42 > div > span');
    const rating =  ratingElement ? await page.evaluate(element => element?.textContent.trim(), ratingElement) : '';

    // Извлекаем данные о количестве отзывов
    const reviewCountElement = await page.$('#__next > div > main > div:nth-child(2) > div > div.ProductPage_title__3hOtE > div.ProductPage_actionsRow__KE_23 > div > div.ActionsRow_reviewsWrapper__D7I6c > div.ActionsRow_reviews__AfSj_ > button');
    const reviewCount = reviewCountElement ? await page.evaluate(element => element?.textContent.trim(), reviewCountElement) : '';
    console.log({ price, priceOld, rating, reviewCount })
    await page.screenshot({ path: 'screenshot.jpg', fullPage: true})


    const filePath = 'product.txt';
    const fileContent = JSON.stringify({ price, priceOld, rating, reviewCount });

    const directory = './'; // Корень проекта

    fs.readdir(directory, (err, files) => {
      if (err) {
        console.error('Ошибка при чтении каталога:', err);
        return;
      }

      files.forEach(file => {
        const filePath = path.join(directory, file);

        // Проверяем, не является ли файл тем, который мы хотим сохранить
        if (path.extname(file) === '.png') {
          fs.unlink(filePath, err => {
            if (err) {
              console.error('Ошибка при удалении файла:', err);
              return;
            }
            console.log(`Файл ${file} успешно удален.`);
          });
        }
      });
    });

// Запись данных в файл
    fs.writeFile(filePath, fileContent, (err) => {
      if (err) {
        console.error('Ошибка при записи файла:', err);
        return;
      }
      console.log('Файл успешно записан.');
    });

    return { price, priceOld, rating, reviewCount };
  } catch (error) {
    console.error('Ошибка при загрузке страницы:', error);
  } finally {
    await browser.close();
  }

}

module.exports = { getProductInfo };