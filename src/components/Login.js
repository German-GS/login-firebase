import { useState } from "react"


export function Login(){
    const [user, setUser] = useState({
        email: "",
        password: ""
    })
    return <div>
        <h1>login</h1>
        <form>
            <input type="email" name="email" id="email"/>
            <input type="password" name="password" id="password"/>
        </form>
    </div>
}

