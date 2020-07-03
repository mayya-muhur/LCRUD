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

async function delUser() {
    let email = prompt("[Add User] Enter user's email", "someone@example.com");

    if (email != null) {
        let data = await apiCaller(base_url + "del", {email: email}, 203, JSON.stringify);
    
        alert(data)
        console.log(data);
    }
}

async function getUsers() {
    let data = await apiCaller(base_url + "get", {}, 200, JSON.stringify);
    
    alert(data)
    console.log(data);
}

/**
API Caller helper to refactor common API code that requires bearer tokens (all http requests have POST method)
@param {string} api API URL
@param {object} body body needed for the API call (pass as empty object if not needed)
@param {number} successCode success status code e.g. 200
@param {function} dataReturner data returning function, processes data to return it in a specific format
@param {function} rejectWithValue  rejectWithValue function for that specific async thunk that calls it
*/

async function apiCaller(api, body, successCode, dataReturner, ) {
    try {
        let req_init = {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.token}`, 
            },
        }
        // if body is an empty object, do not include it
        if (!(Object.keys(body).length === 0 && body.constructor === Object)){
            req_init['body'] = JSON.stringify(body);
        }
        
        const res = await fetch(api, req_init);
        
        if (res.ok) {
            const data = await res.json()
            if (data.statusCode != successCode) {
                throw new Error((data.err !== undefined) 
                ? `${data.statusCode}: ${data.message} - ${JSON.stringify(data.err.details).replace(/[\[\]\{\}"'\\]+/g, '').split(':').pop()}`
                : `${data.statusCode}: ${data.message}`) 
            }
            return dataReturner(data)
        }
        throw new Error(`${res.status}, ${res.statusText}`) 
    }
    catch (err) {
        return err.toString()
    }
}
