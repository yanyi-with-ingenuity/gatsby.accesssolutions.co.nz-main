import data from "../../data/products.json"

export default async function handler(req, res) {
  
  let query = req.query;
  let find_solution = get_products(data, query);
  let array = [];

  //console.log('✅ find_solution', find_solution);

  for (let entry of find_solution) {
    if (array.length < 6) {
      array.push({
        id: `${entry.id !== null ? entry.id : ''}`,
        name: `${entry.name !== null ? entry.name : ''}`,
        platformSize: `${entry.platform_length !== null ? entry.platform_length : ''} x ${entry.platform_width !== null ? entry.platform_width : ''}`,
        workingHeight: `${entry.working_height !== null ? entry.working_height : ''}`,
        platformCapacity: `${entry.platform_capacity !== null ? entry.platform_capacity : ''}`,
        overallWidth: `${entry.overall_width !== null ? entry.overall_width : ''}`,
        weight: `${entry.weight !== null ? entry.weight : ''}`,
        platformHeight: `${entry.platform_height !== null ? entry.platform_height : ''}`,
        document: `${entry.pdf !== null ? entry.pdf : ''}`,
      })
    }
  }

  //console.log('✅ array', array);

  return res.status(200).json({
    "status": true,
    "message": "Successfully fetched",
    "data": array,
  });

}

const get_products = (products, query) => {

  //console.log('✅ query', query);
  //console.log('✅ products', products);

  let formData = [];

  formData.environment = query.environment_option;
  formData.terrain = query.terrain_option;
  formData.job_type = query.requirment_option;
  formData.weight = query.weight_option;
  formData.working_height = query.max_height;

  //console.log('✅ formData', formData);

  if (formData.job_type === 'Working at heights') {

    let find_solution = products.filter( entry => {

        let environment_match = entry.environment === formData.environment;
        environment_match = environment_match || entry.environment === "Indoor & Outdoor"
        
        let terrain_match = entry.terrain === formData.terrain;
        
        if (formData.terrain === "Smooth flat surface") {
          terrain_match = terrain_match || entry.terrain === "Uneven or slippery surface"
        }

        return (
          environment_match
          && terrain_match
          && entry.job_type === formData.job_type
          && parseFloat(entry.working_height) > parseFloat(formData.working_height)
        )
      }

    );

    find_solution.sort((a, b) => parseFloat(a.working_height) > parseFloat(b.working_height) ? 1 : -1)
    return find_solution;

  }

  if (formData.job_type === 'Lifting & Shifting') {

    console.log('✅ job_type', formData.job_type);
 
    let find_solution = products.filter( entry => {

        let environment_match = entry.environment === formData.environment;
        //console.log('✅ let environment_match', environment_match);

        environment_match = environment_match || entry.environment === "Indoor & Outdoor"
        //console.log('✅ environment_match', environment_match);

        let terrain_match = entry.terrain === formData.terrain;
        //console.log('✅ let terrain_match', terrain_match);

        if (formData.terrain === "Smooth flat surface") {
          terrain_match = terrain_match || entry.terrain === "Uneven or slippery surface"
        }

        //console.log('✅ lifting_capacity', entry.lifting_capacity);

        return (
          environment_match
          && terrain_match
          && entry.job_type === formData.job_type
          && parseFloat(entry.lifting_capacity) >= parseFloat(formData.weight)
        )
      }

    );

    find_solution.sort((a, b) => parseFloat(a.lifting_capacity) > parseFloat(b.lifting_capacity) ? 1 : -1)
    return find_solution;

  }

}




