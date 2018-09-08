'use strict';
const fs = require('fs');
const path = require('path');
const markdownLinkExtractor = require('markdown-link-extractor');
const linkCheck = require('link-check');

const validateMD = (direction) => new Promise((resolve, reject) => {
  if (path.extname(direction) === '.md') {
    resolve(direction);
  }
  else {
    reject('no es un archivo MD')
  }
})//resuelve la ruta ingresada, pero validada si es MD 
//y entra a la siguiente funcion como doc para que la lea
const readFile = (doc) => new Promise((resolve, reject) => {
  fs.readFile(doc, 'utf8', (err, data) => {
    if (err) {
      reject(err);
    } else {
      resolve(data);
    }
  })
})//resuelve el texto del documento.md en string y entra como text a la siguiente 
//funcion para que extraiga los links
const linksExtractor = (text) => new Promise((resolve, reject) => {
  const arrayLinks = markdownLinkExtractor(text);
  resolve(arrayLinks)
})
const validateStatusHttp = (arrayLinks) => new Promise((resolve, reject) => {
  arrayLinks.forEach(link => {
    linkCheck(link, (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve (result);
      }
    })
  });
})



// module.exports = validateMD;
// module.exports = readFile;

module.exports = {
  validateMD,
  readFile,
  linksExtractor,
  validateStatusHttp,
}