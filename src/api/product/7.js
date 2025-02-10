import data from '../../data/products.json'

export default function handler(req, res) {

  let product_id = 7

  let product = data.find( entry => {
    return (
      product_id === entry.id
    )
  })

  res.status(200).json(
    {
      "status": true,
      "message": "Successfully fetched",
      "data": product
    }
  )
}