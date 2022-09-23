const getLandByRange =  require('./scripts/getLandByRange.js')

const start = async () => {
  const land = getLandByRange(-70, -30, -150, -30)
  const land2 = getLandByRange(-30, 0, -150, -30)
  const land3 = getLandByRange(0, 30, -150, -30)
}

start()