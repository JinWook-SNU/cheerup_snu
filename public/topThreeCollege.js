import Api from '../src/Api/Api'
function topThreeCollege() {
  const api = new Api();
  console.log('333')

  api.getTopThree().then((res)=>{
    var obj_length = Object.keys(res).length;
    console.log(obj_length);
    return obj_length
  }
}