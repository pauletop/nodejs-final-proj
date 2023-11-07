function main() {
    const isLogin = localStorage.getItem("user");
    if (!isLogin) {
      window.location.href = "admin/login";
    }
  
    // document.querySelector(".signoutBtn").addEventListener("click", e => {
    //   localStorage.clear();
    //   window.location.href = "/login"
    // })

    console.log(localStorage.getItem("user"));
}
  
main();