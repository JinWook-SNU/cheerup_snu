function topThreeCollege() {
  const api = new Api();

  api.getTopThree().then((res)=>{
    var obj_length = Object.keys(res).length;
    console.log(obj_length);
    return obj_length
  }

}