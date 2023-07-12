const SystemInfo = require('./src/SystemInfo')

module.exports = {
  frontend: {
    components: [() => SystemInfo],
  },
}
