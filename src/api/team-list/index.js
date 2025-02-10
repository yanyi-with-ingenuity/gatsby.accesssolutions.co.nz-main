import data from "../../data/team.json"

export default function handler(req, res) {

  res.status(200).json(
    {
      status: true,
      message: "successfully fetched",
      data : data,
    }
  )

}