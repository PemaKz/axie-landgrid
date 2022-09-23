const getLandByRange =  require('./scripts/getLandByRange.js')

const start = async () => {
  const land = getLandByRange(-150, -120, -150, -30)
  const land2 = getLandByRange(-120, -90, -150, -30)
  const land3 = getLandByRange(-90, -70, -150, -30)
}

start()