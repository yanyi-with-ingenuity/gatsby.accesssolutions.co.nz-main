import data from "../../../data/products.json"

export default function handler(req, res) {

  const category_id = "3"

  let get_section = data.filter( entry => {
    return (
      category_id === entry.category
    )
  })

  let mastlifts_manual = get_section.filter( entry => {
    let sub_category = 'mastlifts_manual'
    return (
      sub_category === entry.subcategory_name
    )
  })

  let scissor_lifts_electric = get_section.filter( entry => {
    let sub_category = 'scissor_lifts_electric'
    return (
      sub_category === entry.subcategory_name
    )
  })

  let scissor_lifts_rough_terrain_electric_hybrid = get_section.filter( entry => {
    let sub_category = 'scissor_lifts_rough_terrain_electric_hybrid'
    return (
      sub_category === entry.subcategory_name
    )
  })

  let scissor_lifts_diesel = get_section.filter( entry => {
    let sub_category = 'scissor_lifts_diesel'
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
          "category":"Mastlifts - Manual",
          "products": mastlifts_manual
        },
        {
          "category":"Scissor Lifts - Electric",
          "products": scissor_lifts_electric
        },
        {
          "category":"Scissorlift - Rough Terrain - Electric\/Hybrid",
          "products": scissor_lifts_rough_terrain_electric_hybrid
        },
        {
          "category":"Scissor Lifts - Diesel",
          "products": scissor_lifts_diesel
        }
      ]
    }
  )
}