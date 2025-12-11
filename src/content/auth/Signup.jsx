import { Form, Button } from "react-bootstrap";
import { useContext, useState } from "react";
import { useNavigate } from "react-router";
import { Row, Col } from "react-bootstrap";
import DataContextProvider from "../../contexts/DataContextProvider";
function Signup() {
    // lowkey you should use subtlecrypto.digest here!
    const [websiteData, setWebsiteData] = useContext(DataContextProvider)
    const navigate = useNavigate()
    const [usernameInput, setUsernameInput] = useState('')
    const [passwordInput, setPasswordInput] = useState('')
    const [loginUserInput, setLoginUserInput] = useState('')
    const [loginPasswordInput, setLoginPassWordInput] = useState('')

    async function digestMessage(message) {
        const encoder = new TextEncoder();
        const data = encoder.encode(message);
        const hash = await window.crypto.subtle.digest("SHA-256", data);
        return Array.from(new Uint32Array(hash)).join('');
    }

    function handleSignupSumbit() {
        if (usernameInput == '' || passwordInput == '') {
            alert("You must provide both a username and a password!")
        }
        else {
            signupHelper()
        }
    }

    async function signupHelper() {
        const usersList = await fetch("https://cs571api.cs.wisc.edu/rest/f25/bucket/users", {
            method: "GET",
            headers: {
                "X-CS571-ID": CS571.getBadgerId(),
            },

        }).then(res => res.json()).then(res => Object.values(res.results))

        if (usersList.some(r => r.username === usernameInput)) {
            alert("This Username is Taken!")
        }
        else {
            const encryptedPass = await digestMessage(passwordInput)
            // -----------------------------------------
            fetch("https://cs571api.cs.wisc.edu/rest/f25/bucket/users", {
                method: "POST",
                headers: {
                    "X-CS571-ID": CS571.getBadgerId(),
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    username: usernameInput,
                    password: encryptedPass,
                    reputation: 0
                })
            }).then(res => res.json()).then(res => console.log(res.msg))
            setWebsiteData(websiteData => {
                const newLanes = { ...websiteData }
                newLanes["isLoggedIn"] = true
                newLanes["curUser"] = usernameInput
                newLanes["reputation"] = 0
                return newLanes
            })
            navigate("/p201/home")
        }
        setUsernameInput('')
        setPasswordInput('')
    }

    async function handleLoginSubmit() {
        const encryptedPass = await digestMessage(loginPasswordInput)
        const doesThisUserExist = await fetch("https://cs571api.cs.wisc.edu/rest/f25/bucket/users", {
            method: "GET",
            headers: {
                "X-CS571-ID": CS571.getBadgerId(),
            },
        }).then(res => res.json()).then(res => Object.values(res.results)).then(res => res.find(r => r.username === loginUserInput))

        if (!doesThisUserExist) {
            alert("No such account exists")
        }
        else if (doesThisUserExist.password == encryptedPass) {
            alert("Success!")
            setWebsiteData(websiteData => {
                const newLanes = { ...websiteData }
                newLanes["isLoggedIn"] = true
                newLanes["curUser"] = loginUserInput
                newLanes["reputation"] = doesThisUserExist.reputation 
                return newLanes
            })
            navigate("/p201/home")

        }
        else {
            alert("Incorrect Password!")
        }



    }

    return <div>
        <Row>
            <Col>
                <Form>
                    <h1>Create your account today!</h1>
                    <Form.Label htmlFor="userInput" />
                    <Form.Control id="userInput" placeholder={"Write your Username Here!"} value={usernameInput} onChange={(e) => setUsernameInput(e.target.value)} />
                    <Form.Label htmlFor="pinInput" />
                    <Form.Control id="pinInput" type="password" value={passwordInput} placeholder={"Write your Password Here!"} onChange={(e) => setPasswordInput(e.target.value)} />
                </Form>
                <Button onClick={handleSignupSumbit}>Signup!</Button>
            </Col>
            <Col>
                <Form>
                    <h1>Login for some more fun!</h1>
                    <Form.Label htmlFor="loginUserInput" />
                    <Form.Control id="loginUserInput" placeholder={"Write your Username Here!"} value={loginUserInput} onChange={(e) => setLoginUserInput(e.target.value)} />
                    <Form.Label htmlFor="loginPinInput" />
                    <Form.Control id="loginPinInput" type="password" placeholder={"Login here!"} value={loginPasswordInput} onChange={(e) => setLoginPassWordInput(e.target.value)} />
                </Form>
                <Button onClick={handleLoginSubmit}>password!</Button>
            </Col>
        </Row>
    </div>
}

export default Signup;