import { useContext } from "react"

import DataContextProvider from "../contexts/DataContextProvider"
function Home(props) {
    const [websiteData, setWebsiteData] = useContext(DataContextProvider)
    console.log("home rendered")

    function notLoggedin() {
        return <div>
            <p><strong>If only you had an account....</strong></p>
            <h2>Then maybe </h2>
        </div>
    }
    return (
        websiteData.isLoggedIn ? <p>
            the user should feel cozy here
            <br />
            if only we had their preferences and favorite books and review responses to show here...
        </p> : <div style={{ fontSize: 40 }}>
            <p><strong>If only you had an account....</strong></p>
            <p><strong>Then maybe, here, you would see some....</strong></p>
            <p><strong>Recommendations, and other great books you could read!</strong></p>
            <Link to={"/p201/signup"}>
                <p>Considering Signing Up?</p>
            </Link>

        </div>)
}

export default Home;