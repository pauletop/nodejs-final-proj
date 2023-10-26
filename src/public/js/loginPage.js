// sau khi bấm submit -> thì request lên server để compare username và password (hash)

// => server sẽ trả về 1 json cho client (chứa trạng thái đăng nhâp thành công hay thất bại)

// => nếu reject thất bại => reload lại login hooặc hiện thông báo login fail
// => nếu resolve thanh cong => localStores để lưu thông tin user vào
const loginForm = document.querySelector(".loginForm");
loginForm.addEventListener("submit",async e => {
    e.preventDefault();

    // const role = document.querySelector("#role").value;
    const username = document.querySelector("#username").value;
    const password = document.querySelector("#password").value;
   
    // console.log(role);
    console.log(username);
    console.log('deptrai');
    console.log(password);

    const response = await fetch("/admin/login", {
        method: "post",
        headers: {
            "Content-Type": "application/json"
        },
        body : JSON.stringify({username, password})
    })

    const data = await response.json();
    

    // check data
    if(!data.status) {
        window.location.reload();
    } else {
        // save to stored
        localStorage.setItem("user", data.data);
        window.location.href = "/admin";
    }
})
