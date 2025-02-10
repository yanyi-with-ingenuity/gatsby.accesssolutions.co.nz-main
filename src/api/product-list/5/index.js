import data from "../../../data/products.json"

export default function handler(req, res) {

  const category_id = "5"

  let get_section = data.filter( entry => {
    return (
      category_id === entry.category
    )
  })

  let cherry_pickers_petrol = get_section.filter( entry => {
    let sub_category = 'cherry_pickers_petrol'
    return (
      sub_category === entry.subcategory_name
    )
  })

  res.status(200).json(
    {
      "status":true,
      "message":"Successfully fetched",
      "data":[
        {
          "category":"Cherry Pickers - Petrol",
          "products": cherry_pickers_petrol
        },
      ]
    }
  )
}