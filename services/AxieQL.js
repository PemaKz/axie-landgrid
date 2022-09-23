const axios = require('axios');

module.exports = {
  getLandQL: (row, col) => {
    return new Promise(async (resolve) => {
      try{
      const query = {
        "operationName": "GetLandDetail",
        "variables": {
          "row": row,
          "col": col
        },
        "query": "query GetLandDetail($col: Int!, $row: Int!) {\n  land(col: $col, row: $row) {\n    ...LandDetail\n }\n}\n\nfragment LandDetail on LandPlot {\n  tokenId\n   landType\n}\n"
      };
      const response = await axios.post('https://graphql-gateway.axieinfinity.com/graphql', query);
      resolve({landInfo: response.data.data.land, error: false});
      } catch (e) {
      resolve({error: 'Limited query'});
      }
    })
  }
}