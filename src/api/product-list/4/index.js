import data from "../../../data/products.json"

export default function handler(req, res) {

  const category_id = "4"

  let get_section = data.filter( entry => {
    return (
      category_id === entry.category
    )
  })

  let mastlifts_electric = get_section.filter( entry => {
    let sub_category = 'mastlifts_electric'
    return (
      sub_category === entry.subcategory_name
    )
  })

  let knuckle_boom_lifts_electric = get_section.filter( entry => {
    let sub_category = 'knuckle_boom_lifts_electric'
    return (
      sub_category === entry.subcategory_name
    )
  })

  let knuckle_boom_lifts_hybrid_boom = get_section.filter( entry => {
    let sub_category = 'knuckle_boom_lifts_hybrid_boom'
    return (
      sub_category === entry.subcategory_name
    )
  })

  let knuckle_boom_lifts_diesel = get_section.filter( entry => {
    let sub_category = 'knuckle_boom_lifts_diesel'
    return (
      sub_category === entry.subcategory_name
    )
  })

  let telescopic_boom_lifts_diesel = get_section.filter( entry => {
   let sub_category = 'telescopic_boom_lifts_diesel'
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
          "category":"Mastlifts - Electric",
          "products": mastlifts_electric
        },
        {
          "category":"Knuckle Boom Lifts - Electric",
          "products": knuckle_boom_lifts_electric
        },
        {
          "category":"Knuckle Boom Lifts - Hybrid Boom",
          "products": knuckle_boom_lifts_hybrid_boom
        },
        {
          "category":"Knuckle Boom Lifts - Diesel",
          "products": knuckle_boom_lifts_diesel
        },
        {
         "category":"Telescopic Boom Lifts - Diesel",
         "products": telescopic_boom_lifts_diesel
       }
      ]
    }
  )
}