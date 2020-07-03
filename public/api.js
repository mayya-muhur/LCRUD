//jb hm cheze usko dy rhyyyy.. yani jb koi page load kr rhy to load krty vy jo infos dy rhy...
const base_url = "http://localhost:3000/api/user/"

async function login() {
    console.log("hey")
    try {
        let req = {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: document.getElementById("email").value,
                password: document.getElementById("password").value
            })
        }
        

        const res = await fetch(base_url + "login", req);//idhr sy data fetch hora form syy...idhr shyd /login call hora route

        if (res.ok) {
            const data = await res.json();//************************************ */
            
            if (data.statusCode == 200) {
                localStorage.token = data.token;
                window.location.assign("/dashboard.html");//takes us to new location...
            } else {
                throw new Error((data.err !== undefined) 
                ? `${data.statusCode}: ${data.message} - ${JSON.stringify(data.err.details).replace(/[\[\]\{\}"'\\]+/g, '').split(':').pop()}`
                : `${data.statusCode}: ${data.message}`)
            }


        } else {
            throw new Error(`${res.status}, ${res.statusText}`)
        }
    } catch(e) {
        console.log(e.toString());
    }
}

async function signUp() {
    let email = document.getElementById("email")
    let password = document.getElementById("password")
    let name = document.getElementById("name")

  
        try {
          
             let req = {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: document.getElementById("email").value,
                    password: document.getElementById("password").value,
                    name: document.getElementById("name").value
                })
            }

            const res = await fetch(base_url + "signup", req);
        
            if (res.ok) {
                const data = await res.json();//************************************ */
                
                if (data.statusCode == 200) {
                    window.location.assign("/login.html");//takes us to new location...
                } else {
                    throw new Error((data.err !== undefined) 
                    ? `${data.statusCode}: ${data.message} - ${JSON.stringify(data.err.details).replace(/[\[\]\{\}"'\\]+/g, '').split(':').pop()}`
                    : `${data.statusCode}: ${data.message}`)
                }
    
    
            } else {
                throw new Error(`${res.status}, ${res.statusText}`)
            }

        }
        catch(e){
            console.log(e.toString())
        }
}


