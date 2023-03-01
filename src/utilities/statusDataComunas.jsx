export function statusDataComunas(filteredGroup, object) {
  console.log('objectobject', object);
  if(object !== undefined) {
    return { status : {
      [1]: {
        name: "Comunidades",
        color: "#FFFAE6",
        items: filteredGroup
      },
      ...object
    }}
  } else {
    return { status : {
      [1]: {
        name: "Comunidades",
        color: "#FFFAE6",
        items: filteredGroup
      },
    }}
  }
}