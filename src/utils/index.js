
export function getRedirectTo(type, header) {
    let path = "";
    if (type === "laoban") {
      path = "/laoban";
    } else {
      path = "/dashen";
    }
    //没header的状态的话，就走完善信息界面
    if (!header) {
      path += "info";
    }
    return path;
  }