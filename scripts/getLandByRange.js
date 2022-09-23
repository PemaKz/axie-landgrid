const AxieQL = require("../services/AxieQL");
const fs = require('fs');

module.exports = (colMin = -150, colMax = 30, rowMin = -150, rowMax = -30) => {
  return new Promise(async (resolve) => {
    const landReturn = [];
    for(let c = colMin; c <= colMax; c++){
      for(let r = rowMin; r <= rowMax; r++){
        let landInfo = await AxieQL.getLandQL(c, r)
        if(landInfo.error) {
          const randomTime = (Math.random()*3) * 60000
          console.log('Got Blocked Trying Again in ...')
          await new Promise(resolve => setTimeout(resolve, randomTime));
          landInfo.landInfo = await AxieQL.getLandQL(c, r)
        }
        if(landInfo.landInfo) {
          landReturn.push({
            landID: landInfo.landInfo.tokenId,
            landType: landInfo.landInfo.landType, 
            col: c, row: r
          });
          console.log({landInfo: landInfo.landInfo.tokenId ? landInfo.landInfo.tokenId : 'Unclaimed', landType: landInfo.landInfo.landType, col: c, row: r})
        } else {
          landReturn.push({
            landID: 'Unavailable',
            landType: 'Unavailable', 
            col: c, row: r
          });
        }
      }
    }
    fs.readFile('lands.json', 'utf8', (err, data) => {
      if (err) return console.log('Cant read file');
      const obj = JSON.parse(data);
      fs.writeFile('lands.json', JSON.stringify([...obj, ...landReturn]), function (err) {
        if (err) throw err;
      });
    });
    resolve('Done');
  })
}