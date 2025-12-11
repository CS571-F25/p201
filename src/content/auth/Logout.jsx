import { Button } from "react-bootstrap"
import { useNavigate } from "react-router"
import DataContextProvider from "../../contexts/DataContextProvider"
import { useContext } from "react"
function Logout(){
    const [websiteData, setWebsiteData] = useContext(DataContextProvider)
    const navigate = useNavigate()
    function logouthelper(){
        alert("bye")
         setWebsiteData(websiteData => {
                const newLanes = { ...websiteData }
                newLanes["isLoggedIn"] = false
                newLanes["curUser"] = "guest"
                newLanes["reputation"] = null
                return newLanes
            })
        navigate("/p201/home")
    }
    return <>
        <p>
            You want to logout, eh? Well then, just click that button!
        </p>
        <Button variant="danger" onClick={logouthelper}>Logout!</Button>
    </>
}

export default Logout;