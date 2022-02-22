/* here shows an example of data structure */
/* you may convert csv into geojson */

const jellyfish = [
  {
    type: "Feature",
    properties: {
      name: "Rhopilema hispidum",
      genus: "Rhopilema",
      species: "hispidum",
      coName: "Flower Jelly", // common name
      obsLoci: "Lantau Island",
      obsDate: "3 May 2021",
      source: "iNaturalist",
    },
    geometry: {
      coordinates: [113.94175, 22.2665],
      type: "Point",
    },
    id: "010e698f268fd9ba341a357092cf5c4d",
    image: "", // image path
    url: "https://www.marinespecies.org/aphia.php?p=taxdetails&id=220494", // url path to WoRMS site
  },
];

export default jellyfish;
