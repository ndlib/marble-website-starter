const indexToElasticSearch = require('./indexToElasticSearch')

const nodes = [
]

for (let i = 0; i < 20003; i++) {
  nodes.push({ id: i, body: i })
}

const client = {
  bulk: (items) => {
    return { errors: [], items: items.body }
  },
}

indexToElasticSearch(client, 'indexy', nodes)
