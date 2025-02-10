import data from "../../../data/products.json"

export default function handler(req, res) {

  const category_id = "12"

   let get_section = data.filter( entry => {
      return (
         category_id === entry.category
      )
   })

   console.log('get_section: ', get_section);

   let fork_lifts_manual = get_section.filter( entry => {
      let sub_category = 'fork_lifts_manual'
      return (
         sub_category === entry.subcategory_name
      )
   })

   console.log('fork_lifts_manual: ', fork_lifts_manual);

   let fork_lifts_electric = get_section.filter( entry => {
      let sub_category = 'fork_lifts_electric'
      return (
         sub_category === entry.subcategory_name
      )
   })

   let fork_lifts_lpg = get_section.filter( entry => {
      let sub_category = 'fork_lifts_lpg'
      return (
         sub_category === entry.subcategory_name
      )
   })

   let fork_lifts_petrol_lpg = get_section.filter( entry => {
      let sub_category = 'fork_lifts_petrol_lpg'
      return (
         sub_category === entry.subcategory_name
      )
   })

   let fork_lifts_diesel = get_section.filter( entry => {
      let sub_category = 'fork_lifts_diesel'
      return (
         sub_category === entry.subcategory_name
      )
   })

   let fork_lifts_rough_terrain_diesel = get_section.filter( entry => {
      let sub_category = 'fork_lifts_rough_terrain_diesel'
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
            "category":"Fork lifts - Manual",
            "products": fork_lifts_manual
         },
         {
            "category":"Fork lifts - Electric",
            "products": fork_lifts_electric
         },
         {
            "category":"Fork lifts - LPG",
            "products": fork_lifts_lpg
         },
         {
            "category":"Fork lifts - Petrol & LPG",
            "products": fork_lifts_petrol_lpg
         },
         {
            "category":"Fork lifts - Diesel",
            "products": fork_lifts_diesel
         },
         {
            "category":"Fork Lifts - Rough Terrain Diesel",
            "products": fork_lifts_rough_terrain_diesel
         },
      ]
    }
  )
}