import { GAPIContext } from "./GAPIContext"
import { useContext } from "react"

const useGAPI = () => useContext(GAPIContext)

export default useGAPI
