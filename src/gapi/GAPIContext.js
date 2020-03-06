import React, { createContext, useEffect, useState } from "react"

export const GAPIContext = createContext({ signedIn: false })

const GAPIContextProvider = (props) => {
    const [gapi, setgapi] = useState()
    const [signedIn, setSignedIn] = useState(false)

    function initClient() {
        window.gapi.client
            .init({
                apiKey: "AIzaSyB1AVyVpwY7XxD1IdEWfmtNUZvU7c93sDo",
                clientId: "1053163140044-ond2c25jtonooecnt5530gf43ghhs37k.apps.googleusercontent.com",
                discoveryDocs: ["https://www.googleapis.com/discovery/v1/apis/drive/v3/rest"],
                scope: "https://www.googleapis.com/auth/drive.metadata.readonly"
            })
            .then(
                function() {
                    // Listen for sign-in state changes.
                    window.gapi.auth2.getAuthInstance().isSignedIn.listen(setSignedIn)

                    // Handle the initial sign-in state.
                    setSignedIn(window.gapi.auth2.getAuthInstance().isSignedIn.get())
                },
                function(error) {
                    console.warn(error)
                }
            )

        setgapi(window.gapi)
    }

    useEffect(() => {
        function handleClientLoad() {
            window.gapi.load("client:auth2", initClient)
        }

        if (window.gapi) {
            handleClientLoad()
        } else {
            const gapiLib = document.querySelector("#gapi-js")

            if (gapiLib !== undefined && gapiLib !== null) {
                gapiLib.addEventListener("load", () => {
                    handleClientLoad()
                })
            }
        }
    }, [props])

    return <GAPIContext.Provider value={{ signedIn, gapi }}>{props.children}</GAPIContext.Provider>
}

export default GAPIContextProvider
